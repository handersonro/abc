(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioEmitirRelatorioReunioesController', RelatorioEmitirRelatorioReunioesController);

    /* @ngInject */
    function RelatorioEmitirRelatorioReunioesController($state,$q,ReuniaoService,Principal ){
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
    }
})();
