$ = require('jquery');
var angular = require('angular');
require('angular-route');
require('angular-ui-router');

console.log('wtf w/ui router!', angular, $);

var myApp = angular.module('myApp', ['ui.router']);

myApp.run(
  [
             '$rootScope', '$state', '$stateParams', 
    function ($rootScope,   $state,   $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }
  ]
);

myApp.config(function($stateProvider, $urlRouterProvider) {
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

myApp.controller('TitleCtrl', [
        '$scope', 'title',
function($scope,   title) {
  $scope.title = title;
}]);

myApp.factory('title', [
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
}]);
