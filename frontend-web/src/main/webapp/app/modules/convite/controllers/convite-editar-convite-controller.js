(function(){
    angular
        .module('sisagmApp.convite.controllers')
        .controller('ConviteEditarConviteController', ConviteEditarConviteController);

    /* @ngInject */
    function ConviteEditarConviteController($scope, $window, $mdDialog, AlertsService, $stateParams, $state, ConviteRestService,EventoService,Principal){
        var vm = this;
        vm.isEdicao = true;
        vm.title = "Editar convite";

        Principal.identity().then(function(account) {
            vm.autoridade  = account.userAutenticado.autoridade.noAutoridade;
        });

        vm.convite = $stateParams.convite;


        if(vm.convite == null){
            $state.go('app.private.convite.pesquisar-convite', {reload: true});
        }

        vm.convite.dtInicioEvento = new Date(vm.convite.dtInicioEvento);
        vm.convite.dtInicioEvento.setHours(vm.convite.dtInicioEvento.getHours()-2);

        vm.convite.dtFimEvento = new Date(vm.convite.dtFimEvento);
        vm.convite.dtFimEvento.setHours(vm.convite.dtFimEvento.getHours()-2);

        vm.convite.dtCadastro = new Date(vm.convite.dtCadastro);
        vm.convite.dtCadastro.setHours(vm.convite.dtCadastro.getHours()-2);

        vm.limpar = limpar;
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvar = salvar;
        vm.help = help;
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

            EventoService.obterPaisPorId(vm.convite.idPais)
                .success(function (data) {
                    vm.convite.idPais = data;
                });

            vm.validacoes=[
                {validado : {label:'Sim',value:'SIM'}},
                {validado : {label:'Não',value:'NAO'}},
                {validado : {label:'Indiferente',value:''}}
            ];
        }


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

            if (vm.convite.dtInicioEvento.getTime() > vm.convite.dtFimEvento.getTime()) {
                $window.scrollTo(0, 0);
                return AlertsService.success('O início do evento deve ser anterior ao término.');
            }



            if(vm.convite.flEventoInternacional =='Evento nacional'){
                vm.convite.flEventoInternacional = 0;
                vm.convite.idPais = vm.convite.idPais.id = 1;
                vm.convite.idLocalidade = vm.convite.idLocalidade.id;
            }else if(vm.convite.flEventoInternacional =='Evento internacional'){
                vm.convite.flEventoInternacional = 1;
                vm.convite.noLocalEvento = vm.convite.idPais.noPais;
                vm.convite.idPais = vm.convite.idPais.id;
            }
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

        /*MODAL*/
        function help(ev) {
            $mdDialog.show({
                controller: ConviteEditarConviteController,
                templateUrl: 'modules/convite/help/modal-editar-help.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        };
        $scope.close = function() {
            $mdDialog.cancel();
        };
        /*MODAL*/

    }
})();
