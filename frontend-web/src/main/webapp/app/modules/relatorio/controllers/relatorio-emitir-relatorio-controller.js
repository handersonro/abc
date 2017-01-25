(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioEmitirRelatorioController', RelatorioEmitirRelatorioController);

    /* @ngInject */
    function RelatorioEmitirRelatorioController($scope, $state, $mdDialog,$window, $timeout,ConviteRestService,DTO,RelatorioService){
        var vm = this;
        vm.dto = new DTO();
        vm.gerarRelatorio = gerarRelatorio;
        vm.filtro = {};
        vm.filtroAudiencia = {
            "currentPage": "1",
            "pageSize": "20",
            "totalResults": "1",
            "sortFields": "id",
            "sortDirections": "asc",
            "filtros": {
                //"idLocalidade":7339
            }
        }
        vm.relatorio ={};
        vm.procurarLocal = ConviteRestService.obterLocais;
        ///////////////////////////////////
        vm.title = "Relatório de audiência";
        vm.autoridade = "Ministro";
        vm.tiposSaida = [
            {tipo: 'PDF'},
            {tipo: 'WORD'}
        ];
        vm.ordenacoes = [
            {ordenacao: 'Data de cadastro'},
            {ordenacao: 'Nome do solicitante'},
            {ordenacao: 'Assunto'}
        ];
        vm.direcoes = [
            {direcao: 'Crescente'},
            {direcao: 'Decrescente'}
        ];

        vm.limpar = function(){
         
        }
        inicializar();
        function inicializar() {
            vm.filtro = {};
            console.log('A1 ');
        }

        function gerarRelatorio() {

            var tipoEvento = {id: 1,noTipoEvento: 'AUDIENCIA'};

            $state.params.filtro.filtros.tipoEvento = tipoEvento;
            $state.params.filtro.currentPage = 1;

            $state.get('app.private.relatorio.relatorio-solicitar-audiencia').filtroAudiencia = vm.filtroAudiencia;
            $state.go('app.private.relatorio.relatorio-solicitar-audiencia');

        }

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
