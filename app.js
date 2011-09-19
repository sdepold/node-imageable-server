var express   = require('express')
  , http      = require("http")
  , app       = module.exports = express.createServer()

// Configuration
app.configure(function(){
  app.use(express.logger({ format: ':date - :method :url' }))
  app.use(express.bodyParser())
  app.use(express.methodOverride())
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
  res.send('This is a fallback page you are not looking for.')
})

app.get('*', function(req, res, next) {
  var url = req.param('url')
  if(url)
    res.redirect(decodeURIComponent(url), 302)
  else
    res.redirect('/', 302)
})

// Only listen on $ node app.js
if (!module.parent) {
  app.listen(process.env.PORT || 3000)
  console.log("Express server listening on port %d", app.address().port)
}
