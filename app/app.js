angular
    .module('IFSP.App', [
        'ngRoute',
				'IFSP.App.Pages'
    ])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.otherwise({
            redirectTo: '/home'
        });
    }])