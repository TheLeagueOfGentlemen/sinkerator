var CONFIG = require('./../config.js'),
    app = require('angular').module(CONFIG.APP_NAME);

app.controller('TitleCtrl', require('./title'));
app.controller('ScenarioFormCtrl', require('./scenario-form'));
