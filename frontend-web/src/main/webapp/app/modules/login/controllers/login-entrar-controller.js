(function(){
    angular
        .module('sisagmApp.login.controllers')
        .controller('LoginEntrarController', LoginEntrarController);

    /* @ngInject */
    function LoginEntrarController($scope, $timeout,$log, $q,$state, LoginService, AlertsService,Restangular,$http,$localStorage, $sessionStorage,UsuarioLogado){
        var vm = this;
        vm.logar = logar;
        vm.user = {};

        function logar () {
            LoginService.autenticar(vm.user)
                .then(
                    function(retorno){
                        $localStorage.authenticationToken = retorno.id_token;
                        $state.go('app.private.home.pagina-inicial');
                    })
                .catch(function (retorno) {
                    if(retorno.data != null){
                        AlertsService.error(retorno.data.mensagens!= null ?  retorno.data.mensagens[0].msg: 'Ocorreu um erro interno na aplicação, por favor contate o administrador do sistema!');
                        vm.user = {};
                        $scope.formLogin.$setPristine();
                        $scope.formLogin.$setUntouched();
                    }
                });
        }
    }
})();
