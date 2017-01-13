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
                        account();
                    }).catch(function (retorno) {
                if(retorno.data != null){
                    console.log( retorno.data.mensagens[0].msg)
                    AlertsService.error(retorno.data.mensagens!= null ?  retorno.data.mensagens[0].msg: '');
                }
            });
        }

        function account() {

            UsuarioLogado.obterUsuario().then(                    function(retorno){



                console.log(retorno)
                }
                );
            // $http({method: 'GET', url: 'http://localhost:8080/sisagm/api/autenticar/account', headers: {
            //     'Authorization': 'Bearer '+ retorno.id_token}
            // });

        }
    }
})();
