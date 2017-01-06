(function(){
    angular
        .module('sisagmApp.login.controllers')
        .controller('LoginEntrarController', LoginEntrarController);

    /* @ngInject */
    function LoginEntrarController($scope, $timeout,$log, $q,$state, LoginService, AlertsService,Restangular){
        var vm = this;
        vm.logar = logar;
        vm.user = {};

        function logar () {
            LoginService.autenticar(vm.user)
                .then(
                function(retorno){
                    AlertsService.success("Usuário Logado")
                }).catch(function (retorno) {
                    AlertsService.success(retorno.data.mensagens[0].msg)
                });
        }
    }
})();
