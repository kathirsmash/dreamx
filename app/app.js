angular.module('app', ['ui.router'])
    .config(config)
    .run(run);

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
        .state('dashboard', {url: '/', templateUrl: 'dashboard/dashboard.html', controller: 'Dashboard.Controller', controllerAs: 'vm'})
        .state('employee', {url: '/employee', templateUrl: 'employee/employee.html', controller: 'Employee.Controller', controllerAs: 'vm'})
        .state('state', {url: '/state', templateUrl: 'state/state.html', controller: 'State.Controller', controllerAs: 'vm'})

        $urlRouterProvider.otherwise('/');
    }

    function run($http, $rootScope, $window, ApiService) {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;
        ApiService.readLoginUser().then(function(user) {
            if(user.status == 200) {
                $rootScope.loginUser = user.data;
            }
        });
    }

$(function () {
    $.get('/app/token', function (token) {
        window.jwtToken = token;
        angular.bootstrap(document, ['app']);
    });
});