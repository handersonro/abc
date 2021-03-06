(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioSolicitarConviteController', RelatorioSolicitarConviteController);

    /* @ngInject */
    function RelatorioSolicitarConviteController($state, RelatorioService, Principal) {

        var vm = this;
        vm.lista = {}
        vm.dataAtual = new Date();

        Principal.identity().then(function (account) {
            vm.autoridade = account.userAutenticado.autoridade.noAutoridade;
        });

        ///////////////////////////////////
        inicializar();
        function inicializar() {

            RelatorioService.removerLayout();

            var filtro =  (RelatorioService.getQueryParam('PaginacaoDTO')) ? angular.fromJson(RelatorioService.base64_decode(RelatorioService.getQueryParam('PaginacaoDTO'))) : $state.current.filtroPaginacao;
            if(undefined!== filtro && undefined !== filtro.start){
                delete filtro.start;
                delete filtro.list;
            }

            //@todo passar o filtro aqui;
            RelatorioService.obterDadosConvite(filtro)
                .then(function (data) {
                        vm.lista = data;
                        window.status = 'loaded';
                    },function(e){
                        console.log(angular.toJson(e));
                        window.status = 'loaded';
                    }
                );

            /*RelatorioService.obterDadosConvite($state.current.filtroPaginacao)
                .then(function (data) {
                    vm.lista = data;
                });*/
        }
    }
})();