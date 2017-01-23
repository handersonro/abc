(function(){
    angular
        .module('sisagmApp.core.directives')
        .controller('SisagmHeaderController', SisagmHeaderController);

    /* @ngInject */
    function SisagmHeaderController($scope, $mdMedia, $timeout, $rootScope, $state,$localStorage,Principal,versaoProjeto, ambiente){
        var vm = this;
        vm.isAuthenticated = Principal.isAuthenticated();
        vm.versaoProjeto = versaoProjeto;
        vm.ambiente = ambiente;

        $scope.showLogoutButton = Principal.isAuthenticated();
        if(Principal.isAuthenticated()){
            Principal.identity().then(function(account) {
                $scope.nomeUsuarioLogado = account.userAutenticado.noLogin;
                $scope.nomeUsuario = account.userAutenticado.noUsuario;
            });
        }

        $scope.logout = function logout () {
            delete $localStorage.authenticationToken;
            history.go(0);
            $state.go("app.public.login.entrar");
        }

    }
})();
