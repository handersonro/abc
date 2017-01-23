(function(){
    angular
        .module('sisagmApp.login.controllers')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($scope,$state,Principal){
        var vm = this;

        vm.isAuthenticated = Principal.isAuthenticated();
        if(vm.isAuthenticated){
            // location.reload();
            $state.go("app.private.home.pagina-inicial");
            // history.go(0);

        }

        // $scope.login =function(){
        //     location.reload();grunt
        // }

    }
})();
