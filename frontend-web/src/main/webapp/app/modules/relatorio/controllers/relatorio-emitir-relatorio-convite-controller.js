(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioEmitirRelatorioConviteController', RelatorioEmitirRelatorioConviteController);

    /* @ngInject */
    function RelatorioEmitirRelatorioConviteController($scope, $mdDialog, $timeout, ConviteRestService){
        var vm = this;
        vm.procurarLocal = ConviteRestService.obterLocais;
        vm.title = "Relatório de convite";
        vm.autoridade = "Ministro";
        vm.tipoEvento = {};
        vm.tiposSaida = {};
        vm.ordenacoes = {};
        vm.direcoes = {};
        inicializar();
        ///////////////////////////////////
        function inicializar(){
            vm.tipoEvento=[
              {evento : 'Nacional'},
              {evento : 'Internacional'}
            ];
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
        }


        vm.limpar = function(){

        }
        vm.backTlPesquisa = function(){
            vm.title = "Relatório de convite";

        }
        vm.gerarRelatorio = function(){
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
