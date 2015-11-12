'use strict';

describe('IFSP.App.Pages.Login', function() {

	var moduleRoute = '/login',
		templateUrl = 'pages/login/login.tpl.html',
		controllerStr = 'LoginController as loginCtrl';

	beforeEach(module('IFSP.App.Pages.Login'));

	it('should load the template', inject(function($route) {
		expect($route.routes[moduleRoute].controller).toEqual(controllerStr);
		expect($route.routes[moduleRoute].templateUrl).toEqual(templateUrl);
	}));

});
