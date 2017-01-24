(function(){
    angular
        .module('sisagmApp.reuniao.controllers')
        .controller('ReuniaoPesquisarReuniaoController', ReuniaoPesquisarReuniaoController);

    /* @ngInject */
    function ReuniaoPesquisarReuniaoController($scope, $window, $timeout, $log,$mdSidenav, $http, $mdDialog, $state,$location, $anchorScroll, $q, AlertsService, DTO,EventoService,ReuniaoService,Principal){
    var vm = this;
    var _itens = [];
    vm.help = help;
    vm.dto = new DTO();
    vm.title = "Pesquisar reunião";
    Principal.identity().then(function(account) {
        vm.autoridade  = account.userAutenticado.autoridade.noAutoridade;
    });
    vm.tbResultado = false;
    vm.pesquisar = pesquisar;
    vm.editar = editar;
    vm.filtro = {};
    vm.limpar = limpar;
    vm.listaAutoridades = {};
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
    vm.trocaOrdenacao = trocaOrdenacao;
     /*chip*/
    vm.querySearch = querySearch;

    inicializar();
    ///////////////////////////////////
    function inicializar (){
        vm.listaAutoridades = [
            {autoridade: "Ministro do Turismo"},
            {autoridade: "Secretário Executivo"},
            {autoridade: "Secretário Nacional de Estruturação do Turismo"},
            {autoridade: "Secretário Nacional de Qualificação e Promoção do Turismo"}
        ];

        vm.filtro = {
            tipoEvento: '',
            noDespacho: '',
            noLocalEvento: '',
            noPauta: '',
            noAssunto: '',
            dtInicioEvento:'',
            dtFimEvento:'',
            flEventoInternacional: '',
            dataInicialCad:'',
            participantes:[],

        };
    }

        /*ARQUIVO ORIGINAL CHIP*/
        /*funções*/
        function transformChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }
            // Otherwise, create a new one
            return { name: chip, type: 'new' }
        }
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
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(vegetable) {
                return (vegetable._lowername.indexOf(lowercaseQuery) === 0);
            };
        }
        <!-- componente de autocomplete -->

        /*ARQUIVO ORIGINAL CHIP*/


    function pesquisar (){
        vm.filtro.tipoEvento = {id: 3,noTipoEvento: 'REUNIAO'};
        vm.filtro.flEventoInternacional = false;

        $state.params.filtro.filtros.dataCadInicial = new Date(vm.filtro.dataCadInicial).getTime();
        $state.params.filtro.filtros.dataCadFinal   = new Date(vm.filtro.dataCadFinal).getTime();
        $state.params.filtro.filtros.dtInicioEvento =  new Date(vm.filtro.dtInicioEvento).getTime();
        $state.params.filtro.filtros.dtFimEvento    =  new Date(vm.filtro.dtFimEvento).getTime();

        $state.params.filtro.filtros.noAssunto      = vm.filtro.noAssunto != undefined ? vm.filtro.noAssunto : '';
        $state.params.filtro.filtros.noDespacho     = vm.filtro.noDespacho != undefined ? vm.filtro.noDespacho : '';
        $state.params.filtro.filtros.noPauta        = vm.filtro.noPauta != undefined ? vm.filtro.noPauta : '';
        $state.params.filtro.filtros.tipoEvento     = vm.filtro.tipoEvento;
        $state.params.filtro.filtros.noLocalEvento  = vm.filtro.noLocalEvento != undefined ? vm.filtro.noLocalEvento : '';
        var idPessoa = [];

        if(vm.participantes != undefined){
            vm.participantes.forEach(function (participante) {
                idPessoa.push(participante.pessoa.id);
            });
        }
        $state.params.filtro.filtros.participantes  = vm.participantes != undefined ? idPessoa : '';

        getMoreInfinityScrollData($state.params.filtro.currentPage);
    }

        function getMoreInfinityScrollData(pageNumber){
            vm.dto.list = [];
            $state.params.filtro.currentPage = pageNumber;

            var promiseLoadMoreData = EventoService.consultarComFiltroSemLoader($state.params.filtro);

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
    function editar (reuniao){
        $state.go('app.private.reuniao.editar-reuniao', {reuniao: reuniao});
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

        function changePage(page) {
            vm.dto.currentPage = page;
            vm.dto.list = _itens.slice(((vm.dto.currentPage - 1) * vm.dto.pageSize), vm.dto.pageSize * vm.dto.currentPage);
            getMoreInfinityScrollData(vm.dto.currentPage);
        }

        function trocaOrdenacao() {

            $state.params.filtro.sortFields = vm.dto.order;
            $state.params.filtro.sortDirections = vm.dto.orderDirection;
            $state.params.filtro.pageSize = vm.dto.pageSize;

            getMoreInfinityScrollData(vm.dto.currentPage);
        }

        vm.changePage = changePage;

        vm.filtro = {
            nome: '',
            cargo: '',
            email: '',
            tel: ''
        };

        ///////////////////////////////////

    function limpar (){
        Object.getOwnPropertyNames(vm.filtro).forEach(function (prop) {
            vm.filtro[prop] = '';
        });

        vm.participantes = [];

        vm.tbResultado = false;
        vm.dto.totalResults = 0;
        vm.dto.list = [];
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
        $scope.showConfirm = function(ev,reuniao) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Atenção')
                .textContent('Tem certeza que deseja remover esse registro?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Ok')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function() {
                EventoService.excluirPorId(reuniao.id).then(
                    function (sucesso) {
                        AlertsService.success('Registro removido com sucesso.');
                        var index = vm.dto.list.indexOf(reuniao);
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

        /*MODAL*/
        function help(ev) {
            $mdDialog.show({
                controller: ReuniaoPesquisarReuniaoController,
                templateUrl: 'modules/reuniao/help/modal-pesquisar-help.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        };
        $scope.close = function() {
            $mdDialog.cancel();
        };
        /*MODAL*/



    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
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
    }

})();
