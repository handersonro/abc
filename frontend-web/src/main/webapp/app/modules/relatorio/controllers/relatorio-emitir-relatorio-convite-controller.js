(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioEmitirRelatorioConviteController', RelatorioEmitirRelatorioConviteController);

    /* @ngInject */
    function RelatorioEmitirRelatorioConviteController($scope, $mdDialog, $timeout, ConviteRestService, DTO, $state){
        var vm = this;
        vm.procurarLocal = ConviteRestService.obterLocais;
        vm.procurarPaises = ConviteRestService.obterPaises;
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
            {ordenacao: 'Data de cadastro'},
            {ordenacao: 'Data do evento'},
            {ordenacao: 'Descrição'},
            {ordenacao: 'Local do evento'},
            {ordenacao: 'Nome do remetente'}
        ];
        vm.direcoes = [
            {direcao: 'Crescente'},
            {direcao: 'Decrescente'}
        ];

        vm.limpar = function(){

        }
        vm.backTlPesquisa = function(){
            vm.title = "Relatório de convite";

        }
        function gerarRelatorio() {

            if(vm.filtro.idPais == undefined || vm.filtro.idPais == "") {
                vm.filtro.idPais = {};
            }
            if(vm.filtro.idLocalidade == undefined || vm.filtro.idLocalidade == "") {
                vm.filtro.idLocalidade = {};
            }

            var idPais =
            vm.filtroPaginacao = {
                "currentPage": $state.params.filtro.currentPage,
                "pageSize": "20",
                "totalResults": "1",
                "sortFields": "id",
                "sortDirections": "asc",
                "filtros": {
                    "tipoEvento.id": 2,
                    "remetente.noRemetente" : vm.filtro.remetente,
                    "flEventoInternacional" : vm.filtro.flEventoInternacional,
                    "noDespacho" : vm.filtro.despacho,
                    "descricao" : vm.filtro.descricao,
                    "idPais" : vm.filtro.idPais.id,
                    "noCidadeInternacional" : vm.filtro.noCidadeInternacional,
                    "idLocalidade" : vm.filtro.idLocalidade.id,
                    "conviteValidacao" : vm.filtro.validado,
                    "noObservacao" : vm.filtro.observacao,
                }
            };

            $state.get('app.private.relatorio.relatorio-solicitar-convite').filtroPaginacao = vm.filtroPaginacao;
            $state.go('app.private.relatorio.relatorio-solicitar-convite');

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
