(function () {
	'use strict';
	var module = angular.module('IFSP.App.Pages.Logout', [
		'ngRoute',
		'toastr'
	])

	module.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/logout', {
				controller: 'LogoutController as logoutCtrl',
				templateUrl: 'pages/logout/logout.tpl.html'
			})
	}])
})()