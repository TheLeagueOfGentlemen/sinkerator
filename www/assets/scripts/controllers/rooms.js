module.exports = [
        '$scope', 'Scenario',
function($scope,   Scenario) {
  $scope.Scenario = Scenario;
  
  $scope.removeAppliance = function(room, appliance) {
    Scenario.removeAppliance(room, appliance);
    return false;
  };
}];
