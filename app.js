var express    = require('express')
  , imageable  = require("imageable")
  , connect    = require('connect')
  , http       = require("http")
  , fs         = require("fs")
  , app        = module.exports = express.createServer()
  , configFile = __dirname + "/" + (process.env.CONFIG || "config/config.json")
  , config     = JSON.parse(fs.readFileSync(configFile))
  , airbrake   = (config.airbrake ? require("airbrake").createClient(config.airbrake) : null)

// Configuration
app.configure(function(){
  connect.logger.token('date', function(){ return imageable.Logger.formatDate(new Date()) })
})

app.configure('development', function(){
  app.use(connect.logger({ immediate: true, format: "\\n:date :method | :status | :url (via :referrer)" }))
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
})

app.configure('production', function(){
  app.use(connect.logger({ immediate: true, format: "\\n:date :method | :status | :url (via :referrer)" }))
  app.use(express.errorHandler())
})

app.configure(function() {
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(imageable(config, {
    after: function(_, _, err, req) {
      if(err && airbrake) {
        err.session = req.headers
        airbrake.notify(err, function(err, url){
          err && console.log(err)
        })
      }
    }
  }))
  app.use(app.router)
})

// Routes
app.get('/', function(req, res, next) {
  res.send('This is not the page you are looking for.')
})

app.get('/favicon.ico', function(req, res) {
  res.send('')
})

// Only create pidfile on `node app.js` or on `FORCE_PID=true smth...`
if (!module.parent || process.env.FORCE_PID) {
  var pidfile = process.env.PIDFILE || process.cwd() + "/tmp/node_imageable_server.pid"

  app.on('listening', function() {
    fs.open(pidfile, "w", 0600, function(err, fd) {
      return fs.writeSync(fd, process.pid)
    })
  })

  process.on('SIGINT', function() {
    app.close(function() {
      process.exit()
    })
  })

  app.on('close', function() {
    try {
      fs.unlinkSync(pidfile)
    } catch(e) {}
  })
}

// Only listen on $ node app.js
if (!module.parent) {
  app.listen(process.env.PORT || 3000)
  console.log("Express server listening on port %d", app.address().port)
}
