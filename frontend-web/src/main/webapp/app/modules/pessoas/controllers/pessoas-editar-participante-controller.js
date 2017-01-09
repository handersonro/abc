(function(){
    angular
        .module('sisagmApp.pessoas.controllers')
        .controller('PessoasEditarParticipanteController', PessoasEditarParticipanteController);

    /* @ngInject */
    function PessoasEditarParticipanteController($scope, $timeout, $http, AlertsService, $stateParams, $state, ParticipanteInternoService, ParticipanteExternoService){
        var vm = this;
        vm.title = "Editar participante";
        vm.participante = $stateParams.participante;

        vm.limpar = limpar;
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvar = salvar;


        ///////////////////////////////////

        function limpar(){
            vm.participante ={};
        }

        function salvar(){
            participante.nuTelefone = remetente.nuTelefone.replace(/[^0-9]/g, '');

            console.log(participante);

            ParticipanteInternoService.editar(participante).then(
                function (retorno) {
                    AlertsService.success('Registro alterado com sucesso.');
                    $state.go('app.private.pessoas.pesquisar-participante');
                }
            );

/*            ParticipanteExternoService.editar(participante).then(
                function (retorno) {
                    AlertsService.success('Registro alterado com sucesso.');
                    $state.go('app.private.pessoas.pesquisar-participante');
                }
            );*/
        }

        function showBtnSalvar(){
          return $scope.formParticipante.$invalid;
        }

    }
})();
