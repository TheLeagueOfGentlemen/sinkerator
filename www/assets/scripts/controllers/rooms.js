var angular = require('angular');

module.exports = [
        '$scope', 'Scenario', 'guid', 'ApplianceTypeRepository', 'ScenarioCalculator',
function($scope,   Scenario,   guid,   ApplianceTypes,            ScenarioCalculator) {
  $scope.Scenario = Scenario;
  $scope.allAppliances = ApplianceTypes.all();

  $scope.addAppliance = function(room) {
    var appliance = {
          id: guid(),
          name: '',
          wattage: '',
          hours_per_week: '',
          daily_usage: {
            kwh: 0,
            cost: 0
          }
      };
    $scope.inserted = appliance;
    room.addAppliance(appliance);
  };

  $scope.saveAppliance = function(room, appliance) {
    appliance.daily_usage = ScenarioCalculator.calculateApplianceDailyUsage(appliance);
    room.daily_usage = ScenarioCalculator.calculateRoomDailyUsage(room);
    Scenario.daily_usage = ScenarioCalculator.calculateScenarioDailyUsage(Scenario);
  };

  $scope.removeAppliance = function(room, appliance) {
    room.removeAppliance(appliance);
    room.daily_usage = ScenarioCalculator.calculateRoomDailyUsage(room);
    Scenario.daily_usage = ScenarioCalculator.calculateScenarioDailyUsage(Scenario);
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
