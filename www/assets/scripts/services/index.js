var CONFIG = require('./../config.js'),
    app = require('angular').module(CONFIG.APP_NAME);

app.factory('title', require('./title'));
