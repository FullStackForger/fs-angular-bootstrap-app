(function () {
	'use strict'
	angular
		.module('app.pages.signup', [
			'ngRoute',
			'app.com'
		])
		.config(['$routeProvider', 'resolver', function($routeProvider, resolver) {

			$routeProvider.when('/signup', {
				controller: 'SignupController as signupCtrl',
				templateUrl: 'app/pages/signup/signup.tpl.html',
					resolve: {
						isAllowed: resolver.allowGuestOnly
					}
			})

		}])
})()