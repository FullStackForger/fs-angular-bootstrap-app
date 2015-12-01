(function () {
	'use strict'
	angular
		.module('IFSP.App.Pages.Login', ['ngRoute', 'IFSP.App.Common'])
		.config(['$routeProvider', 'resolver', function ($routeProvider, resolver) {

			$routeProvider.when('/login', {
				controller: 'LoginController as loginCtrl',
				templateUrl: 'pages/login/login.tpl.html',
				resolve: {
					isAllowed: resolver.allowGuestOnly
				}
			})

		}])
})()

