(function(){
    angular
        .module('sisagmApp.pessoas.controllers')
        .controller('PessoasPesquisarParticipanteController', PessoasPesquisarParticipanteController);

    /* @ngInject */
    function PessoasPesquisarParticipanteController($scope, $timeout, $mdSidenav, $log, $http, $mdDialog, $state, $location, $anchorScroll, AlertsService, DTO, ParticipanteInternoService, ParticipanteExternoService){
        var vm = this;
        var _itens = [];
        vm.tbResultado = false;
        vm.editar = editar;
        vm.pesquisar = pesquisar;
        vm.filtro = {};
        vm.dto = new DTO();
        vm.title = "Pesquisar participante";

        vm.changePage = changePage;
        vm.trocaOrdenacao = trocaOrdenacao;

        vm.filtro = {
            nome: '',
            cargo: '',
            email: '',
            tel: ''
        };

        ///////////////////////////////////

        vm.limpar = function(){
            Object.getOwnPropertyNames(vm.filtro).forEach(function (prop) {
                vm.filtro[prop] = '';
            });

            vm.tbResultado = false;
            vm.dto.totalResults = 0;
            vm.dto.list = [];
        }
        function pesquisar (){
            vm.tbResultado = false;
            vm.dto.list = [];
            vm.dto.totalResults = 0;
            $state.params.filtro.filtros.noParticipanteExterno = vm.filtro.nome;
            $state.params.filtro.filtros.noCargo = vm.filtro.cargo;
            $state.params.filtro.filtros.noEmail = vm.filtro.email;
            $state.params.filtro.filtros.nuTelefone = vm.filtro.tel.replace(/[^0-9]/g,'');
            $state.params.filtro.currentPage = 1;
            getMoreInfinityScrollData($state.params.filtro.currentPage);
        }

        function getMoreInfinityScrollData(pageNumber){
            $state.params.filtro.currentPage = pageNumber;
            var promiseLoadMoreData = ParticipanteExternoService.consultarComFiltroSemLoader($state.params.filtro);
            promiseLoadMoreData.then(function(data){
                    vm.dto.list = [];
                    vm.dto.totalResults = data.totalResults;
                    angular.forEach(data.list, function (value, key){

                        vm.dto.list.push(
                            {
                                id: value.id,
                                nome: value.noParticipanteExterno,
                                cargo: value.noCargo,
                                email: value.noEmail,
                                tel: atribuirTelefone(value.nuTelefone),
                                pessoa:{
                                    id: value.pessoa.id,
                                    flPessoaAtivo: value.pessoa.id
                                }
                            }
                        );
                    });

                    $location.hash('result-pesquisa');
                    $anchorScroll();
                    vm.tbResultado = true;
                },function (error) {
                    vm.tbResultado = false;
                    vm.dto.totalResults = 0;
                    vm.dto.list = [];
                }
            );

            return promiseLoadMoreData;
        }

        function editar (participante){
            $state.go('app.private.pessoas.editar-participante', {participante: participante});
        }


        $scope.carregaLista = function(){
            $http
                .get('modules/pessoas/data/list-pessoas.json')
                .success (function(data){
                    _itens = data;
                    vm.dto.totalResults = data.length;
                    vm.dto.list = _itens.slice(0, vm.dto.pageSize);
                })
                .error(function(){
                    alert('Não fooi possivel carregar os dados');
                });
        };
        //$scope.carregaLista();

        /*DIALOG*/
        $scope.showConfirm = function(ev, participante) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Atenção')
                .textContent('Tem certeza que deseja remover esse registro?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Ok')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                ParticipanteExternoService.excluirPorId(participante.id).then(
                    function (sucesso){
                        AlertsService.success('Participante removido com sucesso.');
                        pesquisar();
                    }
                );
                $scope.status = 'You decided to get rid of your debt.';
            }, function() {
                $scope.status = 'You decided to keep your debt.';
            });
        };
        /*DIALOG*/

        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        $scope.toggleLeft = buildDelayedToggler('left');
        $scope.toggleRight = buildToggler('right');
        $scope.isOpenRight = function(){
            return $mdSidenav('right').isOpen();
        };

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
            return function() {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }
        }

        function changePage(page){
            vm.dto.currentPage = page;
            vm.dto.list = _itens.slice(((vm.dto.currentPage-1)*vm.dto.pageSize), vm.dto.pageSize*vm.dto.currentPage);

            getMoreInfinityScrollData(vm.dto.currentPage);
        }

        function trocaOrdenacao() {

            $state.params.filtro.sortFields = vm.dto.order;
            $state.params.filtro.sortDirections = vm.dto.orderDirection;
            $state.params.filtro.pageSize = vm.dto.pageSize;

            getMoreInfinityScrollData(vm.dto.currentPage);
        }

        function atribuirTelefone(telefone) {
            if(telefone == undefined || telefone == null){
                return telefone = 0;
            }
            return telefone;
        }

        $scope.changePage = changePage;
    }
})();