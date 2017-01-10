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

                    console.log(retorno.id_token);
                    console.log(LoginService.current());
                    console.log(LoginService);

                    LoginService.current().setDefaultHeaders({'Authorization': 'Basic ' + retorno.id_token }).then(function(retorno2){
                        console.log(retorno2);
                    })





                }).catch(function (retorno) {
                    if(retorno.data != null){
                        AlertsService.error(retorno.data.mensagens!= null ?  retorno.data.mensagens[0].msg: '');
                    }
                });
        }
    }
})();
