(function(){
    angular
        .module('sisagmApp.core.directives')
        .controller('SisagmHeaderController', SisagmHeaderController);

    /* @ngInject */
    function SisagmHeaderController($scope, $mdMedia, $timeout, $rootScope, $state,$localStorage, $sessionStorage,Principal){
        var vm = this;
        vm.isAuthenticated = Principal.isAuthenticated();
        Principal.hasAuthority('AUDIENCIA').then(function(account) {
            console.log(account)
        })

        Principal.identity().then(function(account) {
            vm.currentAccount = account;
            // console.log(account);

        });
        vm.logout = logout;
        function logout () {
            console.log('LOGOUT')
            delete $localStorage.authenticationToken;
            delete $sessionStorage.authenticationToken;
            $state.go("/login");
        }

    }
})();
