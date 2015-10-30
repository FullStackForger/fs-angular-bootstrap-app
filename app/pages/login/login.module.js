(function() {
	'use strict';
	var module = angular.module('IFSP.App.Pages.Login', [
			'ngRoute'
		])

	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider
				.when('/login', {
						controller: 'LoginController',
						controllerAs: 'loginCtrl',
            templateUrl: 'pages/login/login.tpl.html',
        })
	}]);
})()