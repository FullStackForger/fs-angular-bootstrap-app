(function() {
	'use strict'
	angular
		.module('IFSP.App.Pages.Login')
		.service('LoginService', LoginService)

	LoginService.$inject = ['$http', '$q']
	function LoginService($http) {
		this.login = login

		function login(user) {
			var deferred = $q.defer()

			$http.post('/auth/login', user).then(function (response) {
				deferred.resolve(data.data)
			}, function (error) {
				console.log(error)
				deferred.reject('Invalid credentials.')
			})

  		return deferred.promise
		}
	}
})();