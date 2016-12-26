(function(){
    'use strict';

    angular
        .module('pessoa.controllers')
        .controller('PessoaController', PessoaController);

    /*@ngInject*/
    function PessoaController() {
        var vm = this;

        console.log('Hello from PessoaController!');
    }
})();
