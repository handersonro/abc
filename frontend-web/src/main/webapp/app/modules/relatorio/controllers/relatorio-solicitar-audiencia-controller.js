(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioSolicitarAudienciaController', RelatorioSolicitarAudienciaController);

    /* @ngInject */
    function RelatorioSolicitarAudienciaController($state, RelatorioService, Principal,$http){

        var vm = this;
        vm.lista=  {}
        vm.dataAtual = new Date();

        Principal.identity().then(function(account) {
            vm.autoridade  = account.userAutenticado.autoridade.noAutoridade;
        });

        ///////////////////////////////////
        inicializar();
        function inicializar() {

         var filtro =  $http.defaults.headers.common.filtroReport || $state.current.filtroAudiencia;

         console.log('>>>>>>> ',filtro);

         window.status = 'loaded';

         //@todo passar o filtro aqui;

        // RelatorioService.obterDados(filtro)
        //     .then(function (data) {
        //         vm.lista = data;
        //     });
        }
    }
})();