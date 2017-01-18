(function(){
    angular
        .module('sisagmApp.pessoas.controllers')
        .controller('PessoasPesquisarRemetenteController', PessoasPesquisarRemetenteController);

    /* @ngInject */
    function PessoasPesquisarRemetenteController($scope, $timeout, $mdSidenav, $log, $http, $mdDialog, $state, $location, $anchorScroll, AlertsService, DTO, RemetenteService){
        var vm = this;
        var _itens = [];
        vm.limpar = limpar;
        vm.showSalvar = showSalvar;
        vm.pesquisar = pesquisar;
        vm.editar = editar;
        vm.help = help;
        vm.dto = new DTO();
        vm.changePage = changePage;
        ///////////////////////////////////
        vm.title = "Pesquisar remetente";
        vm.tbResultado = false;
        vm.remetenteVO = {
            noRemetente: '',
            noCargo: '',
            noEmail: '',
            nuTelefone: ''
        };

        function limpar (){
            Object.getOwnPropertyNames(vm.remetenteVO).forEach(function (prop) {
                vm.remetenteVO[prop] = '';
            });

            vm.tbResultado = false;
            vm.dto.totalResults = 0;
            vm.dto.list = [];
        }

        function pesquisar (){
            $state.params.filtro.filtros.noRemetente = vm.remetenteVO.noRemetente;
            $state.params.filtro.filtros.noCargo = vm.remetenteVO.noCargo;
            $state.params.filtro.filtros.noEmail = vm.remetenteVO.noEmail;
            $state.params.filtro.filtros.nuTelefone = vm.remetenteVO.nuTelefone.replace(/[^0-9]/g,'');
            $state.params.filtro.currentPage = 1;
            getMoreInfinityScrollData($state.params.filtro.currentPage);
        }

        function editar (remetente){
            $state.go('app.private.pessoas.editar-remetente', {remetente: remetente});
        }

        function showSalvar(){
            return $scope.formRemetente.$invalid;
        }

        /*MODAL*/
        function help(ev) {
            $mdDialog.show({
                controller: PessoasPesquisarRemetenteController,
                templateUrl: '/modules/pessoas/help/modal-help.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        };
        $scope.close = function() {
            $mdDialog.cancel();
        };
        /*MODAL*/

        function getMoreInfinityScrollData(pageNumber){
            $state.params.filtro.currentPage = pageNumber;

            var promiseLoadMoreData = RemetenteService.consultarComFiltroSemLoader($state.params.filtro);

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

        /*DIALOG*/
        $scope.showConfirm = function(ev,remetente) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Atenção')
                .textContent('Tem certeza que deseja remover esse registro?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Ok')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function() {
                RemetenteService.excluirPorId(remetente.id).then(
                    function (sucesso) {
                        AlertsService.success('Remetente removido com sucesso.');
                        var index = vm.dto.list.indexOf(remetente);
                        vm.dto.list.splice(index,1);
                    }
                );
                $scope.status = 'You decided to get rid of your debt.';
            }, function() {
                $scope.status = 'You decided to keep your debt.';
            });
        };
        /*DIALOG*/
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
        function changePage(page){
            vm.dto.currentPage = page;
            vm.dto.list = _itens.slice(((vm.dto.currentPage-1)*vm.dto.pageSize), vm.dto.pageSize*vm.dto.currentPage);

            getMoreInfinityScrollData(vm.dto.currentPage);
        }
        $scope.changePage = changePage;
    }
})();
