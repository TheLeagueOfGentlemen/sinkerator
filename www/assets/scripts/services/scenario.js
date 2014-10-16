module.exports = [
        'RoomColorDispenser',
function(RoomColorDispenser) {
  return {
    colors: RoomColorDispenser,
    reset: function() {
      this.rooms = [];
      this.colors.reset();
    },
    // FIXME: This removeAppliance/addAppliance could shouldt be here, the room object should get passed in.
    addRoom: function(room) {
      room.color = this.colors.dispense();
      this.rooms.push(room);
    },
    rooms: []
  };
}];
