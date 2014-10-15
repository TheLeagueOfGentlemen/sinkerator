var CONFIG = require('./../config/config.js'),
    app = require('angular').module(CONFIG.APP_NAME);

app.constant('ROOM_COLORS', CONFIG.ROOM_COLORS);
app.factory('title', require('./title'));
app.factory('CustomerData', require('./customer-data'));
app.factory('Scenario', require('./scenario'));
app.provider('ColorDispenser', require('./color-dispenser'));
app.factory('RoomColorDispenser', require('./room-color-dispenser'));
