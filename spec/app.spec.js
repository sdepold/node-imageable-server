var buster         = require('buster')
  , ExpressTestBot = require('express-test-bot')

buster.spec.expose()

describe('ImageableServer', function() {
  before(function() {
    this.server = new ExpressTestBot()
  })

  describe('GET /', function() {
    it('returns not so friendly home page', function(done) {
      this.server.get('/', function(err, stdout, stderr) {
        expect(stdout).toMatch('This is not the page you are looking for.')
        done()
      })
    })
  })
})
