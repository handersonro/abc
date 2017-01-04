(function(){
    angular
        .module('sisagmApp.home.controllers')
        .controller('PaginaInicialController', PaginaInicialController);

    /* @ngInject */
    function PaginaInicialController($scope, AlertsService){
        var vm = this;
        ///////////////////////////////////
        $scope.title = "Seja bem vindo";
    }
})();
