(function(){
    angular
        .module('sisagmApp.audiencia.controllers')
        .controller('AudienciaPesquisarAudienciaController', AudienciaPesquisarAudienciaController);

    /* @ngInject */
    function AudienciaPesquisarAudienciaController($scope, $mdDialog, $http, $q, $timeout, AlertsService, $filter, $location, $anchorScroll, $state, DTO, EventoService){
        var vm = this;
        var _itens = [];
        vm.dto = new DTO();
        vm.procurarLocal = EventoService.obterLocais;
        vm.buscarRemetentePeloNome = buscarRemetentePeloNome;
        vm.title = "Pesquisar audiência";
        vm.tbResultado = false;
        vm.validacoes = {};
        vm.pesquisar = pesquisar;
        vm.editar = editar;
        vm.listaAutoridades = {};
        vm.filtro = {};
        vm.autoridade = {noAutoridade : 'Ministro'};
        inicializar();
        function inicializar(){
            vm.listaAutoridades = [
                {autoridade: "Ministro do turismo"},
                {autoridade: "Secretário executivo"},
                {autoridade: "Secretário Nacional de Estruturação do Turismo"},
                {autoridade: "Secretário Nacional de Qualificação e Promoção do Turismo"}
            ];
            vm.validacoes=[
                {validado : 'Sim'},
                {validado : 'Não'},
                {validado : 'Indiferente'}
            ];

            vm.filtro = {
                noAssunto: '',
                noObservacao: '',
                tipoEvento: '',
                noDespacho: '',
                noPauta: '',
                idLocalidade: '',
                noRemetente: '',
                descricao: '',
                dtInicioEvento:'',
                dtFimEvento:'',
                flEventoInternacional: '',
                dataCadInicial:'',
                dataCadFinal:''
            };
        }
        ///////////////////////////////////

        vm.limpar = function(){
            vm.filtro = {};
        }
        function editar (audiencia){
            $state.go('app.private.audiencia.editar-audiencia', {audiencia: audiencia});
        }
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
            $state.params.filtro.filtros.idLocalidade = vm.filtro.localidade != undefined ? vm.filtro.localidade.id : '';
            $state.params.filtro.filtros.conviteValidacaoEnum = vm.filtro.validado != undefined ? vm.filtro.validado : '';
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

            $location.hash('result-pesquisa');
            // call $anchorScroll()
            $anchorScroll();
        }

        function getMoreInfinityScrollData(pageNumber){
            $state.params.filtro.currentPage = pageNumber;

            var promiseLoadMoreData = EventoService.consultarComFiltroSemLoader($state.params.filtro);

            promiseLoadMoreData.then(
                function(data) {
                    vm.tbResultado = true;


                    vm.dto.totalResults = data.totalResults;
                    vm.dto.list = data.list;

                    $location.hash('result-pesquisa');
                    $anchorScroll();
                },function (error) {
                    vm.tbResultado = false;
                    vm.dto.totalResults = 0;
                    vm.dto.list = [];
                }
            );

            return promiseLoadMoreData;
        }

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
        vm.showConfirm = function(ev,audiencia) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Atenção')
                .textContent('Tem certeza que deseja remover esse registro?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Ok')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function() {
                EventoService.excluirPorId(audiencia.id).then(
                    function (sucesso) {
                        AlertsService.success('Audiência removido com sucesso.');
                        var index = vm.dto.list.indexOf(audiencia);
                        vm.dto.list.splice(index,1);
                    }
                );

                $scope.status = 'You decided to get rid of your debt.';
            }, function() {
                $scope.status = 'You decided to keep your debt.';
            });
        };
        /*DIALOG*/
        function changePage(page){
            vm.dto.currentPage = page;
            vm.dto.list = _itens.slice(((vm.dto.currentPage-1)*vm.dto.pageSize), vm.dto.pageSize*vm.dto.currentPage);

            getMoreInfinityScrollData(vm.dto.currentPage);
        }
        vm.changePage = changePage;

        function buscarRemetentePeloNome(noUsuario) {
            var retorno = $q.defer();
            EventoService.obterRemetentesPeloNome(noUsuario,false)
                .success(function (data) {
                    retorno.resolve(data);
                })
                .error(function () {
                    retorno.reject(alert('Não foi possivel carregar os dados'));
                });
            return retorno.promise;
        }
    }
})();
