(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioEmitirRelatorioAuditoriaController', RelatorioEmitirRelatorioAuditoriaController);

    /* @ngInject */
    function RelatorioEmitirRelatorioAuditoriaController($scope, $state, $timeout, AlertsService, Principal){
        var vm = this;
        vm.title = "Relatório de auditoria";
        vm.autoridade = "Ministro";
        Principal.identity().then(function(account) {
            vm.autoridade  = account.userAutenticado.autoridade.noAutoridade;
        });
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
            $state.go('app.private.relatorio.solicitar-auditoria');
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
