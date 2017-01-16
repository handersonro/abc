(function(){
    angular
        .module('sisagmApp.login.controllers')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($scope,$state,Principal){
        var vm = this;

        vm.isAuthenticated = Principal.isAuthenticated();
        if(vm.isAuthenticated){
            $state.go("app.public.home.pagina-inicial");
        }

    }
})();
