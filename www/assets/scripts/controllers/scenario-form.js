var ScenarioFormData = require('./../models/scenario-form-data');

module.exports = [
        '$state', '$scope', 'CustomerData', 'Scenario',
function($state,   $scope,   CustomerData,   Scenario) {
  $scope.FormData = new ScenarioFormData();
  $scope.FormData.name = "Relaxo's House";

  $scope.bathroomOptions = [1,2,3,4];
  $scope.bedroomOptions = [1,2,3,4];

  $scope.submit = function() {
    var FormData = $scope.FormData;
    CustomerData.kwh = 1000;
    CustomerData.cost = 10;
    Scenario.reset();
    for (var i = 1; i <= FormData.numBathrooms; i++) {
      Scenario.addRoom('Bathroom '+i);
    }
    for (var j = 1; j <= FormData.numBedrooms; j++) {
      Scenario.addRoom('Bedroom '+j);
    }
    var roomNames = ['kitchenName', 'basementName', 'officeName', 'livingRoomName'];
    for (var k = 0; k < roomNames.length; k++) {
      var roomName = FormData[roomNames[k]];
      if (roomName) {
        Scenario.addRoom(roomName);
      }
    }

    $state.go('rooms');
    return false;
  };
}];
