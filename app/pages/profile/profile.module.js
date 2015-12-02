(function () {
	'use strict'
	angular
		.module('IFSP.App.Pages.Profile', ['ngRoute', 'IFSP.App.Common'])
		.config(['$routeProvider', 'resolver', function ($routeProvider, resolver) {

			$routeProvider.when('/profile', {
				controller: 'ProfileController as profileCtrl',
				templateUrl: 'pages/profile/profile.tpl.html',
				resolve: {
					isAllowed: resolver.allowRegisteredOnly
				}
			})
		}])
})()