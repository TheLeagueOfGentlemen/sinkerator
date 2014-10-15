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
        color: this.colors.dispense()
      });
    },
    rooms: [
      {
          name: 'Bedroom 1',
          appliances: [
            {
              name: 'Air Conditioner'
            },
            {
              name: 'Ceiling Fan'
            }
          ]
      },
      {
          name: 'Kitchen',
          appliances: [
            {
              name: 'Dishwasher'
            },
            {
              name: 'Refrigerator'
            }
          ]
      }
    ]
  };
}];
