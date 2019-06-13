(function () {
    'use strict';

    angular
        .module('app')
        .controller('Diagnosis.IndexController', Controller);

    function Controller($window, UserService) {
        var vm = this;

        vm.user = null;
        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

       
        
    }

})();