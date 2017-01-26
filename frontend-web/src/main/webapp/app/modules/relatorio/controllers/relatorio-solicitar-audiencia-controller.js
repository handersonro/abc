(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioSolicitarAudienciaController', RelatorioSolicitarAudienciaController);

    /* @ngInject */
    function RelatorioSolicitarAudienciaController($state, RelatorioService, Principal){

        var vm = this;
        vm.lista=  {}
        vm.dataAtual = new Date();

        Principal.identity().then(function(account) {
            vm.autoridade  = account.userAutenticado.autoridade.noAutoridade;
        });

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