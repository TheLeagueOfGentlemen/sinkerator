module.exports = [
        'APPLIANCES',
function(APPLIANCES) {
  return {
    _byId: APPLIANCES.reduce(function(carry, appliance) {
      carry[appliance.id] = appliance;
      return carry;
    }, {}),
    all: function() {
      return APPLIANCES;
    },
    findById: function(id) {
      return this._byId[id];
    }
  }
}];
