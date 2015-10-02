angular
    .module('IFSP.App', [
        'ngRoute'
    ])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider      
        .otherwise({
            redirectTo: '/'
        });
    }])
