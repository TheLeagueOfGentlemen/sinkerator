module.exports = [
        '$scope', 'CustomerData', 'Scenario',
function($scope,   CustomerData,   Scenario) {
  $scope.name = 'Relaxo\'s House';
  $scope.numBathrooms = 1;
  $scope.numBedrooms = 1;
  $scope.kitchenName = '';
  $scope.basementName = '';
  $scope.officeName = '';
  $scope.livingRoomName = '';

  $scope.bathroomOptions = [1,2,3,4];
  $scope.bedroomOptions = [1,2,3,4];

  $scope.submit = function() {
    console.log('go1', $scope);
    CustomerData.kwh = 1000;
    CustomerData.cost = 10;
    Scenario.reset();
    for (var i = 1; i <= $scope.numBathrooms; i++) {
      Scenario.addRoom('Bathroom '+i);
    }
    for (var j = 1; j <= $scope.numBedrooms; j++) {
      Scenario.addRoom('Bedroom '+j);
    }
    var roomNames = ['kitchenName', 'basementName', 'officeName', 'livingRoomName'];
    for (var k = 0; k < roomNames.length; k++) {
      var roomName = $scope[roomNames[k]];
      if (roomName) {
        Scenario.addRoom(roomName);
      }
    }
    return false;
  };
}];
