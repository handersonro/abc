(function(){
    angular
        .module('sisagmApp.errors.controllers')
        .controller('Error401Controller', Error401Controller);

    /* @ngInject */
    function Error401Controller($scope, $timeout,$log, $q,$state, LoginService, AlertsService,Restangular,$http,$localStorage, $sessionStorage,UsuarioLogado){
        var vm = this;
        vm.title = "Error 401";

        console.log('401 controller');
    }
})();
