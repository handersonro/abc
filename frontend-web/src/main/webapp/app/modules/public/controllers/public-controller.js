(function(){
    angular
        .module('sisagmApp.public.controllers')
        .controller('PublicController', PublicController);

    /* @ngInject */
    function PublicController($scope){

        ///////////////////////////////////
        console.log("Hello from PublicController!");
    }
})();
