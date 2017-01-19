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

        //caso seja recarregado a tela no editar o $stateParams.reuniao retorna vazio e quebra a tela
        //redireiona a tela para o pesquisar novamente
        if(vm.convite == null){
            $state.go('app.private.reuniao.pesquisar-convite');
        }

        var tipoEvento = {id: 2,noTipoEvento: 'CONVITE'};
        vm.convite.tipoEvento = tipoEvento;


        EventoService.obterLocalidadePeloId(vm.convite.idLocalidade)
            .success(function (data) {
                vm.convite.idLocalidade = data;
            });

            vm.validacoes=[
                {validado : {label:'Sim',value:'SIM'}},
                {validado : {label:'Não',value:'NAO'}},
                {validado : {label:'Indiferente',value:''}}
            ];
        }
        console.log(vm.convite);
        function limpar(){
            vm.convite.dtInicioEvento = '';
            vm.convite.dtFimEvento = '';
            vm.convite.dtCadastro = '';
            vm.convite.conviteValidacao = '';
            vm.convite.remetente = '';
            vm.convite.flEventoInternacional = '';
            vm.convite.idPais = '';
            vm.convite.noCidadeInternacional = '';
            vm.convite.noLocalEvento = '';
            vm.convite.idLocalidade = '';
            vm.convite.noDespacho = '';
            vm.convite.descricao = '';
            vm.convite.noObservacao = '';
        }
        function salvar(convite){
            if(vm.convite.flEventoInternacional =='Evento nacional'){
                vm.convite.flEventoInternacional = 0;
                vm.convite.idPais = 1;
            }else if(vm.convite.flEventoInternacional =='Evento internacional'){
                vm.convite.flEventoInternacional = 1;
                vm.convite.idPais = vm.convite.idPais.id;
            }

            vm.convite.idLocalidade = vm.convite.idLocalidade.id;

            ConviteRestService.editar(convite).then(
                function (retorno) {
                    AlertsService.success('Registro alterado com sucesso.');
                    $state.go('app.private.convite.pesquisar-convite');
                }
            );
        }

        function showBtnSalvar(){
          return $scope.formConvite.$invalid;
        }

    }
})();
