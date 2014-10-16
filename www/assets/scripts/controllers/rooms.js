module.exports = [
        '$scope', 'Scenario', 'guid',
function($scope,   Scenario,   guid) {
  $scope.Scenario = Scenario;

  $scope.addAppliance = function(room) {
    $scope.inserted = {
          id: guid(),
          name: '',
          wattage: '',
          hours_per_week: '',
          daily_usage: {
            kwh: 0,
            cost: 0
          }
      };
    room.addAppliance($scope.inserted);
  };
}];
