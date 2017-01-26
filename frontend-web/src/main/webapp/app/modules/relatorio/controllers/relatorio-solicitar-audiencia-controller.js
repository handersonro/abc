(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioSolicitarAudienciaController', RelatorioSolicitarAudienciaController);

    /* @ngInject */
    function RelatorioSolicitarAudienciaController($state,RelatorioService){

        var vm = this;
        vm.lista=  {}

        ///////////////////////////////////
        inicializar();
        function inicializar() {

        RelatorioService.obterDados($state.current.filtroAudiencia)
            .then(function (data) {
                vm.lista = data;
            });
        }
    }
})();