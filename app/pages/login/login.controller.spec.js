'use strict'
describe('app.modules.bill.internal BillController', function () {
	var $controller, $q, $rootScope, loginCtrl, mock

	mock = {}
	mock.loginDeferred = null
	mock.$auth = {
		login : function () {
			return mock.loginDeferred.promise
		}
	}

	mock.toastr = {
		success: function () { },
		error:function () { },
	}

	mock.resolveloginDeferred = function (cb) {
		mock.loginDeferred.resolve({ token: 'xxxxxxxxxxx.yyyyyyyy.zzzzzzzzzzzzz' })
		$rootScope.$digest()
	}

	mock.rejectLoginDeferred = function (cb) {
		mock.loginDeferred.reject({ status: 501, data: { message: 'Some Error Message' }})
		$rootScope.$digest()
	}

	beforeEach(module('IFSP.App.Pages.Login'));
	beforeEach(module(function($provide) {
		$provide.value('$auth', mock.$auth)
		$provide.value('toastr', mock.toastr)
	}))

	beforeEach(inject(function(_$controller_, _$q_, _$rootScope_, _$auth_, _toastr_) {
		$controller = _$controller_
		$q = _$q_
		$rootScope = _$rootScope_
		mock.loginDeferred = $q.defer()
		loginCtrl  = $controller('LoginController', {
			$auth: _$auth_,
			toastr: _toastr_
		})
	}))

	it('should retrieve a token', function () {
		expect(loginCtrl.token).toBeUndefined()
		loginCtrl.login({ email: 'test@gmail.com', password: '123qwe'})
		expect(loginCtrl.token).toBeUndefined()
		mock.resolveloginDeferred()
		expect(loginCtrl.token).not.toBeUndefined()
	})

	it('should notify with success popup', function () {
		loginCtrl.login({ email: 'test@gmail.com', password: '123qwe'})
		spyOn(mock.toastr, 'success')
		mock.resolveloginDeferred()
		expect(mock.toastr.success).toHaveBeenCalled()
	})

	it('should notify with error popup', function () {
		loginCtrl.login({ email: 'test@gmail.com', password: '123qwe'})
		spyOn(mock.toastr, 'error')
		mock.rejectLoginDeferred()
		expect(mock.toastr.error).toHaveBeenCalled()
	})

})
