(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioEmitirRelatorioConviteController', RelatorioEmitirRelatorioConviteController);

    /* @ngInject */
    function RelatorioEmitirRelatorioConviteController($scope, $mdDialog, $timeout, ConviteRestService, DTO,$window, $state,$http,baseURL,Principal,RelatorioService){
        var vm = this;


        inicializar();
        function inicializar() {
            RelatorioService.mostrarLayout();
        }

        vm.procurarLocal = ConviteRestService.obterLocais;
        vm.procurarPaises = ConviteRestService.obterPaises;
        vm.procurarRemetente = ConviteRestService.obterRemetentes;
        vm.title = "Relatório de convite";
        Principal.identity().then(function(account) {
            vm.autoridade  = account.userAutenticado.autoridade.noAutoridade;
        });

        vm.dto = new DTO();
        vm.gerarRelatorioDraw = gerarRelatorioDraw;
        vm.gerarRelatorio = gerarRelatorio;
        vm.filtro = {};
        $state.params.filtro.filtros = {'tipoEvento.id' : 2 };
        vm.relatorio ={};
        ///////////////////////////////////

        vm.tipoEvento = {};
        vm.tiposSaida = {};
        vm.ordenacoes = {};
        vm.direcoes = {};
        vm.validado = {};


        vm.validado = [
            {validado: 'Sim'},
            {validado: 'Não'},
            {validado: 'Indiferente'}

        ]
        vm.tiposSaida = [
            {tipo: 'PDF'},
            {tipo: 'WORD'}
        ];
        vm.ordenacoes = [
            {ordenacao: 'Data de cadastro', value: "dtCadastro"},
            {ordenacao: 'Data do evento', value: "dtInicioEvento"},
            {ordenacao: 'Local do evento', value: "noLocalEvento"},
            {ordenacao: 'Nome do remetente', value: "remetente.noRemetente"}
        ];
        vm.direcoes = [
            {direcao: 'Crescente', value: "asc"},
            {direcao: 'Decrescente', value: "desc"}
        ];

        vm.limpar = function(){
            vm.filtro.ordenacao = undefined;
            vm.filtro.direcao = undefined;
            vm.filtro.remetente = undefined;
            vm.filtro.flEventoInternacional = undefined;
            vm.filtro.despacho = undefined;
            vm.filtro.descricao = undefined;
            vm.filtro.observacao = undefined;
            vm.filtro.idPais = undefined;
            vm.filtro.noCidadeInternacional = undefined;
            vm.filtro.idLocalidade = undefined;
            vm.filtro.validado = undefined;
            vm.filtro.dtInicioEvento = undefined;
            vm.filtro.dtFimEvento = undefined;
            vm.filtro.dataCadInicial = undefined;
            vm.filtro.dataCadFina = undefined;
        }
        vm.backTlPesquisa = function(){
            vm.title = "Relatório de convite";

        }


        function gerarRelatorioDraw () {
            window.status = "loaded";

            if(vm.filtro.validado ==="Indiferente"){
                vm.filtro.validado = "INDIFERENTE";
            }else if(vm.filtro.validado ==="Sim"){
                vm.filtro.validado = "SIM";
            }else if(vm.filtro.validado ==="Não"){
                vm.filtro.validado = "NAO";
            }


            if(vm.filtro.direcao == "Crescente"){
                vm.filtro.direcao = "ASC";
            }else if(vm.filtro.direcao == "Decrescente"){
                vm.filtro.direcao = "DESC";
            }else{
                vm.filtro.direcao = "ASC";
            }

            console.log(vm.filtro.direcao);

            vm.filtro.tipoSaida = true;
            if(vm.filtro.tipoSaida ==="Internacional"){
                vm.filtro.tipoSaida = true;
            }else if(vm.filtro.tipoSaida ==="Nacional"){
                vm.filtro.tipoSaida = false;
            }

            var dtInicioEvento = (null == vm.filtro.dataInicial ) ? '' : new Date(vm.filtro.dataInicial).getTime();
            var dtFimEvento = (null == vm.filtro.dataFinal ) ? '' : new Date(vm.filtro.dataFinal).getTime();

            //vm.filtro.cargoSolicitante = '';


            vm.filtro.cargoSolicitante = vm.filtro.cargoSolicitante != null ? vm.filtro.cargoSolicitante : '';
            vm.filtro.solicitante = vm.filtro.solicitante != null ? vm.filtro.solicitante.noRemetente : '';
            vm.filtro.idLocalidade = vm.filtro.idLocalidade != null ? vm.filtro.idLocalidade.id : '';
            vm.filtro.observacao = vm.filtro.observacao != null ? vm.filtro.observacao : '';
            vm.filtro.despacho = vm.filtro.despacho != null ? vm.filtro.despacho : '';
            vm.filtro.validado = vm.filtro.validado != null ? vm.filtro.validado : '';
            vm.filtro.tipoSaida = vm.filtro.tipoSaida != null ? vm.filtro.tipoSaida : '';
            vm.filtro.assunto = vm.filtro.assunto != null ? vm.filtro.assunto : '';

            vm.filtroConvite = '{'+
                '"currentPage":'+$state.params.filtro.currentPage+','+
                '"pageSize":"20",'+
                '"totalResults": "1",'+
                '"sortFields":"id",'+
                '"sortDirections":"'+vm.filtro.direcao+'",'+
                '"filtros":{'+
                '"tipoEvento.id":1,'+
                '"noCargo":"'+vm.filtro.cargoSolicitante+'",'+
                '"noRemetente":"'+vm.filtro.solicitante+'",'+
                '"noObservacao": "'+vm.filtro.observacao+'",'+
                '"noDespacho":"'+vm.filtro.despacho+'",'+
                '"noAssunto":"'+vm.filtro.assunto+'",'+
                '"idLocalidade":"'+vm.filtro.idLocalidade+'",'+
                '"conviteValidacao": "'+vm.filtro.validado+'",'+
                '"flEventoInternacional" : '+vm.filtro.tipoSaida+','+
                '"dataCadInicial" : "'+dtInicioEvento+'",'+
                '"dataCadFinal": "'+dtFimEvento+'"'+
                '}'+
                '}';

            console.log('dtInicioEvento>>>> ',dtInicioEvento);


            vm.filtroConvite = '{'+
                '"currentPage": '+$state.params.filtro.currentPage+','+
                '"pageSize": "20",'+
                '"totalResults": "1",'+
                '"sortFields": "id",'+
                '"sortDirections": "asc",'+
                '"filtros": '+vm.filtroConvite+
                '}';



            //$state.get('app.private.relatorio.relatorio-solicitar-audiencia').filtroAudiencia = vm.filtroAudiencia;
            //$state.go('app.private.relatorio.relatorio-solicitar-audiencia');


            //@todo passar o path dinâmicamente

            var reportData = '{"path":"'+appURL+'/#/private/relatorio/solicitar-convite","stateName":"app.private.relatorio.relatorio-solicitar-convite","PaginacaoDTO":'+vm.filtroConvite+',"noAutoridade":"'+vm.autoridade+'"}';

            $http.defaults.headers.common.report = reportData;
            $http.post(baseURL+'relatorios/pesquisar-convite',{
                "currentPage": "1",
                "pageSize": "20",
                "totalResults": "1",
                "sortFields": "id",
                "sortDirections": "asc",
                "filtros": {
                    "tipoEvento.id": 1
                }
            }, {responseType:'arraybuffer'})
                .success(function (response) {
                    console.log('chegou');
                    var file = new Blob([response], {type: 'application/pdf'});
                    var fileURL = URL.createObjectURL(file);
                    $window.open(fileURL, '_blank', 'location=yes');
                });

        }




        function gerarRelatorio() {
           tratarCamposParaGerarRelatorio();
                     var filtroPaginacao = montarFiltros();
                   $state.get('app.private.relatorio.relatorio-solicitar-convite').filtroPaginacao = filtroPaginacao;
            $state.go('app.private.relatorio.relatorio-solicitar-convite');
        }

        function gerarRelatorioDraw() {
         tratarCamposParaGerarRelatorio();
         var filtroPaginacao = montarFiltros();

         var reportData = '{"path":"http://localhost:8080/sisagm/#/private/relatorio/solicitar-convite","stateName":"app.private.relatorio.relatorio-solicitar-convite","PaginacaoDTO":'+JSON.stringify(filtroPaginacao)+',"noAutoridade":"'+vm.autoridade+'"}';

         $http.defaults.headers.common.report = reportData;
         $http.post(baseURL+'relatorios/relatorio-convite',{
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

        function tratarCamposParaGerarRelatorio(){

         vm.filtro.dtInicioEvento = vm.filtro.dtInicioEvento != null ? new Date(vm.filtro.dtInicioEvento).getTime() : "";
         vm.filtro.dtFimEvento = vm.filtro.dtFimEvento != null ? new Date(vm.filtro.dtFimEvento).getTime() : "";
         vm.filtro.dataCadInicial = vm.filtro.dataCadInicial != null ? new Date( vm.filtro.dataCadInicial).getTime() : "";
         vm.filtro.dataCadFinal = vm.filtro.dataCadFinal != null ? new Date(vm.filtro.dataCadFinal).getTime() : "";
         vm.filtro.noAssunto = vm.filtro.noAssunto != null ? vm.noAssunto : "";

         if(vm.filtro.idPais == undefined || vm.filtro.idPais == "") {
         vm.filtro.idPais = {};
         }
         if(vm.filtro.remetente == null || vm.filtro.remetente == undefined || vm.filtro.remetente == ""){
         vm.filtro.remetente = {};
         }
         if(vm.filtro.idLocalidade == undefined || vm.filtro.idLocalidade == "") {
         vm.filtro.idLocalidade = {};
         }
         if(vm.filtro.ordenacao == undefined){
         vm.filtro.ordenacao = "dtCadastro";
         }
         if(vm.filtro.direcao == undefined){
         vm.filtro.direcao = "asc"
         }
         switch(vm.filtro.validado){
         case "Sim":
         vm.filtro.validado = "SIM";
         break;
         case "Não":
         vm.filtro.validado = "NAO";
         break;
         default:
         vm.filtro.validado = undefined;
         }
         }

         function montarFiltros(){
             return {
             "currentPage": $state.params.filtro.currentPage,
             "pageSize": "20",
             "totalResults": "1",
             "sortFields": vm.filtro.ordenacao,
             "sortDirections": vm.filtro.direcao,
             "filtros": {
             "remetente.noRemetente" : vm.filtro.remetente.noRemetente,
             "flEventoInternacional" : vm.filtro.flEventoInternacional,
             "noDespacho" : vm.filtro.despacho,
             "descricao" : vm.filtro.descricao,
             "noObservacao" : vm.filtro.observacao,
             "idPais" : vm.filtro.idPais.id,
             "noCidadeInternacional" : vm.filtro.noCidadeInternacional,
             "idLocalidade" : vm.filtro.idLocalidade.id,
             "conviteValidacao" : vm.filtro.validado,
             "dtInicioEvento" : vm.filtro.dtInicioEvento,
             "dtFimEvento" : vm.filtro.dtFimEvento,
             "dataCadInicial" : vm.filtro.dataCadInicial,
             "dataCadFinal" : vm.filtro.dataCadFinal
             }
             };
         }

    }
})();
