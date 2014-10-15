'use strict';

var CONFIG = require('./config.js'),
    angular = require('angular');

require('angular-ui-router');

var app = angular.module(CONFIG.APP_NAME, ['ui.router']);

app.run(
  [
             '$rootScope', '$state', '$stateParams', 
    function ($rootScope,   $state,   $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }
  ]
);

app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "/assets/partials/home.html",
      controller: function($scope, title) {
        title.set('Home');
      }
    })
    .state('state1', {
      url: "/state1",
      templateUrl: "/assets/partials/state1.html"
    })
    .state('state1.list', {
      url: "/list",
      templateUrl: "/assets/partials/state1.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "/assets/partials/state2.html"
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "/assets/partials/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });
});

require('./controllers/index.js');
require('./services/index.js');
