'use strict'
describe('app.modules.bill.internal BillController', function () {
	var $controller, $q, $rootScope, loginCtrl, mock

	mock = {}
	mock.loginDeferred = null
	mock.loginService = {
		login : function () {
			return mock.loginDeferred.promise
		}
	}
	mock.toastr = {
		success: function () { },
		error: function () { }
	}
	mock.resolveloginDeferred = function (cb) {
		mock.loginDeferred.resolve({ token: 'xxxxxxxxxxx.yyyyyyyy.zzzzzzzzzzzzz' })
		$rootScope.$digest()
	}

	beforeEach(module('IFSP.App.Pages.Login'));
	beforeEach(module(function($provide) {
		$provide.value('loginService', mock.loginService)
		$provide.value('toastr', mock.toastr)
	}))

	beforeEach(inject(function(_$controller_, _$q_, _$rootScope_, _loginService_, _toastr_) {
		$controller = _$controller_
		$q = _$q_
		$rootScope = _$rootScope_
		mock.loginDeferred = $q.defer()
		loginCtrl  = $controller('LoginController', {
			loginService: _loginService_,
			toastr: _toastr_
		})
		//loginCtrl = _LoginController_
	}))


	it('should retrieve a token', function () {
		expect(loginCtrl.token).toBeUndefined()
		loginCtrl.login({ email: 'test@gmail.com', password: '123qwe'})
		expect(loginCtrl.token).toBeUndefined()
		mock.resolveloginDeferred()
		expect(loginCtrl.token).not.toBeUndefined()
	})

	it('should notify with success popup', function () {

	})

	it('should notify with error popup', function () {

	})

})
