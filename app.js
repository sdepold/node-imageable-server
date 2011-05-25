var express = require('express')
  , imageable = require("/Users/sdepold/Projects/node-imageable/index")

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(imageable({
    "secret" : "my-very-secret-secret",
    "magicHash" : "magic",
    "port" : 3000
  }, {
    before: function() { console.log('before') },
    after: function() { console.log('after') }
  }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', function(req, res, next){
  res.render('index', {
    title: 'Express'
  })
})

// Only listen on $ node app.js
if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
