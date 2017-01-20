(function(){
    angular
        .module('sisagmApp.pessoas.controllers')
        .controller('PessoasEditarParticipanteController', PessoasEditarParticipanteController);
    /* @ngInject */
    function PessoasEditarParticipanteController($scope, $timeout, $http, AlertsService, $stateParams, $state, ParticipanteInternoService, ParticipanteExternoService){
        var vm = this;
        vm.isEdicao = true;
        vm.title = "Editar participante";
        vm.participante = $stateParams.participante;
        if(vm.participante == null){
            $state.go('app.private.pessoas.pesquisar-participante');
        }
        vm.limpar = limpar;
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvarParticipanteExterno = salvarParticipanteExterno;
        vm.salvarParticipanteInterno = salvarParticipanteInterno;
        ///////////////////////////////////
        function limpar(){
            vm.participante.nome = '';
            vm.participante.email = '';
            vm.participante.cargo = '';
            vm.participante.tel = '';
        }
        function salvarParticipanteInterno(){
            vm.participanteVO ={
                id:vm.participante.id,
                nuTelefone:vm.participante.tel != undefined ? vm.participante.tel.replace(/[^0-9]/g, '') : '',
                noParticianteExterno:vm.participante.nome,
                noCargo:vm.participante.cargo,
                noEmail:vm.participante.email
            };
            ParticipanteInternoService.editar(vm.participanteVO).then(
                function (retorno) {
                    AlertsService.success('Registro alterado com sucesso.');
                    $state.go('app.private.pessoas.pesquisar-participante');
                }
            );
        }
        function salvarParticipanteExterno(){
            console.log("1");
            vm.participanteVO ={
                id:vm.participante.id,
                nuTelefone:vm.participante.tel != undefined ? vm.participante.tel.replace(/[^0-9]/g, '') : '',
                noParticipanteExterno:vm.participante.nome,
                noCargo:vm.participante.cargo,
                noEmail:vm.participante.email,
                pessoa:vm.participante.pessoa
            };
            console.log(vm.participanteVO);
            ParticipanteExternoService.editar(vm.participanteVO).then(
                function (retorno) {
                    AlertsService.success('Registro alterado com sucesso.');
                    $state.go('app.private.pessoas.pesquisar-participante');
                }
            );
        }
        function showBtnSalvar(){
            return $scope.formParticipante.$invalid;
        }
    }
})();