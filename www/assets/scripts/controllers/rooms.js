var angular = require('angular');

module.exports = [
        '$scope', 'Scenario', 'guid', 'ApplianceTypeRepository',
function($scope,   Scenario,   guid,   AppliancesTypes) {
  $scope.Scenario = Scenario;
  $scope.allAppliances = AppliancesTypes.all();

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

  // TODO: This seems really ugly
  $scope.updateApplianceType = function(appliance, rowform, id) {
    var type = AppliancesTypes.findById(id),
        wattageEl = angular.element(document.getElementById('wattage-'+appliance.id));

    wattageEl.scope().$data = type.wattage;
    wattageEl.val(type.wattage);
  };
}];
