(function () {
	'use strict'
	angular
		.module('IFSP.App.Pages.Signup', [
			'ngRoute',
			'IFSP.App.Common'
		])
		.config(['$routeProvider', 'resolver', function($routeProvider, resolver) {

			$routeProvider.when('/signup', {
				controller: 'SignupController as signupCtrl',
				templateUrl: 'pages/signup/signup.tpl.html',
					resolve: {
						isAllowed: resolver.allowGuestOnly
					}
			})

		}])
})()