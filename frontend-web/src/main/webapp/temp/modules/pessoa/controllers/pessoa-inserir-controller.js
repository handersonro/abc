(function(){
    'use strict';

    PessoaInserirController.$inject = ["Pessoa", "PessoaBuilder", "$state"];
    angular
        .module('pessoa.controllers')
        .controller('PessoaInserirController', PessoaInserirController);

    /*@ngInject*/
    function PessoaInserirController(Pessoa, PessoaBuilder, $state) {
        var vm = this;

        vm.pessoa = {};
        vm.readOnly = false;

        vm.salvar = salvar;
        vm.voltar = voltar;

        init();
        ///////////////////////////////////////
        function init(){
            vm.pessoa = new PessoaBuilder().comIdadeEmAnos(21).build();
        }

        function salvar(){
            vm.pessoa.salvar();
        }
        function voltar(){
            $state.go('app.private');
        }
    }
})();
