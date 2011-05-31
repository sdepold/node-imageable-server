var express   = require('express')
  , imageable = require("imageable")
  , app       = module.exports = express.createServer()
  , fs        = require("fs")
  , config    = JSON.parse(fs.readFileSync(__dirname + "/config/config.json"))
  , http      = require("http")
  
// Configuration
app.configure(function(){
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(imageable(config, {
    before: function() { return +new Date() },
    after: function(start) {
      var duration = +new Date() - start
      config.hasOwnProperty('hummingBird') && http.get(config.hummingBird)
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
  res.send('This is not the page you are looking for.', 404)
})

// Only listen on $ node app.js
if (!module.parent) {
  app.listen(process.env.PORT || 3000)
  console.log("Express server listening on port %d", app.address().port)
}
