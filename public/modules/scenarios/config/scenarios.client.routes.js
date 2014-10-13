'use strict';

// Setting up route
angular.module('scenarios').config(['$stateProvider',
	function($stateProvider) {
		// Home state routing
		$stateProvider.
		state('scenario', {
			url: '/scenario/show',
			templateUrl: 'modules/scenarios/views/show.client.view.html'
		});
	}
]);
