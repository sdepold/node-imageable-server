# Description

This is a fallback app, which redirects all requests to the url passed via query param.

# Get it run

First of all, run `npm install`. Finally start the server via `node app.js`.

# And ... what's next?

Open your favorite browser and run:

    http://localhost:3000/resize/magic?url=http://www.google.com/intl/en_ALL/images/logo.gif&resize=200x200

This will redirect you to `http://www.google.com/intl/en_ALL/images/logo.gif`


# Gimme code, dude!

    git clone git://github.com/dawanda/node-imageable-server.git
    cd node-imageable-server
    git co fallback
    npm install .
    node app.js

    # you can also do sudo PORT=80 NODE_ENV=production node app.js
