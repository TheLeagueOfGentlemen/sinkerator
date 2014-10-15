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
      template: "hi!",
      title: 'Hey there!',
      controller: function($scope) {
        $scope.title = 'Home';
        console.log($scope.$state.current);
      }
    })
    .state('state1', {
      url: "/state1",
      templateUrl: "/assets/scripts/partials/state1.html"
    })
    .state('state1.list', {
      url: "/list",
      templateUrl: "/assets/scripts/partials/state1.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "/assets/scripts/partials/state2.html"
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "/assets/scripts/partials/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });
});

myApp.controller('TitleCtrl', [
        '$scope',
function($scope) {
  $scope.title = 'CONTRoLLED!';
}]);
