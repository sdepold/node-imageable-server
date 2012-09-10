var exec = require('child_process').exec

var Helper = module.exports = {
  images: {
    google: "http://www.google.com/intl/en_ALL/images/logo.gif",
    french: "http://blog-fr.dawanda.com/wp-content/uploads/2012/01/Capture-d’écran-2012-01-19-à-11.27.07.png",
    big:    "http://s31.dawandastatic.com/PressReleaseItem/0/818/1264780823-785.jpg",
    local:  __dirname + "/fixtures/test.jpg"
  },

  getEncodedImageUrl: function(type) {
    return encodeURIComponent(Helper.images[type])
  },

  identify: function(path, callback) {
    exec('identify ' + path, callback)
  }
}
