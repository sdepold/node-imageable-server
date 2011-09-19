var assert    = require('assert')
  , vows      = require("vows")
  , helpers   = require("./misc/helpers")
  , srcImgUrl = encodeURIComponent("http://www.google.com/intl/en_ALL/images/logo.gif")

vows.describe('app').addBatch({
  'GET /': {
    topic: function() { helpers.requestServer('/', this.callback) },
    'returns proxy hint text': function(err, stdout, stderr) {
      assert.includes(stdout, 'fallback')
    }
  },
  'GET /* without url': {
    topic: function() { helpers.requestServer('/resize?url=', this.callback) },
    'redirects to /': function(err, stdout, stderr) {
      assert.includes(stdout, 'Moved Temporarily. Redirecting to')
    }
  },
  'GET /* with url': {
    topic: function() { helpers.requestServer('/resize/cigam/testShop.jpg?size=950x200&url=http://www.google.de/images/logos/ps_logo2.png', this.callback) },
    'redirect to url (param)': function(err, stdout, stderr) {
      assert.includes(stdout, 'Moved Temporarily. Redirecting to')
      assert.includes(stdout, 'http://www.google.de/images/logos/ps_logo2.png')
    }
  }
}).export(module)
