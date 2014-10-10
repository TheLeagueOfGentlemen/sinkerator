var React = require('react');
var App = require('./component/app');

window.app = App;

return React.renderComponent(
    App,
    document.getElementById('app')
);
