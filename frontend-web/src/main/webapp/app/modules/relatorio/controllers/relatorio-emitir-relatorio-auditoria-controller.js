(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioEmitirRelatorioAuditoriaController', RelatorioEmitirRelatorioAuditoriaController);

    /* @ngInject */
    function RelatorioEmitirRelatorioAuditoriaController($scope, $timeout, AlertsService){
        var vm = this;
        vm.title = "Relatório de auditoria";
        vm.autoridade = "Ministro";
        vm.auditoria = {};
        vm.tiposSaida = {};
        vm.gerarRelatorio = gerarRelatorio;
        inicializar();
        ///////////////////////////////////
        function inicializar(){

            vm.tiposSaida = [
                {tipo: 'PDF'},
                {tipo: 'WORD'}
            ];
        }

        vm.limpar = function(){
          vm.auditoria = {};
        }
        function gerarRelatorio (){
            vm.auditoria = {};
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
    }
})();
