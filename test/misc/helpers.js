var Helpers = module.exports = {
  exec: require('child_process').exec,
  fs:   require('fs'),

  serverRequests: 0,

  hash: function(s) {
    var config = JSON.parse(Helpers.fs.readFileSync(process.cwd() + "/config/config.example.json"))
    return require("crypto").createHash('md5').update(s + config.secret).digest("hex").slice(0,8)
  },

  clearTmpFolder: function() {
    Helpers.exec('rm ' + process.cwd() + "/test/tmp/*")
  },

  clearTmpFolderBatch: {
    'clear': {
      topic: function() {
        Helpers.clearTmpFolder()
        this.callback()
      },
      'make it so': function(){}
    }
  },

  /*
    path: the path you want to request
    _options: a hash with options, possible options:
                - toFile: will write the response into a file (e.g. for binary stuff)
    _callback: a function to call after everything is done
  */
  requestServer: function(path, _options, _callback) {
    var app       = require(process.cwd() + '/app')
      , isRunning = !!app.fd || !!app.address()
      , port      = isRunning ? app.address().port : (~~(Math.random() * 5000) + 2000)
      , url       = "http://localhost:" + port + path
      , options   = (typeof _options == 'function') ? {} : _options
      , callback  = (typeof _options == 'function') ? _options : _callback
      , cmd       = "curl --silent '" + url + "'" + (options.toFile ? " > " + options.toFile : '')

    Helpers.serverRequests++

    if (!isRunning) {
      app.listen(port)
      console.log("Express server listening on port %d", app.address().port)
    }

    Helpers.exec(cmd, function(err, stdout, stderr) {
      callback && callback(err, stdout, stderr)
      if(--Helpers.serverRequests == 0) {
        app.close()
        app.__listening = false
      }
    })
  }
}

Helpers.__defineGetter__('random', function() {
  return ~~(Math.random() * 999999)
})

Helpers.__defineGetter__('testImageTargetPath', function() {
  return process.cwd() + "/test/tmp/test" + Helpers.random +".gif"
})

Helpers.__defineGetter__('testImagePath', function() {
  return process.cwd() + "/test/assets/test.gif"
})
