var ScenarioCalculator = function(ApplianceTypes) {
  this.ApplianceTypes = ApplianceTypes;
};

ScenarioCalculator.prototype = {
  average_kwh_cost: 0.15,
  calculateApplianceDailyUsage: function(appliance) {
    var type = this.ApplianceTypes.findById(appliance.type),
        hours_per_day = appliance.hours_per_week / 7,
        standby_hours = 24 - hours_per_day,
        active_kwh = (appliance.wattage * hours_per_day) / 1000,
        standby_kwh = (type.standby_wattage * standby_hours) / 1000,
        total_kwh = active_kwh + standby_kwh,
        total_cost = total_kwh * this.average_kwh_cost;

    return {
        wattage: appliance.wattage + type.standby_wattage,
        kwh: total_kwh,
        cost: total_cost
    };
  },
  calculateRoomDailyUsage: function(room) {
    return this.calculateCollectionDailyUsage(room.appliances);
  },
  calculateScenarioDailyUsage: function(Scenario) {
    console.log(Scenario.rooms);
    return this.calculateCollectionDailyUsage(Scenario.rooms);
  },
  calculateCollectionDailyUsage: function(collection) {
    return collection.reduce(function(usage, item) {
      usage.wattage += item.daily_usage.wattage;
      usage.kwh += item.daily_usage.kwh;
      usage.cost += item.daily_usage.cost;
      return usage;
    }, {
      wattage: 0,
      kwh: 0,
      cost: 0
    });

  }
};

module.exports = [
        'ApplianceTypeRepository',
function(ApplianceTypes) {
  return new ScenarioCalculator(ApplianceTypes);
}];
