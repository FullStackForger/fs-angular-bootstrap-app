"use strict";
describe("logoin api service", function () {
	var $httpBackend, $rootScope, authRequestHandler, authService

  beforeEach(module("IFSP.App.Pages.Login"))

  beforeEach(inject(function ($injector) {
     $httpBackend = $injector.get('$httpBackend')
     authRequestHandler = $httpBackend.when('POST', '/api/auth/login')
		 authService =  $injector.get('loginService')
  }))

})