var buster         = require('buster')
  , ExpressTestBot = require('express-test-bot')
  , Helper         = require('./helper.js')
  , exec           = require('child_process').exec

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

  describe('GET /resize', function() {
    before(function() {
      this.tmpImage = 'test.gif'
    })

    after(function(done) {
      exec('rm ' + this.tmpImage, done)
    })

    it('resizes the image to 200x80', function(done) {
      var url = '/resize/magic?url=' + Helper.getEncodedImageUrl('google') + '&size=200x400'

      this.server.get(url, { toFile: this.tmpImage }, function() {
        Helper.identify(this.tmpImage, function(err, stdout, stderr) {
          expect(err).toBeNull()
          expect(stdout).toBeDefined()
          expect(stdout).toMatch("200x80")

          done()
        }.bind(this))
      }.bind(this))
    })
  })
})
