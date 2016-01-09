(function () {
	'use strict'
	angular
		.module('app.com')
		.factory('account', function($http, $q, config) {
			return {
				getProfile: function() {
					return $http.get(config.apiUrl + '/me')
				},
				updateProfile: function(profileData) {
					return $http.put(config.apiUrl + '/me', profileData)
				}
			}
		})
})()