(function(){
    angular
        .module('sisagmApp.core.directives')
        .controller('SisagmHeaderController', SisagmHeaderController);

    /* @ngInject */
    function SisagmHeaderController($scope, $mdMedia, $timeout, $rootScope, $state,$localStorage, $sessionStorage,Principal){
        var vm = this;
        vm.isAuthenticated = Principal.isAuthenticated();

        console.log('>>>>>>>>>> ',Principal.isAuthenticated());

        $scope.showLogoutButton = Principal.isAuthenticated();

        Principal.identity().then(function(account) {
            vm.currentAccount = account;
            // console.log(account);

        });

        $scope.logout = function logout () {
            console.log('LOGOUT>>>>>>>>> isAuthenticated: ',Principal.isAuthenticated());

            delete $localStorage.authenticationToken;
            delete $sessionStorage.authenticationToken;
            //$state.go("app.public.login.entrar");
            location.reload();
        }

    }
})();
