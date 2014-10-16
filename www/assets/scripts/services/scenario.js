module.exports = [
        'RoomColorDispenser',
function(RoomColorDispenser) {
  return {
    colors: RoomColorDispenser,
    reset: function() {
      this.rooms = [];
      this.colors.reset();
    },
    addRoom: function(name) {
      this.rooms.push({
        name: name,
        color: this.colors.dispense(),
        removeAppliance: function(appliance) {
          this.appliances = this.appliances.filter(function(a) {
            return a !== appliance;
          });
        },
        addAppliance: function(appliance) {
          this.appliances.push(appliance);
        },
        appliances: []
      });
    },
    rooms: []
  };
}];
