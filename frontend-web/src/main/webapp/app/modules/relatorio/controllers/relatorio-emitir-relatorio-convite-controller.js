(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioEmitirRelatorioConviteController', RelatorioEmitirRelatorioConviteController);

    /* @ngInject */
    function RelatorioEmitirRelatorioConviteController($scope, $mdDialog, $timeout, ConviteRestService, DTO, $state){
        var vm = this;
        vm.procurarLocal = ConviteRestService.obterLocais;
        vm.procurarPaises = ConviteRestService.obterPaises;
        vm.procurarRemetente = ConviteRestService.obterRemetentes;
        vm.title = "Relatório de convite";
        vm.autoridade = "Ministro";

        vm.dto = new DTO();
        vm.gerarRelatorio = gerarRelatorio;
        vm.filtro = {};
        $state.params.filtro.filtros = {'tipoEvento.id' : 2 };
        vm.relatorio ={};
        ///////////////////////////////////

        vm.tipoEvento = {};
        vm.tiposSaida = {};
        vm.ordenacoes = {};
        vm.direcoes = {};
        vm.validado = {};


        vm.validado = [
            {validado: 'Sim'},
            {validado: 'Não'},
            {validado: 'Indiferente'}

        ]
        vm.tiposSaida = [
            {tipo: 'PDF'},
            {tipo: 'WORD'}
        ];
        vm.ordenacoes = [
            {ordenacao: 'Data de cadastro', value: "dtCadastro"},
            {ordenacao: 'Data do evento', value: "dtInicioEvento"},
            {ordenacao: 'Local do evento', value: "noLocalEvento"},
            {ordenacao: 'Nome do remetente', value: "remetente.noRemetente"}
        ];
        vm.direcoes = [
            {direcao: 'Crescente', value: "asc"},
            {direcao: 'Decrescente', value: "desc"}
        ];

        vm.limpar = function(){
            vm.filtro.ordenacao = undefined;
            vm.filtro.direcao = undefined;
            vm.filtro.remetente = undefined;
            vm.filtro.flEventoInternacional = undefined;
            vm.filtro.despacho = undefined;
            vm.filtro.descricao = undefined;
            vm.filtro.observacao = undefined;
            vm.filtro.idPais = undefined;
            vm.filtro.noCidadeInternacional = undefined;
            vm.filtro.idLocalidade = undefined;
            vm.filtro.validado = undefined;
            vm.filtro.dtInicioEvento = undefined;
            vm.filtro.dtFimEvento = undefined;
            vm.filtro.dataCadInicial = undefined;
            vm.filtro.dataCadFina = undefined;
        }
        vm.backTlPesquisa = function(){
            vm.title = "Relatório de convite";

        }
        function gerarRelatorio() {
            tratarCamposParaGerarRelatorio();
            var filtroPaginacao = montarFiltros();
            $state.get('app.private.relatorio.relatorio-solicitar-convite').filtroPaginacao = filtroPaginacao;
            $state.go('app.private.relatorio.relatorio-solicitar-convite');
        }

        function tratarCamposParaGerarRelatorio(){

            vm.filtro.dtInicioEvento = vm.filtro.dtInicioEvento != undefined ? new Date(vm.filtro.dtInicioEvento).getTime() : "";
            vm.filtro.dtFimEvento = vm.filtro.dtFimEvento != undefined ? new Date(vm.filtro.dtFimEvento).getTime() : "";
            vm.filtro.dataCadInicial = vm.filtro.dataCadInicial != undefined ? new Date( vm.filtro.dataCadInicial).getTime() : "";
            vm.filtro.dataCadFinal = vm.filtro.dataCadFinal != undefined ? new Date(vm.filtro.dataCadFinal).getTime() : "";

            if(vm.filtro.idPais == undefined || vm.filtro.idPais == "") {
                vm.filtro.idPais = {};
            }
            if(vm.filtro.remetente == null || vm.filtro.remetente == undefined || vm.filtro.remetente == ""){
                vm.filtro.remetente = {};
            }
            if(vm.filtro.idLocalidade == undefined || vm.filtro.idLocalidade == "") {
                vm.filtro.idLocalidade = {};
            }
            if(vm.filtro.ordenacao == undefined){
                vm.filtro.ordenacao = "dtCadastro";
            }
            if(vm.filtro.direcao == undefined){
                vm.filtro.direcao = "asc"
            }
            switch(vm.filtro.validado){
                case "Sim":
                    vm.filtro.validado = "SIM";
                    break;
                case "Não":
                    vm.filtro.validado = "NAO";
                    break;
                default:
                    vm.filtro.validado = undefined;
            }
        }

        function montarFiltros(){
            return {
                "currentPage": $state.params.filtro.currentPage,
                "pageSize": "20",
                "totalResults": "1",
                "sortFields": vm.filtro.ordenacao,
                "sortDirections": vm.filtro.direcao,
                "filtros": {
                    "remetente.noRemetente" : vm.filtro.remetente.noRemetente,
                    "flEventoInternacional" : vm.filtro.flEventoInternacional,
                    "noDespacho" : vm.filtro.despacho,
                    "descricao" : vm.filtro.descricao,
                    "noObservacao" : vm.filtro.observacao,
                    "idPais" : vm.filtro.idPais.id,
                    "noCidadeInternacional" : vm.filtro.noCidadeInternacional,
                    "idLocalidade" : vm.filtro.idLocalidade.id,
                    "conviteValidacao" : vm.filtro.validado,
                    "dtInicioEvento" : vm.filtro.dtInicioEvento,
                    "dtFimEvento" : vm.filtro.dtFimEvento,
                    "dataCadInicial" : vm.filtro.dataCadInicial,
                    "dataCadFinal" : vm.filtro.dataCadFinal
                }
            };
        }

        vm.carregarListConvite = function(){

            console.log('carregarListConvite >>>>>');

             /*ConviteRestService
                 .obterLista({})
                 .then(
                     function(data){
                         $scope.listaConvites = data;
                     },
                     function(error){

                     }
                 );*/
        };
        vm.carregarListConvite();

        function debounce(func, wait, context) {
          var timer;

          return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
              timer = undefined;
              func.apply(context, args);
            }, wait || 10);
          };
        }
        /*DIALOG*/
        vm.showConfirm = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
              .title('Atenção')
              .textContent('Tem certeza que deseja remover esse registro?')
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Sim')
              .cancel('Não');

            $mdDialog.show(confirm).then(function() {
              $scope.status = 'You decided to get rid of your debt.';
            }, function() {
              $scope.status = 'You decided to keep your debt.';
            });
        };
        /*DIALOG*/
    }
})();
