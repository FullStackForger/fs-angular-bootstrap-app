describe('app.pages.logout Controller', function() {
	'use strict'
	var $controller, $q, $rootScope, logoutCtrl, $location, mock
 // -----------------------------
 // mock object
 // -----------------------------
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

	// -----------------------------
	// test setup
	// -----------------------------
	beforeEach(module('app.pages.logout'))
	beforeEach(module(function($provide) {
		$provide.value('$auth', mock.$auth)
		$provide.value('toastr', mock.toastr)
	}))

	beforeEach(inject(function(_$controller_, _$q_, _$rootScope_, _$auth_, _$location_, _$interval_, _toastr_) {
		$controller = _$controller_
		$q = _$q_
		$rootScope = _$rootScope_
		$location = _$location_
		mock.logoutDeferred = $q.defer()
		mock.createController = function () {
			return $controller('LogoutController', {
				$scope: $rootScope.$new(),
				$location: _$location_,
				$auth: _$auth_,
				$interval: _$interval_,
				toastr: _toastr_
			})
		}
	}))

	// -----------------------------
	// test specs
	// -----------------------------
	it('should notify with info popup', function () {
		spyOn(mock.toastr, 'info')
		mock.createController()
		mock.resolveLogoutDeferred()
		expect(mock.toastr.info).toHaveBeenCalled()
	})


	xit('should redirect to main page', function(done) {
		expect('not implemented test').toBe('ASYNC')
		done()
		/*
		   // fix it!
				mock.createController()
				mock.resolveLogoutDeferred()

				spyOn($location, 'path');
				setTimeout(function() {
					expect($location.path).toHaveBeenCalledWith('/new/path');
					expect($location.path()).toEqual('/')
					done()
				}, 3100)
		*/
		}, 4000)

})
