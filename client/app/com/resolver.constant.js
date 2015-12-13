(function() {
'use strict';

	angular
		.module('app.com')
		.constant('resolver', {
			allowRegisteredOnly: allowRegisteredOnly,
			allowGuestOnly: allowGuestOnly
		})

	function allowRegisteredOnly($q, $location, $auth, toastr) {
		var deferred = $q.defer()
		if ($auth.isAuthenticated()) {
			deferred.resolve()
		} else {
			toastr.warning('Log in to view this page.')
			deferred.reject()
			$location.path('/login')
		}
		return deferred.promise
	}

	function allowGuestOnly($q, $location, $auth, toastr) {
		var deferred = $q.defer()
		console.log($location.path());
		if ($auth.isAuthenticated()) {
			toastr.warning('You are already logged in.')
			deferred.reject()
			$location.path('/')
		} else {
			deferred.resolve()
		}
		return deferred.promise
	}

})()