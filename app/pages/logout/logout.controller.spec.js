'use strict'
fdescribe('app.modules.bill.internal BillController', function () {
	var $controller, $q, $rootScope, logoutCtrl, mock

	mock = {}
	mock.logoutDeferred = null
	mock.$auth = {
		logout : function () {
			return mock.logoutDeferred.promise
		}
	}
	mock.toastr = {
		info: function () { }
	}
	mock.resolveLogoutDeferred = function (cb) {
		mock.logoutDeferred.resolve()
		$rootScope.$digest()
	}

	beforeEach(module('IFSP.App.Pages.Logout'));
	beforeEach(module(function($provide) {
		$provide.value('$auth', mock.$auth)
		$provide.value('toastr', mock.toastr)
	}))

	beforeEach(inject(function(_$controller_, _$q_, _$rootScope_, _$auth_, _$location_, _$interval_, _toastr_) {
		$controller = _$controller_
		$q = _$q_
		$rootScope = _$rootScope_
		mock.logoutDeferred = $q.defer()
		mock.createController = function () {
			return $controller('LogoutController', {
				$location: _$location_,
				$auth: _$auth_,
				$interval: _$interval_,
				toastr: _toastr_
			})
		}
	}))

	it('should notify with info popup', function () {
		spyOn(mock.toastr, 'info')
		mock.createController()
		mock.resolveLogoutDeferred()
		expect(mock.toastr.info).toHaveBeenCalled()
	})

	it('should redirect to main page', inject(function($location, $rootScope) {
		$location.path('/controller-test')
		mock.createController()
		setTimeout(function() {
			expect($location.path()).toEqual('/')
		}, 3.5);
	}));
})
