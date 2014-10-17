var angular = require('angular');

module.exports = [
        '$scope', 'Scenario', 'guid', 'ApplianceTypeRepository',
function($scope,   Scenario,   guid,   ApplianceTypes) {
  $scope.Scenario = Scenario;
  $scope.allAppliances = ApplianceTypes.all();

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

  $scope.cancelAddAppliance = function(room, appliance, rowform) {
    if (!appliance.type) {
      room.removeAppliance(appliance);
    }
    rowform.$cancel();
  };

  $scope.showApplianceType = function(appliance) {
    return appliance.type ? ApplianceTypes.findById(appliance.type).name : '';
  };

  // TODO: This seems really ugly
  $scope.updateApplianceType = function(appliance, id) {
    var type = ApplianceTypes.findById(id),
        wattageEl = angular.element(document.getElementById('wattage-'+appliance.id));

    wattageEl.scope().$data = type.wattage;
    wattageEl.val(type.wattage);
  };
}];
