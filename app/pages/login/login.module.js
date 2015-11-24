(function () {
	'use strict'
	var module = angular.module('IFSP.App.Pages.Login', [
		'ngRoute',
		'toastr'
	])

	module.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/login', {
				controller: 'LoginController as loginCtrl',
				templateUrl: 'pages/login/login.tpl.html'
			})
	}])
})()