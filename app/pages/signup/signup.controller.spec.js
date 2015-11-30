fdescribe('IFSP.App.Pages.Signup SignupController', function() {
	'use strict'
	var $controller, $q, $rootScope, logoutCtrl, $location, mock, ctrl
 // -----------------------------
 // mock object
 // -----------------------------
	mock = {}
	mock.signupDeferred = null
	mock.$auth = {
		signup : function () {
			return mock.signupDeferred.promise
		},
		setToken : function ( ) { }
	}
	mock.toastr = {
		info: function () { },
		error: function () { }
	}
	mock.resolveSignupDeferred = function (cb) {
		mock.signupDeferred.resolve()
		$rootScope.$digest()
	}
	mock.rejectSignupDeferred = function (cb) {
		mock.signupDeferred.reject({ data: { message: 'some error '}})
		$rootScope.$digest()
	}

	// -----------------------------
	// test setup
	// -----------------------------
	beforeEach(module('IFSP.App.Pages.Signup'))

	beforeEach(module(function($provide) {
		$provide.value('$auth', mock.$auth)
		$provide.value('toastr', mock.toastr)
	}))

	beforeEach(inject(function(_$controller_, _$q_, _$rootScope_, _$auth_, _$location_, _toastr_) {
		$controller = _$controller_
		$q = _$q_
		$rootScope = _$rootScope_
		$location = _$location_
		mock.signupDeferred = $q.defer()
		ctrl = $controller('SignupController', {
			$location: _$location_,
			$auth: _$auth_,
			toastr: _toastr_
		})

	}))

	// -----------------------------
	// test specs
	// -----------------------------
	it('should set token', function () {
		spyOn(mock.$auth, 'setToken')
		ctrl.signup({ /* user data */ })
		mock.resolveSignupDeferred()
		expect(mock.$auth.setToken).toHaveBeenCalled()
	})

	it('should notify with info popup', function () {
		spyOn(mock.toastr, 'info')
		ctrl.signup({ /* user data */ })
		mock.resolveSignupDeferred()
		expect(mock.toastr.info).toHaveBeenCalled()
	})

	it('should notify with error popup', function () {
		spyOn(mock.toastr, 'error')
		ctrl.signup({ /* user data */ })
		mock.rejectSignupDeferred()
		expect(mock.toastr.error).toHaveBeenCalled()
	})
})