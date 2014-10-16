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
        appliances: [
          {
            name: 'Air Conditioner',
            wattage: 500,
            hours_per_week: 20,
            daily_usage: {
              kwh: 4,
              cost: 2.5
            }
          }
        ]
      });
    },
    rooms: []
  };
}];
