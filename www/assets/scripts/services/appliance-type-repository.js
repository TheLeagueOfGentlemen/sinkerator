module.exports = [
        'APPLIANCE_TYPES',
function(APPLIANCE_TYPES) {
  return {
    _byId: APPLIANCE_TYPES.reduce(function(carry, appliance) {
      carry[appliance.id] = appliance;
      return carry;
    }, {}),
    all: function() {
      return APPLIANCE_TYPES;
    },
    findById: function(id) {
      return this._byId[id];
    }
  }
}];
