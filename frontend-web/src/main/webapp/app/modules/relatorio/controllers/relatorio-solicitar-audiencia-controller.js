(function(){
    angular
        .module('sisagmApp.relatorio.controllers')
        .controller('RelatorioSolicitarAudienciaController', RelatorioSolicitarAudienciaController);

    /* @ngInject */
    function RelatorioSolicitarAudienciaController($scope){
        var vm = this;
        var _itens = [];
        vm.dto = new DTO();
        vm.procurarLocal = EventoService.obterLocais;
        vm.buscarRemetentePeloNome = buscarRemetentePeloNome;
        vm.title = "Pesquisar audiência";
        vm.validacoes = {};
        vm.pesquisar = pesquisar;
        vm.listaAutoridades = {};
        vm.filtro = {};

        Principal.identity().then(function(account) {
            vm.autoridade  = account.userAutenticado.autoridade.noAutoridade;
        });

        function pesquisar (){

            vm.filtro.tipoEvento = {id: 1,noTipoEvento: 'AUDIENCIA'};
            vm.filtro.flEventoInternacional = false;

            if(vm.filtro.validado === "Indiferente"){
                vm.filtro.validado = "";
            }else if(vm.filtro.validado ==="Sim"){
                vm.filtro.validado = "SIM";
            }else if(vm.filtro.validado ==="Não"){
                vm.filtro.validado = "NAO";
            }

            $state.params.filtro.filtros.dataCadInicial = new Date(vm.filtro.dataCadInicial).getTime();
            $state.params.filtro.filtros.dataCadFinal = new Date(vm.filtro.dataCadFinal).getTime();
            $state.params.filtro.filtros.noRemetente = vm.filtro.remetente != undefined ? vm.filtro.remetente.noRemetente : '';
            $state.params.filtro.filtros.noCargo = vm.filtro.remetente != undefined ? vm.filtro.remetente.noCargo : '';
            $state.params.filtro.filtros.idLocalidade = vm.filtro.localidade != undefined ? vm.filtro.localidade.id : '';
            $state.params.filtro.filtros.conviteValidacao = vm.filtro.validado != undefined ? vm.filtro.validado : '';
            $state.params.filtro.filtros.noObservacao = vm.filtro.noObservacao;
            $state.params.filtro.filtros.noDespacho = vm.filtro.noDespacho;
            $state.params.filtro.filtros.noPauta = vm.filtro.noPauta;
            $state.params.filtro.filtros.noAssunto = vm.filtro.noAssunto;
            $state.params.filtro.filtros.tipoEvento = vm.filtro.tipoEvento;
            $state.params.filtro.filtros.descricao = vm.filtro.descricao;
            $state.params.filtro.filtros.flEventoInternacional = vm.filtro.flEventoInternacional;
            $state.params.filtro.filtros.dtInicioEvento = vm.filtro.dtInicioEvento;
            $state.params.filtro.filtros.dtFimEvento = vm.filtro.dtFimEvento;

            getMoreInfinityScrollData($state.params.filtro.currentPage);
        }

        function getMoreInfinityScrollData(pageNumber){
            vm.dto.list = [];

            $state.params.filtro.currentPage = pageNumber;

            var promiseLoadMoreData = EventoService.consultarComFiltroSemLoader($state.params.filtro);

            promiseLoadMoreData.then(
                function(data) {

                    vm.dto.list = [];
                    vm.dto.totalResults = data.totalResults;
                    vm.dto.list = data.list;
                    _.map(vm.dto.list, function(item){
                        var _fields = ['dtCadastro'];
                        _fields.forEach(function(campo, index){
                            var t = new Date();
                            var d = new Date(item[campo]-t.getTimezoneOffset()*60*1000);
                            item[campo] = d;
                        });
                        return item;
                    });

                    $timeout(function(){
                        $location.hash('result-pesquisa');
                        $anchorScroll();
                    });

                },function (error) {
                    vm.dto.totalResults = 0;
                    vm.dto.list = [];
                    $window.scrollTo(0, 0);
                }
            );

            return promiseLoadMoreData;
        }

    }
})();