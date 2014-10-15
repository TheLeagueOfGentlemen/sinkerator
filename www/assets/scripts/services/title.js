module.exports = [
        '$state',
function($state) {
  return {
    _title: '',
    get: function() {
      return this._title || $state.current.title;
    },
    set: function(title) {
      this._title = title;
    }
  };
}];
