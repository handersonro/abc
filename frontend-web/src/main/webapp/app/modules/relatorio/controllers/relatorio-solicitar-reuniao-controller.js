(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioSolicitarReuniaoController', RelatorioSolicitarReuniaoController);

    /* @ngInject */
    function RelatorioSolicitarReuniaoController($state, RelatorioService, Principal){

        // console.log("Chega na RelatorioSolicitarReuniaoController");

        var vm = this;
        vm.lista=  {}
        vm.dataAtual = new Date();

        Principal.identity().then(function(account) {
            vm.autoridade  = account.userAutenticado.autoridade.noAutoridade;
        });

        ///////////////////////////////////
        inicializar();
        function inicializar() {

            RelatorioService.obterDadosReuniao($state.current.filtroReuniao)
                .then(function (data) {
                    vm.lista = data;
                });
        }
    }
})();