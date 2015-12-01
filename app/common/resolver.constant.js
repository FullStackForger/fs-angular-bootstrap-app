(function() {
'use strict';

	angular
		.module('IFSP.App.Common')
		.constant('resolver', {
			allowRegisteredOnly: allowRegisteredOnly,
			allowGuestOnly: allowGuestOnly
		})

	function allowRegisteredOnly($q, $location, $auth) {
		var deferred = $q.defer()
		if ($auth.isAuthenticated()) {
			deferred.resolve()
		} else {
			deferred.reject()
			$location.path('/login')
		}
		return deferred.promise
	}

	function allowGuestOnly($q, $location, $auth) {
		var deferred = $q.defer()
		console.log($location.path());
		if ($auth.isAuthenticated()) {
			deferred.reject()
			$location.path('/')
		} else {
			deferred.resolve()
		}
		return deferred.promise
	}

})()