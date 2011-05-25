var express = require('express')
  , imageable = require("imageable")

var app = module.exports = express.createServer()

// Configuration

app.configure(function(){
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(imageable({
    "secret" : "my-very-secret-secret",
    "magicHash" : "magic",
    "port" : 3000
  }, {
    before: function() { console.log('before') },
    after: function() { console.log('after') }
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
app.get('/', function(req, res, next){
  res.send('This is not the page you are looking for.', 404)
})

// Only listen on $ node app.js
if (!module.parent) {
  app.listen(3000)
  console.log("Express server listening on port %d", app.address().port)
}
