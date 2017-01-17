(function(){
    angular
        .module('sisagmApp.convite.controllers')
        .controller('ConviteEditarConviteController', ConviteEditarConviteController);

    /* @ngInject */
    function ConviteEditarConviteController($scope, $timeout, $http, AlertsService, $stateParams, $state, ConviteRestService,EventoService){
        var vm = this;
        vm.title = "Editar convite";
        vm.autoridade = "Ministro";
        vm.convite = $stateParams.convite;

        vm.limpar = limpar;
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvar = salvar;
        vm.validacoes = {};
        vm.procurarLocal = ConviteRestService.obterLocais;
        vm.procurarRemetente = ConviteRestService.obterRemetentes;
        vm.procurarPaises = ConviteRestService.obterPaises;

        if(vm.convite.flEventoInternacional == false){
            vm.convite.flEventoInternacional = 'Evento nacional';
        }

        if(vm.convite.flEventoInternacional == true){
            vm.convite.flEventoInternacional = 'Evento internacional';
        }


        if(vm.convite.conviteValidacaoEnum == 'NAO'){
            vm.convite.validado = 'Não';
        }

        if(vm.convite.conviteValidacaoEnum == 'SIM'){
            vm.convite.validado = 'Sim';
        }

        if(vm.convite.conviteValidacaoEnum == 'INDIFERENTE'){
            vm.convite.validado = 'Indiferente';
        }


        inicializar();
        ///////////////////////////////////
        function inicializar(){
            EventoService.obterLocalidadePeloId(vm.convite.idLocalidade)
                .success(function (data) {
                    vm.convite.idLocalidade = data;
                });

            vm.validacoes=[
              {validado : 'Sim'},
              {validado : 'Não'},
              {validado : 'Indiferente'}
            ];
        }
        function limpar(){
            vm.convite = {};
        }

        function salvar(convite){

            if(vm.convite.flEventoInternacional =='Evento nacional'){
                vm.convite.flEventoInternacional = 0;
            }else if(vm.convite.flEventoInternacional =='Evento internacional'){
                vm.convite.flEventoInternacional = 1;
            }
            ConviteRestService.editar(convite).then(
                function (retorno) {
                    AlertsService.success('Registro alterado com sucesso.');
                    $state.go('app.private.pessoas.pesquisar-remetente');
                }
            );
        }

        function showBtnSalvar(){
          return $scope.formConvite.$invalid;
        }

    }
})();
