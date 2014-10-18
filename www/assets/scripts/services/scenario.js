module.exports = [
        'RoomColorDispenser',
function(RoomColorDispenser) {
  return {
    colors: RoomColorDispenser,
    reset: function() {
      this.rooms = [];
      this.colors.reset();
      this.daily_usage = {
        kwh: 0,
        cost: 0,
        wattage: 0
      }
    },
    addRoom: function(room) {
      room.color = this.colors.dispense();
      this.rooms.push(room);
    },
    rooms: []
  };
}];
