var $ = require('jquery'),
    serialize = require('./form-to-json.js');

window.$ = $;

var App = function($el, $scenarioForm) {
  this.$el = $el;
  this.$scenarioForm = $scenarioForm;
};

App.prototype = {
  init: function() {
    this.setupEvents();
  },
  setupEvents: function() {
    $scenarioForm.on('submit', function(e) {
      e.preventDefault();

      console.log(serialize($('form')));
    });
  }
};

var app = new App(
  $app = $('#app'),
  $scenarioForm = $('#scenario-form')
);
app.init();
