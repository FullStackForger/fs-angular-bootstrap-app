(function () {
	'use strict'
	angular
		.module('app.com')
		.factory('account', function($http, $q) {
			return {
				getProfile: function() {
					return $http.get('/api/me')
				},
				updateProfile: function(profileData) {
					return $http.put('/api/me', profileData)
				}
			}
		})
})()