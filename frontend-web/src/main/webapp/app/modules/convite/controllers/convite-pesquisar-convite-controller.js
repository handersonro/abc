(function(){
    angular
        .module('sisagmApp.convite.controllers')
        .controller('ConvitePesquisarConviteController', ConvitePesquisarConviteController);

    /* @ngInject */
    function ConvitePesquisarConviteController($scope, $timeout, $log, $http, $mdDialog, $state, $location, $anchorScroll, AlertsService, ConviteRestService, DTO){
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
    vm.tipoEvento={};
    vm.validacoes={};
    vm.procurarLocal = ConviteRestService.obterLocais;
    inicializar();
    ///////////////////////////////////
    function inicializar (){
        vm.flEventoInternacional=[
          {evento : 'Nacional'},
          {evento : 'Internacional'}
        ];
        vm.validacoes=[
          {validado : 'Sim'},
          {validado : 'Não'},
          {validado : 'Indiferente'}
        ];

        vm.filtro = {
            idLocalidade: '',
            observacao: '',
        };

    }
    function limpar(){
        vm.filtro = {};
    }

        function pesquisar (){
            $state.params.filtro.filtros = {};
            $state.params.filtro.filtros.idLocalidade = vm.filtro.idLocalidade;
            $state.params.filtro.filtros.observacao = vm.filtro.observacao;
            $state.params.filtro.currentPage = 1;
            getMoreInfinityScrollData($state.params.filtro.currentPage);
        }

        function getMoreInfinityScrollData(pageNumber){
            $state.params.filtro.currentPage = pageNumber;
            var promiseLoadMoreData = ConviteRestService.consultarComFiltroSemLoader($state.params.filtro);
            promiseLoadMoreData.then(function(data){
                vm.tbResultado = true;
                $location.hash('result-pesquisa');
                $anchorScroll();

                vm.dto.totalResults = data.totalResults;
                vm.dto.list = data.slice(0, vm.dto.pageSize);
            });
            return promiseLoadMoreData;
        }





    function editar (convite){
        $state.go('app.private.convite.editar-convite', {convite: convite});
    }

    vm.carregarListConvite = function(){
        $http
        .get('modules/convite/data/list-convite.json')
        .success (function(data){
            _itens = data;
            vm.dto.totalResults = data.length;
            vm.dto.list = _itens.slice(0, vm.dto.pageSize);
        })
        .error(function(){
            alert('Não fooi possivel carregar os dados');
        });
    };
   vm.carregarListConvite();
   /*exemplo

   */



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
    function changePage(page){
        vm.dto.currentPage = page;
        vm.dto.list = _itens.slice(((vm.dto.currentPage-1)*vm.dto.pageSize), vm.dto.pageSize*vm.dto.currentPage);
    }
    $scope.changePage = changePage;
  }


})();
