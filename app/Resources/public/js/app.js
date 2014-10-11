var $ = require('jquery'),
    serialize = require('./form-to-json.js');

window.$ = $;

var $app = $('#app'),
    $scenarioForm = $('#scenario-form');

$scenarioForm.on('submit', function(e) {
  e.preventDefault();
  alert('test');

  console.log(serialize($('form')));
});
