(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioEmitirRelatorioController', RelatorioEmitirRelatorioController);

    /* @ngInject */
    function RelatorioEmitirRelatorioController($scope, $mdDialog, $timeout, ConviteRestService){
        var vm = this;
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
        vm.carregarListConvite = function(){

            console.log('carregarListConvite :::');

/*             ConviteRestService
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
