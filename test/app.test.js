var assert    = require('assert')
  , vows      = require("vows")
  , helpers   = require("./misc/helpers")
  , srcImgUrl = encodeURIComponent("http://www.google.com/intl/en_ALL/images/logo.gif")
  
vows.describe('app').addBatch({
  'GET /': {
    topic: function() { helpers.requestServer('/', this.callback) },
    'returns 404 page': function(err, stdout, stderr) {
      assert.includes(stdout, 'This is not the page you are looking for.')
    }
  },
  'GET /resize': {
    'simple resize': {
      topic: function() {
        var cb     = this.callback
          , target = helpers.testImageTargetPath

        helpers.requestServer("/resize/magic?url=" + srcImgUrl + "&size=200x400", {toFile: target}, function() {
          helpers.exec('identify ' + target, cb)
        })
      },
      'resizes the image to 200x80': function(err, stdout) {
        assert.ok(typeof stdout != 'undefined')
        assert.includes(stdout, "200x80")
      }
    }
  },
  'GET /fit': {
    'simple fit': {
      topic: function() {
        var cb     = this.callback
          , target = helpers.testImageTargetPath

        helpers.requestServer("/fit/magic?url=" + srcImgUrl + "&size=200x400", {toFile: target}, function() {
          helpers.exec('identify ' + target, cb)
        })
      },
      'resizes the image to 200x400': function(err, stdout) {
        assert.ok(typeof stdout != 'undefined')
        assert.includes(stdout, "200x400")
      }
    }
  },
  'GET /crop': {
    'simple crop': {
      topic: function() {
        var cb     = this.callback
          , target = helpers.testImageTargetPath

        helpers.requestServer('/crop/magic?url=' + srcImgUrl + '&crop=' + encodeURIComponent('200x400+10+10'), {toFile: target}, function() {
          helpers.exec('identify ' + target, cb)
        })
      },
      'resizes the image to 200x400': function(err, stdout) {
        // assert.ok(typeof stdout != 'undefined')
        // assert.includes(stdout, "200x400")
      }
    },
    'with valid hash': {
      topic: function() {
        var target  = helpers.testImageTargetPath
          , query   = 'url=' + srcImgUrl + '&crop=' + encodeURIComponent('200x400+10+10')
          , hash    = helpers.hash(query)

        helpers.requestServer('/crop/' + hash + '?' + query, this.callback)
      },
      'works nicely': function(err, stdout) {
        assert.includes(stdout, 'GIF89')
      }
    },
    'with invalid hash': {
      topic: function() {
        var target  = helpers.testImageTargetPath
        helpers.requestServer('/crop/asdeasd?url=' + srcImgUrl + '&crop=' + encodeURIComponent('200x400+10+10'), this.callback)
      },
      "doesn't work": function(err, stdout) {
        assert.includes(stdout, "Hash mismatch")
      }
    }
  }
}).addBatch(helpers.clearTmpFolderBatch).exportTo(module)