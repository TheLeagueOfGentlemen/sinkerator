module.exports = [
        'RoomColorDispenser',
function(RoomColorDispenser) {
  return {
    colors: RoomColorDispenser,
    reset: function() {
      this.rooms = [];
      this.colors.reset();
    },
    addRoom: function(room) {
      room.color = this.colors.dispense();
      this.rooms.push(room);
    },
    rooms: []
  };
}];
