var shuffleArray = require('./shuffle-array');

var ColorDispenser = function(colors, unique, random) {
  this.colors = colors;
  this.unique = unique;
  this.random = random;
};

ColorDispenser.prototype = {
  taken: [],
  reset: function() {
    this.taken = [];
  },
  available: function() {
    if (!this.unique) {
      return this.colors;
    }

    return this.colors.filter(function(color) {
      return this.taken.indexOf(color) === -1;
    }, this);
  },
  selectOneRandomColor: function(colors) {
    shuffleArray(colors);
    return colors[0];
  },
  dispense: function() {
    var all = this.unique ? this.available() : this.colors,
        color = this.random ? this.selectOneRandomColor(all) : all[0];

    if (this.unique) {
      this.taken.push(color);
    }

    return color;
  }
};

module.exports = function() {
  return {
    $get: function() {
      return ColorDispenser;
    }
  }
};
