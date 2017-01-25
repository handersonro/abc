(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioSolicitarAudienciaController', RelatorioSolicitarAudienciaController);

    /* @ngInject */
    function RelatorioSolicitarAudienciaController($state,DTO,RelatorioService){

        var vm = this;
        var _itens = [];
        vm.dto = new DTO();
        vm.lista=  {}

        ///////////////////////////////////
        inicializar();
        function inicializar() {
            //vm.filtro = {};

            console.log('A2 ', $state.current.filtroAudiencia);


                RelatorioService.obterDados($state.current.filtroAudiencia)
                    .success(function (data) {
                        vm.lista = data;
                        console.log('XXXXXXXXXXXXX ',vm.lista);
                    });




        }

    }
})();