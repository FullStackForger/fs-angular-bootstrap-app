angular
    .module('IFSP.App', [
        'ngRoute'
    ])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'pages/home/home.tpl.html',
        })
        .when('/info', {
            templateUrl: 'pages/info/info.tpl.html',
        })
        .when('/profile', {
            templateUrl: 'pages/profile/profile.tpl.html',
        })
        .when('/settings', {
            templateUrl: 'pages/settings/settings.tpl.html',
        })
				.when('/login', {
						controller: 'LoginController',
						controllerAs: 'loginCtrl',
            templateUrl: 'pages/login/login.tpl.html',
        })
        .otherwise({
            redirectTo: '/'
        });
    }])