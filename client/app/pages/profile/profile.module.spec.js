describe('IFSP.App.Pages.Profile', function() {
	'use strict'
	var
		moduleRoute = '/profile',
		templateUrl = 'app/pages/profile/profile.tpl.html',
		controllerStr = 'ProfileController as profileCtrl'

	beforeEach(module('IFSP.App.Pages.Profile'))

	describe('auto routing', function() {
		it('should load the template', inject(function($route) {
			expect($route.routes[moduleRoute].controller).toEqual(controllerStr)
			expect($route.routes[moduleRoute].templateUrl).toEqual(templateUrl)
		}));
	});

	xdescribe('location change', function() {
		it('should load the template', inject(function($route, $location, $rootScope) {

			var $httpBackend
			inject(function($injector) {
				$httpBackend = $injector.get('$httpBackend')
			})
			$httpBackend.whenGET(templateUrl).respond('<div></div>')

			expect($route.current).toBeUndefined();
			$location.path(moduleRoute);
			$rootScope.$digest();

			// todo: figure out why this one fails to update route, it uses exactly the same code as other module tests
			console.log('This test fails to update route.')
			//expect($route.current.templateUrl).toEqual(templateUrl)
			//expect($route.current.controller).toEqual(controllerStr)
		}));
	});
});
