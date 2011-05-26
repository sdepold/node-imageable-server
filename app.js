var express   = require('express')
  , imageable = require("imageable")
  , imageable = require("/Users/sdepold/Projects/node-imageable/index")
  , app       = module.exports = express.createServer()
  , fs        = require("fs")
  , config    = JSON.parse(fs.readFileSync(__dirname + "/config/config.json"))
  
// Configuration
app.configure(function(){
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(imageable(config, {
    before: function() {},
    after: function() {}
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
