var CONFIG = require('./../config/config'),
    app = require('angular').module(CONFIG.APP_NAME);

app.controller('TitleCtrl', require('./title'));
app.controller('ScenarioFormCtrl', require('./scenario-form'));
app.controller('CustomerTotalsCtrl', require('./customer-totals'));
app.controller('RoomsCtrl', require('./rooms'));
