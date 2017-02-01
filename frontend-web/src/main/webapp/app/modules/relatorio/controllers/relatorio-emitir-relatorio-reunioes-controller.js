(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioEmitirRelatorioReunioesController', RelatorioEmitirRelatorioReunioesController);

    /* @ngInject */
    function RelatorioEmitirRelatorioReunioesController($state, $scope, $mdDialog, $timeout, EventoService, $q, $mdSidenav, $log, AlertsService, ConviteRestService, ReuniaoService,EventoService,Principal, $http, baseURL,$window ){
        var vm = this;
        vm.procurarLocal = null;//ConviteRestService.obterLocais;
        vm.procurarUsuario = null//EventoService.obterUsuarios;
        vm.title = "Relatório de reuniões";
        Principal.identity().then(function(account) {
            vm.autoridade  = account.userAutenticado.autoridade.noAutoridade;
        });
        vm.tipoEvento = {};
        vm.tiposSaida = {};
        vm.ordenacoes = {};
        vm.direcoes = {};
        vm.reuniao = {};
        vm.gerarRelatorio = gerarRelatorio;
        vm.gerarRelatorio2 = gerarRelatorio2;

        vm.filtro = {};

        /*chip*/
        vm.readonly = false;
        vm.selectedItem = null;
        vm.searchText = null;
        vm.querySearch = querySearch;
        vm.participantes = [];
        vm.numberChips = [];
        vm.numberChips2 = [];
        vm.listSistemas = [];
        vm.numberBuffer = '';
        vm.autocompleteDemoRequireMatch = true;
        vm.transformChip = transformChip;
        /*chip*/

        inicializar();
        ///////////////////////////////////
        function inicializar(){
            vm.tipoEvento=[
              {evento : 'Nacional'},
              {evento : 'Internacional'}
            ];
            vm.tiposSaida = [
                {tipo: 'PDF'},
                {tipo: 'WORD'}
            ];
            vm.ordenacoes = [
                {ordenacao: 'Data da reunião', value: "dtCadastro"},
                {ordenacao: 'Local da reunião', value: "noLocalEvento"},
                {ordenacao: 'Assunto pauta da reunião', value: "noPauta"}
            ];
            vm.direcoes = [
                {direcao: 'Crescente', value: "asc"},
                {direcao: 'Decrescente', value: "desc"}
            ];
        }


        vm.limpar = function(){
          vm.reuniao = {};
        }
        vm.backTlPesquisa = function(){
            vm.title = "Relatório de convite";
            vm.telaPesquisa = true;
            vm.telaCadastro = false;
            vm.tbResultado = false;
        }
        function gerarRelatorio() {

            if(vm.filtro.ordenacao == undefined){
                vm.filtro.ordenacao = "e.dtCadastro";
            }
            if(vm.filtro.direcao == undefined){
                vm.filtro.direcao = "asc"
            }

            var idPessoa = [];

            if(vm.participantes != undefined){
                vm.participantes.forEach(function (participante) {
                    idPessoa.push(participante.pessoa.id);
                });
            }

            var dtInicioEvento = new Date(vm.filtro.dataInicio).getTime();
            var dtFimEvento = new Date(vm.filtro.dataFim).getTime();
            var dtCadastro = new Date(vm.filtro.dataInicialCad).getTime();
            var dtFimCadastro = new Date(vm.filtro.dataFimCad).getTime();

            $state.params.filtro.filtros.participantes  = vm.participantes != undefined ? idPessoa : '';

            vm.filtroReuniao = {
                "currentPage": "1",
                "pageSize": "20",
                "totalResults": "1",
                "sortFields": vm.filtro.ordenacao,
                "sortDirections": vm.filtro.direcao,
                "filtros": {
                    "tipoEvento.id": 3,
                    "dtInicioEvento" : dtInicioEvento,
                    "dtFimEvento" : dtFimEvento,
                    "dtCadastro" : dtCadastro,
                    "dtFimCadastro" : dtFimCadastro,
                    "noDespacho" : vm.filtro.despacho,
                    "noAssunto" : vm.filtro.assunto,
                    "noLocalEvento" : vm.filtro.localReuniao,
                    "noPauta" : vm.filtro.pautaReuniao,
                    "tipoSaida" : vm.filtro.tipoSaida,
                    "participantes" : idPessoa,
                }
            }

            $state.params.filtro.currentPage = 1;

            $state.get('app.private.relatorio.relatorio-solicitar-reuniao').filtroReuniao = vm.filtroReuniao;
            $state.go('app.private.relatorio.relatorio-solicitar-reuniao');

        }
        vm.carregarListConvite = function(){

            console.log('carregarListConvite >>>>>>>>>>>>>>>>')
             /*ConviteRestService
                 .obterListaConvite({})
                 .then(
                     function(data){
                         $scope.listaConvites = data;
                     },
                     function(error){

                     }
                 );*/
        };
        vm.carregarListConvite();

        function debounce(func, wait, context) {
          var timer;

          return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
              timer = undefined;
              func.apply(context, args);
            }, wait || 10);
          };
        }
        /*DIALOG*/
        vm.showConfirm = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
              .title('Atenção')
              .textContent('Tem certeza que deseja remover esse registro?')
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Sim')
              .cancel('Não');

            $mdDialog.show(confirm).then(function() {
              $scope.status = 'You decided to get rid of your debt.';
            }, function() {
              $scope.status = 'You decided to keep your debt.';
            });
        };

        /*CHIP*/
        function transformChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }

            // Otherwise, create a new one
            return {name: chip, type: 'new'}
        }

        /**
         * Obterm as Participantes apartir do terceiro caracter pesquisado
         * */
        function querySearch (query) {
            var resolve = $q.defer();
            ReuniaoService.buscarPorNome(query)
                .success(function (data) {
                    resolve.resolve(data);
                })
                .error(function () {
                    retorno.reject(alert('Não foi possivel carregar os dados'));
                });

            return resolve.promise;
        }
        function gerarRelatorio2() {
            if(vm.filtro.ordenacao == undefined){
                vm.filtro.ordenacao = "e.dtCadastro";
            }
            if(vm.filtro.direcao == undefined){
                vm.filtro.direcao = "asc"
            }

            var idPessoa = [];

            if(vm.participantes != undefined){
                vm.participantes.forEach(function (participante) {
                    idPessoa.push(participante.pessoa.id);
                });
            }

            var dtInicioEvento = new Date(vm.filtro.dataInicio).getTime();
            var dtFimEvento = new Date(vm.filtro.dataFim).getTime();
            var dtCadastro = new Date(vm.filtro.dataInicialCad).getTime();
            var dtFimCadastro = new Date(vm.filtro.dataFimCad).getTime();

            $state.params.filtro.filtros.participantes  = vm.participantes != undefined ? idPessoa : '';

            vm.filtroReuniao = {
                "currentPage": "1",
                "pageSize": "20",
                "totalResults": "1",
                "sortFields": vm.filtro.ordenacao,
                "sortDirections": vm.filtro.direcao,
                "filtros": {
                    "tipoEvento.id": 3,
                    "dtInicioEvento" : dtInicioEvento,
                    "dtFimEvento" : dtFimEvento,
                    "dtCadastro" : dtCadastro,
                    "dtFimCadastro" : dtFimCadastro,
                    "noDespacho" : vm.filtro.despacho,
                    "noAssunto" : vm.filtro.assunto,
                    "noLocalEvento" : vm.filtro.localReuniao,
                    "noPauta" : vm.filtro.pautaReuniao,
                    "tipoSaida" : vm.filtro.tipoSaida,
                    "participantes" : idPessoa,
                }
            }

            $http.post(baseURL+'relatorios2/relatorio-reuniao2',vm.filtroReuniao
            , {responseType:'arraybuffer'})
                .success(function (response) {
                    var file = new Blob([response], {type: 'application/pdf'});
                    var fileURL = URL.createObjectURL(file);
                    $window.open(fileURL, '_blank', 'location=yes');
                });
        }
        // Gera PDF
        vm.gerarRelatorioPDF = function (){

            window.status = "loaded";

            if(vm.filtro.validado ==="Indiferente"){
                vm.filtro.validado = "INDIFERENTE";
            }else if(vm.filtro.validado ==="Sim"){
                vm.filtro.validado = "SIM";
            }else if(vm.filtro.validado ==="Não"){
                vm.filtro.validado = "NAO";
            }

            if(vm.filtro.ordenacao == undefined){
                vm.filtro.ordenacao = "e.dtCadastro";
            }
            if(vm.filtro.direcao == undefined){
                vm.filtro.direcao = "asc"
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

            var dtInicioEvento = (null == vm.filtro.dataInicio) ? '' : new Date(vm.filtro.dataInicio).getTime();
            var dtFimEvento = (null == vm.filtro.dataFim) ? '' : new Date(vm.filtro.dataFim).getTime();
            var dtCadastro = (vm.filtro.dataInicialCad) ? '' : new Date(vm.filtro.dataInicialCad).getTime();
            var dtFimCadastro = (vm.filtro.dataFimCad) ? '' : new Date(vm.filtro.dataFimCad).getTime();

            var idPessoa = [];

            if(vm.participantes != undefined){
                vm.participantes.forEach(function (participante) {
                    idPessoa.push(participante.pessoa.id);
                });
            }

            vm.filtro.observacao = vm.filtro.observacao != null ? vm.filtro.observacao : '';
            vm.filtro.despacho = vm.filtro.despacho != null ? vm.filtro.despacho : '';

            vm.filtroReuniao = {
                "currentPage": $state.params.filtro.currentPage,
                "pageSize": "20",
                "totalResults": "1",
                "sortFields": vm.filtro.ordenacao,
                "sortDirections": vm.filtro.direcao,
                "filtros": {
                    "tipoEvento.id": 3,
                    "dtInicioEvento" : dtInicioEvento,
                    "dtFimEvento" : dtFimEvento,
                    "dtCadastro" : dtCadastro,
                    "dtFimCadastro" : dtFimCadastro,
                    "noDespacho" : vm.filtro.despacho,
                    "noAssunto" : vm.filtro.assunto,
                    "noLocalEvento" : vm.filtro.localReuniao,
                    "noPauta" : vm.filtro.pautaReuniao,
                    "tipoSaida" : vm.filtro.tipoSaida,
                    "participantes" : idPessoa,
                }
            };

            vm.PaginacaoDTO = {
                "currentPage": $state.params.filtro.currentPage,
                "pageSize": "20",
                "totalResults": "1",
                "sortFields": "id",
                "sortDirections": "asc",
                "filtros": vm.filtroReuniao
            };

            vm.PaginacaoDTO = JSON.stringify(vm.PaginacaoDTO);

            console.log(vm.PaginacaoDTO);

            //@todo passar o path dinâmicamente

            var reportData = '{"path":"http://localhost:28080/sisagm/#/private/relatorio/relatorio-reuniao","stateName":"app.private.relatorio.relatorio-solicitar-reuniao","PaginacaoDTO":'+vm.PaginacaoDTO+',"noAutoridade":"'+vm.autoridade+'"}';

            $http.defaults.headers.common.report = reportData;
            $http.post(baseURL+'relatorios/relatorio-reuniao',{
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
    }
})();
