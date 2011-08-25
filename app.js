var express   = require('express')
  , imageable = require("imageable")
  , app       = module.exports = express.createServer()
  , fs        = require("fs")
  , config    = JSON.parse(fs.readFileSync(__dirname + "/config/config.json"))
  , http      = require("http")
  
// Configuration
app.configure(function(){
  var start = Date.now()
  
  app.use(express.logger({ format: ':date - :method :url' }))
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(imageable(config, {
    before: function(stats) {},
    after: function(stats) {
      if(config.statsd && ((Date.now() - (config.statsd.interval * 1000)) > start)) {
        var data = stats.format()

        for(var key in data) {
          var url = config.statsd.urls[key].replace("%{by}", data[key])
          
          console.log("REQUESTING:", url)
          require('child_process').exec("curl --insecure " + url, function () {})
        }

        stats.reset()
        start = Date.now()
      }
    }
  }))
  app.use(app.router)
})

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })) 
})

app.configure('production', function(){
  app.use(express.errorHandler()) 
})

// Routes
app.get('/', function(req, res, next) {
  res.send('This is not the page you are looking for.')
})

// Only listen on $ node app.js
if (!module.parent) {
  app.listen(process.env.PORT || 3000)
  console.log("Express server listening on port %d", app.address().port)
}
