"use strict";
describe("logoin api service", function () {
	var $httpBackend, $rootScope, authRequestHandler, authService

  beforeEach(module("IFSP.App.Pages.Login"))

  beforeEach(inject(function ($injector) {
     $httpBackend = $injector.get('$httpBackend')
     authRequestHandler = $httpBackend.when('POST', '/api/auth/login')
		 authService =  $injector.get('loginService')
  }))

	it('should resolve with token', function () {
		authRequestHandler.respond(200, { token: 123 })
		authService.login({
			email: 'random@gmail.com',
			password: 'rAnDoMpaSS'
		}).then(function (data) {
			expect(data.token).to.equal(123)
		})
	})

	it('should resolve with error', function () {
		authRequestHandler.respond(401, { token: 123 })
		authService.login({
			email: 'random@gmail.com',
			password: 'rAnDoMpaSS'
		}).then(function (data) {
			expect(data.token).to.equal(123)
		})
	})

})