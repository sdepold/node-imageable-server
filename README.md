# Description

This app is a demonstrator for the node-imageable middleware.

# Get it run

First of all, create a `config/config.json`. You might just want to copy the `config/config.example.json`.
Afterwards run `npm install`. Finally start the server via `node app.js`.

# And ... what's next?

Open your favorite browser and run:

    http://localhost:3000/resize/magic?url=http://www.google.com/intl/en_ALL/images/logo.gif&resize=200x200

For further information take a look at the node-imageable documentation: https://github.com/dawanda/node-imageable

# Gimme code, dude!

    git clone git://github.com/dawanda/node-imageable-server.git
    cd node-imageable-server
    cp config/config.example.json config/config.json
    npm install .
    node app.js

    # you can also do sudo PORT=80 NODE_ENV=production node app.js

# Fallback solution

If you need a fallback solution for (whyever) failing resizer apps, you can checkout the `fallback` branch. This app just redirects all
requests to the url param.

# Authors/Contributors

- DaWanda GmbH
- Sascha Depold ([Twitter](http://twitter.com/sdepold) | [Github](http://github.com/sdepold) | [Website](http://depold.com))