var CONFIG = require('./../config/config.js'),
    app = require('angular').module(CONFIG.APP_NAME);

function to_fixed(value, precision, strip_trailing_zeros) {
  strip_trailing_zeros = strip_trailing_zeros != undefined ? false : strip_trailing_zeros;
  value = value.toFixed(precision);
  return strip_trailing_zeros ? value.replace(/\.?0*$/g, '') : value;
}

function commafy(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

app.filter('weekly_kwh', function() {
  return function(kwh) {
    return kwh ? commafy(to_fixed(kwh*7, 2)) : 0;
  };
});

app.filter('weekly_cost', function() {
  return function(cost) {
    return cost ? commafy(to_fixed(cost*7, 2, true)) : 0;
  };
});
