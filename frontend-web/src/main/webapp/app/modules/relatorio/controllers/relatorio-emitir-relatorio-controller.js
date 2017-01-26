(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioEmitirRelatorioController', RelatorioEmitirRelatorioController);

    /* @ngInject */
    function RelatorioEmitirRelatorioController($scope, $state, $mdDialog,$window, $timeout,ConviteRestService,DTO,RelatorioService,$http,baseURL ){
        var vm = this;
        vm.dto = new DTO();
        vm.gerarRelatorio = gerarRelatorio;
        vm.filtro = {};
        $state.params.filtro.filtros = {'tipoEvento.id' : 1 };


        vm.relatorio ={};
        vm.procurarLocal = ConviteRestService.obterLocais;
        ///////////////////////////////////
        vm.title = "Relatório de audiência";
        vm.autoridade = "Ministro";
        vm.tiposSaida = [
            {tipo: 'PDF'},
            {tipo: 'WORD'}
        ];
        vm.ordenacoes = [
            {ordenacao: 'Data de cadastro'},
            {ordenacao: 'Nome do solicitante'},
            {ordenacao: 'Assunto'}
        ];
        vm.direcoes = [
            {direcao: 'Crescente'},
            {direcao: 'Decrescente'}
        ];

        vm.limpar = function(){
         
        }
        inicializar();
        function inicializar() {
            vm.filtro = {};
        }

        function gerarRelatorio() {


            vm.filtroAudiencia = {
                "currentPage": $state.params.filtro.currentPage,
                "pageSize": "20",
                "totalResults": "1",
                "sortFields": "id",
                "sortDirections": "asc",
                "filtros": {
                    "tipoEvento.id": 1,
                    "remetente.noCargo" : vm.filtro.cargoSolicitante,
                    "remetente.noRemetente" : vm.filtro.solicitante,
                    "noObservacao" : vm.filtro.observacao,
                    "noDespacho" : vm.filtro.despacho,
                    "noAssunto" : vm.filtro.assunto
                }
            };


            $state.get('app.private.relatorio.relatorio-solicitar-audiencia').filtroAudiencia = vm.filtroAudiencia;
            $state.go('app.private.relatorio.relatorio-solicitar-audiencia');

        }

        vm.gerarRelatorioDraw = function (){
            window.status = "loaded";
            //var reportData = '{"path":"http://192.168.56.10:28080/sisagm-backend/api/eventos/localidades/bra","name":"relatorio-remetente"}';
            //var reportData = '{"path":"http://192.168.56.10:9011/#/private/relatorio/emitir-relatorio","name":"relatorio-remetente"}';
            //var reportData = '{"path":"http://debian-dev:9011/#/public/login/entrar","name":"relatorio-remetente"}';
            var reportData = '{"path":"http://sturdeswildfly01:8080/sisagm/#/public/login/entrar","name":"relatorio-remetente"}';

            $http.defaults.headers.common.report = reportData;
            $http.post(baseURL+'relatorios/relatorio-remetente',{
                "currentPage": "1",
                "pageSize": "20",
                "totalResults": "1",
                "sortFields": "id",
                "sortDirections": "asc",
                "filtros": {
                }
            }, {responseType:'arraybuffer'})
                .success(function (response) {
                    console.log('chegou');
                    var file = new Blob([response], {type: 'application/pdf'});
                    var fileURL = URL.createObjectURL(file);
                    $window.open(fileURL, '_blank', 'location=yes');
                });

        }

    }
})();
