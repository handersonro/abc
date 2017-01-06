(function(){
    angular
        .module('sisagmApp.pessoas.controllers')
        .controller('PessoasInserirParticipanteController', PessoasInserirParticipanteController);

    /* @ngInject */
    function PessoasInserirParticipanteController($scope, $timeout, $log, $state, AlertsService, ParticipanteInternoService, ParticipanteExternoService){
        var vm = this;
        vm.title = "Incluir participante";
        vm.participante = {};
        vm.showBtnSalvar = showBtnSalvar;
        vm.limpar = limpar;
        vm.salvar = salvar;

        inicializar();
        ///////////////////////////////////
        function inicializar(){
            vm.participante = {};
        }
        function limpar(){
            $state.go('app.private.pessoas.inserir-participante', {}, {reload: true});
        }
        function showBtnSalvar(){
          return $scope.formParticipante.$invalid;
        }
        function salvar(participante){
            var participanteInterno = montaParticipanteInterno(participante);
            ParticipanteInternoService.salvar(participanteInterno).then(
                function (retorno) {
                    AlertsService.success('Registro incluído com sucesso.');
                    $state.go('app.private.pessoas.inserir-participante', {}, {reload: true});
                }
            );

/*            var participanteExterno = montaParticipanteExterno(participante);
            ParticipanteExternoService.salvar(participanteExterno).then(
                function (retorno) {
                    AlertsService.success('Registro incluído com sucesso.');
                    $state.go('app.private.pessoas.inserir-participante', {}, {reload: true});
                }
            );*/
        }
        function montaParticipanteInterno(participante){
            var participanteInterno = {};
            var pessoa = {flPessoaAtivo: true};
            participanteInterno.noParticipanteInterno = participante.nome;
            participanteInterno.noCargo = participante.cargo;
            participanteInterno.noEmail = participante.email;
            participanteInterno.nuTelefone = participante.tel.replace(/[^0-9]/g,'');
            participanteInterno.pessoa = pessoa;
            return participanteInterno;
        }
        function montaParticipanteExterno(participante){
            var participanteExterno = {};
            var pessoa = {flPessoaAtivo: true};
            participanteExterno.noParticianteExterno = participante.nome;
            participanteExterno.noCargo = participante.cargo;
            if(participante.email != undefined){
                participanteExterno.noEmail = participante.email;
            }
            participanteExterno.pessoa = pessoa;
            return participanteExterno;
        }
    }
})();
