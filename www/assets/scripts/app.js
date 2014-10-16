'use strict';

var CONFIG = require('./config/config'),
    angular = require('angular'),
    app = angular.module(CONFIG.APP_NAME, ['ui.router', 'xeditable']);

app.config(require('./config/routes'));

app.run(
  [
             '$rootScope', '$state', '$stateParams', 
    function ($rootScope,   $state,   $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }
  ]
);

require('./config/angular');
require('./controllers/index.js');
require('./services/index.js');
