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
    rooms: [],
  };
}];
