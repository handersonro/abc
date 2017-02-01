(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioSolicitarAudienciaController', RelatorioSolicitarAudienciaController);

    /* @ngInject */
    function RelatorioSolicitarAudienciaController($state, RelatorioService, Principal){

        var vm = this;
        vm.lista=  {}
        vm.dataAtual = new Date();

        ///////////////////////////////////
        inicializar();


        function inicializar() {
              RelatorioService.removerLayout();
            var filtro =  (RelatorioService.getQueryParam('PaginacaoDTO')) ? angular.fromJson(RelatorioService.base64_decode(RelatorioService.getQueryParam('PaginacaoDTO'))) : $state.current.filtroAudiencia;
            if(undefined!== filtro && undefined !== filtro.start){
                delete filtro.start;
                delete filtro.list;
            }

         console.log('>>>>>>> ');
            console.log(angular.toJson(filtro));


         //@todo passar o filtro aqui;

         RelatorioService.obterDadosAudiencia(filtro)
             .then(function (data) {
                 vm.lista = data;
                 window.status = 'loaded';
             },function(e){
                     console.log(angular.toJson(e));
                     window.status = 'loaded';
                 }
         );
        }
    }
})();