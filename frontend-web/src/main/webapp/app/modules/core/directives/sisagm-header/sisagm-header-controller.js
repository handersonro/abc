(function(){
    angular
        .module('sisagmApp.core.directives')
        .controller('SisagmHeaderController', SisagmHeaderController);

    /* @ngInject */
    function SisagmHeaderController($scope, $mdMedia, $timeout, $rootScope, $state,$localStorage, $sessionStorage){
        var vm = this;
        vm.logout = logout;


        function logout () {
            delete $localStorage.authenticationToken;
            delete $sessionStorage.authenticationToken;
            $state.go("/login");
        }

    }
})();
