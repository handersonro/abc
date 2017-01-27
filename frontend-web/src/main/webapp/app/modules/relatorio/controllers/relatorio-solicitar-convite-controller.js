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
            RelatorioService.obterDadosConvite($state.current.filtroPaginacao)
                .then(function (data) {
                    vm.lista = data;
                });
        }
    }
})();