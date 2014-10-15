module.exports = [
        '$scope',
function($scope) {
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
    return false;
  };
}];
