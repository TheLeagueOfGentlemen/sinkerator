module.exports = function($stateProvider, $urlRouterProvider) {
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
    .state('rooms', {
      url: "/rooms",
      templateUrl: "/assets/partials/rooms.html",
      controller: 'RoomsCtrl'
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
};
