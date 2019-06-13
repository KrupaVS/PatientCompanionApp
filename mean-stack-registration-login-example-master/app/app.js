(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            })           
            .state('diagnosis', {
                url: '/diagnosis',
                templateUrl: 'diagnosis/index.html',
                controller: 'Diagnosis.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'diagnosis' }
            })
            .state('treatment', {
                url: '/treatment',
                templateUrl: 'treatment/index.html',
                controller: 'Treatment.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'treatment' }
            })
            .state('recovery', {
                url: '/recovery',
                templateUrl: 'recovery/index.html',
                controller: 'Recovery.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'recovery' }
            })
            .state('medicalhistory', {
                url: '/medicalhistory',
                templateUrl: 'medicalhistory/index.html',
                controller: 'MedicalHistory.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'medicalhistory' }
            });
    }

    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });
})();