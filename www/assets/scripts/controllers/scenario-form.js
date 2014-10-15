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
    Scenario.addRoom('Fuckroom');
    return false;
  };
}];
