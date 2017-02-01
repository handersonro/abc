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

            //console.log('PaginacaoDTOXXXX');
            //console.log(angular.fromJson(base64_decode(getQueryParam('PaginacaoDTO'))));

            //if(getQueryParam('PaginacaoDTO')){
                angular.element( document.querySelector('.header-topo')).css('display','none');
                angular.element( document.querySelector('.menu-bar')).css('display','none');
                angular.element( document.querySelector('.flex')).css('display','none');
                //angular.element( document.querySelector('.flex')).css('margin-left','20px !important');


            var elems = angular.element( document.querySelector('.flex'));
            for (var index=0; index < elems.length; index++) {
                angular.element(angular.element(elems)[index]).css('display','none');
                // do something with subElement
            }

            elems = angular.element( document.querySelector('.menu-bar') );
            for (var index=0; index < elems.length; index++) {
                angular.element(angular.element(elems)[index]).css('display','none');
                // do something with subElement
            }
            //}


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