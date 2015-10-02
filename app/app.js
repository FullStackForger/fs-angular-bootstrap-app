angular
    .module('IFSP.App', [
        'ngRoute'
    ])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'pages/home/home.tpl.html',
        })        
        .otherwise({
            redirectTo: '/'
        });
    }])
