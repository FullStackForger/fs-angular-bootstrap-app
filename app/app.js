angular
    .module('IFSP.App', [
        'ngRoute',
				'IFSP.App.Pages'
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
        .otherwise({
            redirectTo: '/'
        });
    }])