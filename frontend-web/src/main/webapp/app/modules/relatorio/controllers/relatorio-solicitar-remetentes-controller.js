(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioSolicitarRemetentesController', RelatorioSolicitarRemetentesController);

    /* @ngInject */
    function RelatorioSolicitarRemetentesController($state, DTO,RelatorioService){
        var vm = this;
        vm.dto = new DTO();
        vm.filtro = {};
        vm.filtroPaginacao = {
            "currentPage": "1",
            "pageSize": "20",
            "totalResults": "1",
            "sortFields": "noRemetente",
            "sortDirections": "asc",
            "filtros": {
            }
        }
        vm.relatorio ={};

        ///////////////////////////////////
        vm.title = "Relatório de Remetentes";
        vm.autoridade = "Ministro";

        function gerarRelatorio() {

            $state.get('app.private.relatorio.relatorio-solicitar-remetentes').filtroPaginacao = vm.filtroPaginacao;
            $state.go('app.private.relatorio.relatorio-solicitar-remetentes');

        }

        ///////////////////////////////////
        inicializar();
        function inicializar() {
            gerarRelatorio()
            RelatorioService.obterRemetentes($state.current.filtroPaginacao)
                .then(function (data) {
                    vm.lista = data;
                });
        }

    }
})();