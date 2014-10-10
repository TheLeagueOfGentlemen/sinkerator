var React = require('react');

var App = React.createClass({
    render: function() {
      return React.DOM.div({
        children: 'hi there!'
      });
    }
});

module.exports = App();
