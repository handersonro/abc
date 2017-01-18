(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioEmitirRelatorioReunioesController', RelatorioEmitirRelatorioReunioesController);

    /* @ngInject */
    function RelatorioEmitirRelatorioReunioesController($scope, $mdDialog, $timeout, EventoService){
        var vm = this;
        vm.procurarLocal = null;//ConviteRestService.obterLocais;
        vm.procurarUsuario = null//EventoService.obterUsuarios;
        vm.title = "Relatório de reuniões";
        vm.autoridade = "Ministro";
        vm.tipoEvento = {};
        vm.tiposSaida = {};
        vm.ordenacoes = {};
        vm.direcoes = {};
        vm.reuniao = {};
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
                {ordenacao: 'Data da reunião'},
                {ordenacao: 'Local da reunião'},
                {ordenacao: 'Assunto pauta da reunião'}
            ];
            vm.direcoes = [
                {direcao: 'Crescente'},
                {direcao: 'Decrescente'}
            ];
        }


        vm.limpar = function(){
          vm.reuniao = {};
        }
        vm.backTlPesquisa = function(){
            vm.title = "Relatório de convite";
            vm.telaPesquisa = true;
            vm.telaCadastro = false;
            vm.tbResultado = false;
        }
        vm.gerarRelatorio = function(){

        }
        vm.carregarListConvite = function(){

            console.log('carregarListConvite >>>>>>>>>>>>>>>>')
             /*ConviteRestService
                 .obterListaConvite({})
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
