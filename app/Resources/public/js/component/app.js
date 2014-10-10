var React = require('react');

var SinkeratorApp = React.createClass({
    getInitialState: function() {
      return {
        scenarios: []
      }
    },
    render: function() {
      return React.DOM.div({
        children: [
          React.DOM.a({
            href: 'test.html',
            children: 'Add Scenario',
            onClick: function() {
              return false;
            }
          })
        ]
      });
    }
});

module.exports = SinkeratorApp();
