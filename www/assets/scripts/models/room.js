var Room = function(name, color) {
  this.name = name || '';
  this.color = color || null;
  this.appliances = [];
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
