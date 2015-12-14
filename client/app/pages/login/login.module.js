(function () {
	'use strict'
	angular
		.module('IFSP.App.Pages.Login', ['ngRoute', 'app.com'])
		.config(['$routeProvider', 'resolver', function ($routeProvider, resolver) {

			$routeProvider.when('/login', {
				controller: 'LoginController as loginCtrl',
				templateUrl: 'app/pages/login/login.tpl.html',
				resolve: {
					isAllowed: resolver.allowGuestOnly
				}
			})

		}])
})()

