# Description

This app is a demonstrator for the node-imageable middleware.

# Get it run

First of all, create a `config/config.json`. You might just want to copy the `config/config.example.json`.
Afterwards run `npm install`. Finally start the server via `node app.js`.

# Gimme code, dude!

    git clone git://github.com/dawanda/node-imageable-server.git
    cd node-imageable-server
    cp config/config.example.json config/config.json
    npm install .
    node app.js

    # you can also do sudo PORT=80 NODE_ENV=production node app.js