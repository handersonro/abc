(function(){
    angular
        .module('sisagmApp.autoridade.controllers')
        .controller('AutoridadePesquisarAutoridadeController', AutoridadePesquisarAutoridadeController);

    /* @ngInject */
    function AutoridadePesquisarAutoridadeController($scope, $timeout, $log, $http, $mdDialog, $state, $location, $anchorScroll, AlertsService, DTO, AutoridadeService){
    var vm = this;
    var _itens = [];
    vm.dto = new DTO();
    vm.title = "Pesquisar autoridade";
    vm.autoridade = 'Ministro';
    vm.tbResultado = false;
    vm.pesquisar = pesquisar;
    vm.help = help;
    vm.editar = editar;
    vm.trocaOrdenacao = trocaOrdenacao;
    vm.filtro = {
        noAutoridade: '',
        noEmail: ''
    };
    vm.limpar = limpar;
    inicializar();
    ///////////////////////////////////
    function inicializar (){

    }
    function pesquisar (){

        $state.params.filtro.filtros.noAutoridade = vm.filtro.noAutoridade;
        $state.params.filtro.filtros.noEmail = vm.filtro.noEmail;
        $state.params.filtro.currentPage = 1;
        getMoreInfinityScrollData($state.params.filtro.currentPage);
    }

    function getMoreInfinityScrollData(pageNumber){
        $state.params.filtro.currentPage = pageNumber;
        vm.dto.list = {};
        console.log($state.params.filtro);

        var promiseLoadMoreData = AutoridadeService.consultarComFiltroSemLoader($state.params.filtro);

        promiseLoadMoreData.then(
            function(data) {
                vm.tbResultado = true;
    
                $location.hash('result-pesquisa');
    
                vm.dto.totalResults = data.totalResults;
                vm.dto.list = data.list;
                $anchorScroll();
            }, function (error) {
                vm.tbResultado = false;
                vm.dto.totalResults = 0;
                vm.dto.list = [];
            }
        );

        return promiseLoadMoreData;
    }

        /*MODAL*/
        function help(ev) {
            $mdDialog.show({
                controller: AutoridadePesquisarAutoridadeController,
                templateUrl: '/modules/autoridade/help/modal-help.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        };
        $scope.close = function() {
            $mdDialog.cancel();
        };
        /*MODAL*/

    function editar (autoridade){
        $state.go('app.private.autoridade.editar-autoridade', {autoridade: autoridade});
    }

    function changePage(page){
    	vm.dto.currentPage = page;
    	vm.dto.list = _itens.slice(((vm.dto.currentPage-1)*vm.dto.pageSize), vm.dto.pageSize*vm.dto.currentPage);

        getMoreInfinityScrollData(vm.dto.currentPage);
    }
    $scope.changePage = changePage;

    function limpar(){
        vm.filtro = {};
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
    vm.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
          .title('Atenção')
          .textContent('Tem certeza que deseja remover esse registro?')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Ok')
          .cancel('Cancelar');

        $mdDialog.show(confirm).then(function() {
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

    function trocaOrdenacao() {
        $state.params.filtro.sortFields = vm.dto.order;
        $state.params.filtro.sortDirections = vm.dto.orderDirection;
        $state.params.filtro.pageSize = vm.dto.pageSize;

        getMoreInfinityScrollData(vm.dto.currentPage);
    }
  }


})();
