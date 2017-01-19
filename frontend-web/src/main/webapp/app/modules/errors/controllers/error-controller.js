(function(){
    angular
        .module('sisagmApp.errors.controllers')
        .controller('ErrorController', ErrorController);

    /* @ngInject */
    function ErrorController($scope,$state,Principal){
        var vm = this;

        var vm = this;
        vm.title = "Error!!!!!";

        console.log('ERRO CONTROLLER');

    }
})();
