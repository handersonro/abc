(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioEmitirRelatorioController', RelatorioEmitirRelatorioController);

    /* @ngInject */
    function RelatorioEmitirRelatorioController($scope, $state, $mdDialog,$q,$window, $timeout,ConviteRestService,DTO,EventoService,$http,baseURL,Principal,RelatorioService ){
        var vm = this;
        vm.dto = new DTO();
        vm.gerarRelatorio = gerarRelatorio;

        vm.filtro = {};
        $state.params.filtro.filtros = {'tipoEvento.id' : 1 };


        vm.relatorio ={};
        vm.procurarLocal = ConviteRestService.obterLocais;
        vm.buscarRemetentePeloNome = buscarRemetentePeloNome;
        vm.buscarCargoRemetentePeloNome = buscarCargoRemetentePeloNome;
        ///////////////////////////////////
        vm.title = "Relatório de audiência";

        Principal.identity().then(function(account) {
            vm.autoridade  = account.userAutenticado.autoridade.noAutoridade;
        });

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

            RelatorioService.mostrarLayout();

            vm.filtro = {};
            vm.flEventoInternacional = [
                {evento: 'Nacional'},
                {evento: 'Internacional'}
            ];
            vm.validacoes = [
                {validado: 'Sim'},
                {validado: 'Não'},
                {validado: 'Indiferente'}
            ];
        }



        function gerarRelatorio() {

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
            }
            console.log(vm.filtro.direcao);

            if(vm.filtro.tipoSaida ==="Internacional"){
                vm.filtro.tipoSaida = true;
            }else if(vm.filtro.tipoSaida ==="Nacional"){
                vm.filtro.tipoSaida = false;
            }

            var dtInicioEvento = new Date(vm.filtro.dataInicial).getTime();
            var dtFimEvento = new Date(vm.filtro.dataFinal).getTime();


            vm.filtro.cargoSolicitante = vm.filtro.cargoSolicitante != null ? vm.filtro.cargoSolicitante : '';
            vm.filtro.solicitante = vm.filtro.solicitante != null ? vm.filtro.solicitante.noRemetente : '';
            vm.filtro.idLocalidade = vm.filtro.idLocalidade != undefined ? vm.filtro.idLocalidade.id : '';
            vm.filtro.observacao = vm.filtro.observacao != null ? vm.filtro.observacao : '';
            vm.filtro.despacho = vm.filtro.despacho != null ? vm.filtro.despacho : '';
            vm.filtro.validado = vm.filtro.validado != null ? vm.filtro.validado : '';
            vm.filtro.tipoSaida = vm.filtro.tipoSaida != null ? vm.filtro.tipoSaida : '';



            vm.filtroAudiencia = {
                "currentPage": $state.params.filtro.currentPage,
                "pageSize": "20",
                "totalResults": "1",
                "sortFields": "id",
                "sortDirections": "asc",
                "filtros": {
                    "tipoEvento.id": 1,
                    "remetente.noCargo" : vm.filtro.cargoSolicitante.noCargo,
                    "remetente.noRemetente" : vm.filtro.solicitante,
                    "noObservacao" : vm.filtro.observacao,
                    "noDespacho" : vm.filtro.despacho,
                    "noAssunto" : vm.filtro.assunto,
                    "idLocalidade" : vm.filtro.idLocalidade,
                    "conviteValidacao": vm.filtro.validado,
                    "flEventoInternacional" : vm.filtro.tipoSaida,
                    "dataCadInicial" : dtInicioEvento,
                    "dataCadFinal": dtFimEvento
                }
            };

            if(vm.filtro.notCargo == true){
                vm.filtroAudiencia.filtros = {
                    "tipoEvento.id": 1,
                    "remetente.noCargo" : '',
                    "remetente.noRemetente" : vm.filtro.solicitante,
                    "noObservacao" : vm.filtro.observacao,
                    "noDespacho" : vm.filtro.despacho,
                    "noAssunto" : vm.filtro.assunto,
                    "idLocalidade" : vm.filtro.idLocalidade,
                    "conviteValidacao": vm.filtro.validado,
                    "flEventoInternacional" : vm.filtro.tipoSaida,
                    "dataCadInicial" : dtInicioEvento,
                    "dataCadFinal": dtFimEvento
                }
                vm.filtroAudiencia.filtros.notCargo =  vm.filtro.cargoSolicitante.noCargo;
            }

            $state.get('app.private.relatorio.relatorio-solicitar-audiencia').filtroAudiencia = vm.filtroAudiencia;
            $state.go('app.private.relatorio.relatorio-solicitar-audiencia');

        }

        function buscarRemetentePeloNome(noUsuario) {
            var retorno = $q.defer();
            EventoService.obterRemetentesPeloNome(noUsuario)
                .success(function (data) {
                    retorno.resolve(data);
                })
                .error(function () {
                    retorno.reject(alert('Não foi possivel carregar os dados'));
                });
            return retorno.promise;
        }

        function buscarCargoRemetentePeloNome(noCargo) {
            var retorno = $q.defer();
            console.log(noCargo);
            EventoService.obterCargosRemetentesPeloNome(noCargo)
                .success(function (data) {
                    retorno.resolve(data);
                })
                .error(function () {
                    retorno.reject(alert('Não foi possivel carregar os dados'));
                });
            return retorno.promise;
        }


        vm.gerarRelatorioDraw = function (){
            window.status = "loaded";
            //var reportData = '{"path":"http://192.168.56.10:28080/sisagm-backend/api/eventos/localidades/bra","name":"relatorio-remetente"}';
            //var reportData = '{"path":"http://192.168.56.10:9011/#/private/relatorio/emitir-relatorio","name":"relatorio-remetente"}';
            //var reportData = '{"path":"http://debian-dev:9011/#/public/login/entrar","name":"relatorio-remetente"}';




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

            vm.filtroAudiencia = '{'+
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


            vm.filtroAudiencia = '{'+
                '"currentPage": '+$state.params.filtro.currentPage+','+
                '"pageSize": "20",'+
                '"totalResults": "1",'+
                '"sortFields": "id",'+
                '"sortDirections": "asc",'+
                '"filtros": '+vm.filtroAudiencia+
                '}';



            //$state.get('app.private.relatorio.relatorio-solicitar-audiencia').filtroAudiencia = vm.filtroAudiencia;
            //$state.go('app.private.relatorio.relatorio-solicitar-audiencia');


            //@todo passar o path dinâmicamente

            // var reportData = '{"path":"'+appURL+'/#/private/relatorio/solicitar-audiencia","stateName":"app.private.relatorio.relatorio-solicitar-audiencia","PaginacaoDTO":'+vm.filtroAudiencia+',"noAutoridade":"'+vm.autoridade+'"}';
            //
            // $http.defaults.headers.common.report = reportData;
            // $http.post(baseURL+'relatorios/relatorio-audiencia',{
            //     "currentPage": "1",
            //     "pageSize": "20",
            //     "totalResults": "1",
            //     "sortFields": "id",
            //     "sortDirections": "asc",
            //     "filtros": {
            //         "tipoEvento.id": 1
            //     }
            // }, {responseType:'arraybuffer'})
            //     .success(function (response) {
            //         console.log('chegou');
            //         var file = new Blob([response], {type: 'application/pdf'});
            //         var fileURL = URL.createObjectURL(file);
            //         $window.open(fileURL, '_blank', 'location=yes');
            //     });

        }

    }
})();