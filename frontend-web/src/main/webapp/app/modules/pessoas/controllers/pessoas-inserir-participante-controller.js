(function(){
    angular
        .module('sisagmApp.pessoas.controllers')
        .controller('PessoasInserirParticipanteController', PessoasInserirParticipanteController);

    /* @ngInject */
    function PessoasInserirParticipanteController($scope, $timeout, $log, $state, AlertsService){
        var vm = this;
        vm.title = "Incluir participante";
        vm.participante = {};
        vm.showBtnSalvar = showBtnSalvar;
        vm.limpar = limpar;
        vm.salvar = salvar;

        inicializar();
        ///////////////////////////////////
        function inicializar(){
            vm.participante = {
                  nome: '',
                  cargo: '',
                  email: ''
            };
        }
        function limpar(){
            $state.go('app.private.pessoas.inserir-participante', {}, {reload: true});
        }
        function showBtnSalvar(){
          return $scope.formParticipante.$invalid;
        }
        function salvar(){
            AlertsService.success('Registro incluído com sucesso.');
            $state.go('app.private.pessoas.inserir-participante', {}, {reload: true});
        }

    }
})();
