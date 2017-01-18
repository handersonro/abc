(function () {
    angular
        .module('sisagmApp.convite.controllers')
        /*@ngInject*/
        .config( function($mdDateLocaleProvider){
            $mdDateLocaleProvider.parseDate = function(date) {
                var regex_data = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/.exec(date);

                var isDataValida = false;
                var montaData;

                if(regex_data){
                    var dia = regex_data[1];
                    var mes = regex_data[2] - 1;
                    var ano = regex_data[3];
                    montaData = new Date(ano, mes, dia);

                    isDataValida = (
                        montaData.getDate() == dia &&
                        montaData.getMonth() == mes &&
                        montaData.getFullYear() == ano
                    );
                }

                if(isDataValida){
                    return montaData;
                }else {
                    return date;
                }

            };
        })
        .controller('ConvitePesquisarConviteController', ConvitePesquisarConviteController);

    /* @ngInject */
    function ConvitePesquisarConviteController($scope, $timeout, $log, $http, $mdDialog, $state, $location, $anchorScroll, AlertsService, ConviteRestService, DTO) {
        var vm = this;
        var _itens = [];
        vm.dto = new DTO();
        vm.title = "Pesquisar convite";
        vm.autoridade = 'Ministro';
        vm.tbResultado = false;
        vm.pesquisar = pesquisar;
        vm.editar = editar;
        vm.filtro = {};
        vm.limpar = limpar;
        vm.dasabilitaCampo = dasabilitaCampo;
        vm.tipoEvento = {};
        vm.validacoes = {};
         vm.procurarLocal = ConviteRestService.obterLocais;
        inicializar();
        ///////////////////////////////////
        function inicializar() {
            vm.flEventoInternacional = [
                {evento: 'Nacional'},
                {evento: 'Internacional'}
            ];
            vm.validacoes = [
                {validado: 'Sim'},
                {validado: 'Não'},
                {validado: 'Indiferente'}
            ];

            vm.filtro = {
                noObservacao: '',
                tipoEvento: '',
                noDespacho: '',
                idLocalidade: '',
                remetente: '',
                descricao: '',
                flEventoInternacional: '',
                dtInicioEvento:'',
                dtFimEvento:'',
                dataCadInicial:'',
                dataCadFinal:''
            };

        }

        function limpar() {
            vm.filtro = {};
        }

       function pesquisar() {
           var tipoEvento = {id: 2,noTipoEvento: 'CONVITE'};

            vm.convite.tipoEvento = tipoEvento;
            vm.flEventoInternacional = vm.filtro.tipoSaida;
            var dataCadInicial = new Date(vm.filtro.dataCadInicial).getTime();
            var dataCadFinal = new Date(vm.filtro.dataCadFinal).getTime();

            if(vm.filtro.validado ==="Indiferente"){
                vm.filtro.validado = "INDIFERENTE";
            }else if(vm.filtro.validado ==="Sim"){
                vm.filtro.validado = "SIM";
            }else if(vm.filtro.validado ==="Não"){
                vm.filtro.validado = "NAO";
            }

            if(vm.filtro.tipoSaida ==="Internacional"){
                vm.filtro.tipoSaida = true;
            }else if(vm.filtro.tipoSaida ==="Nacional"){
                vm.filtro.tipoSaida = false;
            }

            $state.params.filtro.filtros.noObservacao = vm.filtro.noObservacao;
            $state.params.filtro.filtros.noDespacho = vm.filtro.noDespacho;
            $state.params.filtro.filtros.tipoEvento = vm.convite.tipoEvento;
            $state.params.filtro.filtros.idLocalidade = vm.filtro.idLocalidade;
            $state.params.filtro.filtros.noRemetente = vm.filtro.remetente;
            $state.params.filtro.filtros.descricao = vm.filtro.descricao;
            $state.params.filtro.filtros.dtInicioEvento = vm.filtro.dtInicioEvento;
            $state.params.filtro.filtros.dtFimEvento = vm.filtro.dtFimEvento;
            $state.params.filtro.filtros.dataCadInicial = dataCadInicial;
            $state.params.filtro.filtros.dataCadFinal   = dataCadFinal;
            $state.params.filtro.filtros.flEventoInternacional = vm.filtro.flEventoInternacional;
            $state.params.filtro.filtros.conviteValidacaoEnum = vm.filtro.validado;
            $state.params.filtro.filtros.flEventoInternacional = vm.filtro.tipoSaida;
            $state.params.filtro.currentPage = 1;

            getMoreInfinityScrollData($state.params.filtro.currentPage);
        }

        function dasabilitaCampo() {
            console.log('Teste');
        }

        function getMoreInfinityScrollData(pageNumber){
            $state.params.filtro.currentPage = pageNumber;

            var promiseLoadMoreData = ConviteRestService.consultarComFiltroSemLoader($state.params.filtro);

            promiseLoadMoreData.then(
                function(data) {
                    vm.tbResultado = true;

                    $location.hash('result-pesquisa');

                    vm.dto.totalResults = data.totalResults;
                    vm.dto.list = data.list;
                    $anchorScroll();
                },function (error) {
                    vm.tbResultado = false;
                    vm.dto.totalResults = 0;
                    vm.dto.list = [];
                }
            );

            return promiseLoadMoreData;
        }

        /**
         * Obterm as localiades apartir do terceiro caracter pesquisado
         * */
        function obterLocais(localEvento) {
            var retorno = $q.defer();
            $http.get('evento/localidades?noLocalidade=' + localEvento)
                .success(function (data) {
                    retorno.resolve(data);
                })
                .error(function () {
                    retorno.reject(alert('Não fooi possivel carregar os dados'));
                });
            return retorno.promise;
        }


        function editar(convite) {
            $state.go('app.private.convite.editar-convite', {convite: convite});
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
        $scope.showConfirm = function(ev,convite) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Atenção')
                .textContent('Tem certeza que deseja remover esse registro?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Ok')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function() {
                ConviteRestService.excluirPorId(convite.id).then(
                    function (sucesso) {
                        AlertsService.success('Remetente removido com sucesso.');
                        var index = vm.dto.list.indexOf(convite);
                        vm.dto.list.splice(index,1);
                    }
                );
                $scope.status = 'You decided to get rid of your debt.';
            }, function() {
                $scope.status = 'You decided to keep your debt.';
            });
        };
        /*DIALOG*/

        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
            return debounce(function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }

        function buildToggler(navID) {
            return function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }
        }

        function changePage(page) {
            console.log('aeaueauh', ((vm.dto.currentPage-1)*vm.dto.pageSize), vm.dto.pageSize*vm.dto.currentPage);
            vm.dto.currentPage = page;
            vm.dto.list = _itens.slice(((vm.dto.currentPage-1)*vm.dto.pageSize), vm.dto.pageSize*vm.dto.currentPage);
        }

        $scope.changePage = changePage;
    }


})();
