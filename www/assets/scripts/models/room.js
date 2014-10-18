var Room = function(name, color) {
  this.name = name || '';
  this.color = color || null;
  this.appliances = [];
  this.daily_usage = {
    kwh: 0,
    wattage: 0,
    cost: 0
  };
};

Room.prototype = {
  removeAppliance: function(appliance) {
    this.appliances = this.appliances.filter(function(a) {
      return a !== appliance;
    });
  },
  addAppliance: function(appliance) {
    this.appliances.push(appliance);
  }
};

module.exports = Room;
