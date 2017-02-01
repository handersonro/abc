(function(){
    angular
        .module('sisagmApp.login.controllers')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($scope,$state,Principal,$localStorage){
        var vm = this;
        vm.isAuthenticated = Principal.isAuthenticated();
        if($localStorage.authenticationToken !== undefined){
            // location.reload();
            $state.go("app.private.home.pagina-inicial");
            // history.go(0);

        }

        // $scope.login =function(){
        //     location.reload();grunt
        // }

    }
})();
