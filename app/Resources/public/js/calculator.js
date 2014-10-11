var Calculator = function(model_sinks, average_kwh_cost) {
    this.model_sinks = model_sinks;
    this.average_kwh_cost = average_kwh_cost;
};

Calculator.prototype = {

    getDailyUsageForScenario: function(scenario) {
        var house_usage = this.getDailyUsageForCollection(scenario.sinks),
            ret = {
                wattage: 0,
                kwh: house_usage.kwh,
                cost: house_usage.cost
            };

        for (var i = 0; i < scenario.rooms.length; i++) {
            var d = this.getDailyUsageForCollection(scenario.rooms[i].sinks);
            ret.wattage += d.wattage;
            ret.kwh += d.kwh;
            ret.cost += d.cost;
        }

        return ret;
    },

    getDailyUsageForCollection: function(sinks) {
        var ret = {
            wattage: 0,
            kwh: 0,
            cost: 0
        };

        for (var i = 0; i < sinks.length; i++) {
            var d = this.getDailyUsageForSink(sinks[i]);
            ret.wattage += d.wattage;
            ret.kwh += d.kwh;
            ret.cost += d.cost;
        }

        return ret;
    },

    getDailyUsageForSink: function(sink) {
        var sink_data = this.getSinkData(sink),
            hours_per_day = sink_data.hours_per_week / 7,
            standby_hours = 24 - hours_per_day,
            active_kwh = (sink_data.wattage * hours_per_day) / 1000,
            standby_kwh = (sink_data.standby_wattage * standby_hours) / 1000,
            total_kwh = active_kwh + standby_kwh,
            total_cost = total_kwh * this.average_kwh_cost;

        return {
            wattage: sink_data.wattage + sink_data.standby_wattage,
            kwh: total_kwh,
            cost: total_cost
        }
    },

    getSinkData: function(sink) {
        var model_sink = this.model_sinks[sink.sink_id];
        return {
            sink_id: sink.sink_id,
            wattage: sink.wattage,
            standby_wattage: model_sink.standby_wattage,
            hours_per_week: sink.hours_per_week,
            categories: model_sink.categories
        };

    }
};

module.exports = Calculator;
