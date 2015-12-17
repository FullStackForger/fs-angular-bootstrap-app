describe('app.pages.Login', function() {
	'use strict'
	var moduleRoute = '/login',
		templateUrl = 'app/pages/login/login.tpl.html',
		controllerStr = 'LoginController as loginCtrl';

	beforeEach(module('app.pages.Login'));

	describe('auto routing', function() {
		it('should load the template', inject(function($route) {
			expect($route.routes[moduleRoute].controller).toEqual(controllerStr);
			expect($route.routes[moduleRoute].templateUrl).toEqual(templateUrl);
		}));
	});

	describe('location change', function() {
		it('should load the template', inject(function($route, $location, $rootScope) {

			var $httpBackend;
			inject(function($injector) {
				$httpBackend = $injector.get('$httpBackend');
			});
			$httpBackend.whenGET(templateUrl).respond('<div></div>');

			expect($route.current).toBeUndefined();
			$location.path(moduleRoute);
			$rootScope.$digest();

			expect($route.current.templateUrl).toEqual(templateUrl);
			expect($route.current.controller).toEqual(controllerStr);
		}));
	});
});
