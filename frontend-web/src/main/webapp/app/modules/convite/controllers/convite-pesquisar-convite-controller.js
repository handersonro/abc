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
    function ConvitePesquisarConviteController($scope, $timeout, $log, $http, $mdDialog, $q,$state, $location, $anchorScroll, AlertsService, ConviteRestService,EventoService, DTO,Principal, $window) {
        var vm = this;
        var _itens = [];
        vm.dto = new DTO();
        vm.title = "Pesquisar convite";
        Principal.identity().then(function(account) {
            vm.autoridade  = account.userAutenticado.autoridade.noAutoridade;
        });
        vm.tbResultado = false;
        vm.pesquisar = pesquisar;
        vm.editar = editar;
        vm.filtro = {};
        vm.limpar = limpar;
        vm.help = help;
        vm.dasabilitaCampo = dasabilitaCampo;
        vm.tipoEvento = {};
        vm.validacoes = {};
        vm.procurarLocal = ConviteRestService.obterLocais;
        vm.buscarRemetentePeloNome = ConviteRestService.obterRemetentes;
        vm.procurarPaises = ConviteRestService.obterPaises;
        vm.trocaOrdenacao = trocaOrdenacao;
        inicializar();
        ///////////////////////////////////
        function inicializar() {
            $window.scrollTo(0, 0);
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
                dataCadFinal:'',
                idPais: '',
                noCidadeInternacional: '',
            };

        }

        function limpar() {
            Object.getOwnPropertyNames(vm.filtro).forEach(function (prop) {
                vm.filtro[prop] = '';
            });
            vm.filtro.idLocalidade = '';

            vm.tbResultado = false;
            vm.dto.totalResults = 0;
            vm.dto.list = [];
        }

       function pesquisar() {
           var tipoEvento = {id: 2,noTipoEvento: 'CONVITE'};

            var dataCadInicial = new Date(vm.filtro.dataCadInicial).getTime();
            var dataCadFinal = new Date(vm.filtro.dataCadFinal).getTime();

            var dtInicioEvento = new Date(vm.filtro.dtInicioEvento).getTime();
            var dtFimEvento = new Date(vm.filtro.dtFimEvento).getTime();

            if(vm.filtro.validado ==="Indiferente"){
                vm.filtro.validado = "INDIFERENTE";
            }else if(vm.filtro.validado ==="Sim"){
                vm.filtro.validado = "SIM";
            }else if(vm.filtro.validado ==="Não"){
                vm.filtro.validado = "NAO";
            }

            if(vm.filtro.tipoSaida ==="Evento internacional"){
                vm.filtro.tipoSaida = true;
            }else if(vm.filtro.tipoSaida ==="Evento nacional"){
                vm.filtro.tipoSaida = false;
            }

            $state.params.filtro.filtros.noObservacao = vm.filtro.noObservacao;
            $state.params.filtro.filtros.noDespacho = vm.filtro.noDespacho;
            $state.params.filtro.filtros.tipoEvento = tipoEvento;
            $state.params.filtro.filtros.idLocalidade = vm.filtro.idLocalidade != null ? vm.filtro.idLocalidade.id : '';
            $state.params.filtro.filtros.noRemetente = vm.filtro.remetente != null ? vm.filtro.remetente.noRemetente : '';
            $state.params.filtro.filtros.descricao = vm.filtro.descricao;
            $state.params.filtro.filtros.dtInicioEvento = dtInicioEvento;
            $state.params.filtro.filtros.dtFimEvento = dtFimEvento;
            $state.params.filtro.filtros.dataCadInicial = dataCadInicial;
            $state.params.filtro.filtros.dataCadFinal   = dataCadFinal;
            $state.params.filtro.filtros.conviteValidacao = vm.filtro.validado;
            $state.params.filtro.filtros.flEventoInternacional = vm.filtro.tipoSaida;
            $state.params.filtro.filtros.idPais = vm.filtro.idPais.id;
            $state.params.filtro.filtros.noCidadeInternacional = vm.filtro.noCidadeInternacional;
            $state.params.filtro.currentPage = 1;

            console.log(dtInicioEvento, dtFimEvento);

            getMoreInfinityScrollData($state.params.filtro.currentPage);
        }

        function dasabilitaCampo() {
            console.log('Teste');
        }

        function getMoreInfinityScrollData(pageNumber){
            vm.dto.list = [];
            $state.params.filtro.currentPage = pageNumber;

            var promiseLoadMoreData = ConviteRestService.consultarComFiltroSemLoader($state.params.filtro);

            promiseLoadMoreData.then(
                function(data) {
                    vm.tbResultado = true;

                    $location.hash('result-pesquisa');

                    vm.dto.totalResults = data.totalResults;
                    vm.dto.list = data.list;

                    _.map(vm.dto.list, function(item){
                        var _fields = ['dtInicioEvento', 'dtFimEvento', 'dtCadastro'];
                        _fields.forEach(function(campo, index){
                            var t = new Date();
                            var d = new Date(item[campo]-t.getTimezoneOffset()*60*1000);
                            item[campo] = d;
                        });
                        return item;
                    });

                    $timeout(function () {
                        $anchorScroll();
                    },0);
                },function (error) {
                    vm.tbResultado = false;
                    vm.dto.totalResults = 0;
                    vm.dto.list = [];
                    $window.scrollTo(0, 0);
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
                        AlertsService.success('Convite removido com sucesso.');
                        var index = vm.dto.list.indexOf(convite);
                        vm.dto.list.splice(index,1);

                        $window.scrollTo(0, 0);
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

        /*MODAL*/
        function help(ev) {
            $mdDialog.show({
                controller: ConvitePesquisarConviteController,
                templateUrl: 'modules/convite/help/modal-pesquisar-help.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        };
        $scope.close = function() {
            $mdDialog.cancel();
        };
        /*MODAL*/

        function changePage(page) {
            console.log('aeaueauh', ((vm.dto.currentPage-1)*vm.dto.pageSize), vm.dto.pageSize*vm.dto.currentPage);
            vm.dto.currentPage = page;
            vm.dto.list = _itens.slice(((vm.dto.currentPage-1)*vm.dto.pageSize), vm.dto.pageSize*vm.dto.currentPage);
            getMoreInfinityScrollData(vm.dto.currentPage);
        }

        /*function buscarRemetentePeloNome(noUsuario) {
            var retorno = $q.defer();
            EventoService.obterRemetentesPeloNome(noUsuario,false)
                .success(function (data) {
                    retorno.resolve(data);
                })
                .error(function () {
                    retorno.reject(alert('Não foi possivel carregar os dados'));
                });
            return retorno.promise;
        }*/

        function trocaOrdenacao() {

            $state.params.filtro.sortFields = vm.dto.order;
            $state.params.filtro.sortDirections = vm.dto.orderDirection;
            $state.params.filtro.pageSize = vm.dto.pageSize;

            getMoreInfinityScrollData(vm.dto.currentPage);
        }

        /**
         * Obterm os paises da base do
         * */
        function obterPaises(noPais) {
            var retorno = $q.defer();
            $http.get('evento/paises?noPais=' + noPais)
                .success(function (data) {
                    retorno.resolve(data);
                })
                .error(function () {
                    retorno.reject(alert('Não fooi possivel carregar os dados'));
                });
            return retorno.promise;
        }

        vm.changePage = changePage;
    }


})();
