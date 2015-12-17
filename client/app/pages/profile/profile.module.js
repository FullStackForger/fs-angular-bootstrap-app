(function () {
	'use strict'
	angular
		.module('app.pages.Profile', [
			'ngRoute',
			'app.com',
			'satellizer',
			'toastr'
		]).config(['$routeProvider', 'resolver', function ($routeProvider, resolver) {

			$routeProvider.when('/profile', {
				controller: 'ProfileController as profileCtrl',
				templateUrl: 'app/pages/profile/profile.tpl.html',
				resolve: {
					isAllowed: resolver.allowRegisteredOnly
				}
			})
		}])
})()