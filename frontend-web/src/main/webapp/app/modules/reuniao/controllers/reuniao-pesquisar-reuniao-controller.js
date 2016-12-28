(function(){
    angular
        .module('sisagmApp.reuniao.controllers')
        .controller('ReuniaoPesquisarReuniaoController', ReuniaoPesquisarReuniaoController);

    /* @ngInject */
    function ReuniaoPesquisarReuniaoController($scope, $timeout, $log, $http, $mdDialog, $state, AlertsService, UsuarioRestService, ConviteRestService, DTO){
    var vm = this;
    var _itens = [];
    vm.dto = new DTO();
    vm.title = "Pesquisar reunião";
    vm.autoridade = 'Ministro';
    vm.tbResultado = false;
    vm.pesquisar = pesquisar;
    vm.editar = editar;
    vm.filtro = {};
    vm.limpar = limpar;
    vm.listaAutoridades = {};
    vm.procurarUsuario = UsuarioRestService.obterUsuarios;
    vm.procurarLocal = ConviteRestService.obterLocais;
    inicializar();
    ///////////////////////////////////
    function inicializar (){
        vm.listaAutoridades = [
            {autoridade: "Ministro do Turismo"},
            {autoridade: "Secretário Executivo"},
            {autoridade: "Secretário Nacional de Estruturação do Turismo"},
            {autoridade: "Secretário Nacional de Qualificação e Promoção do Turismo"}
        ];
    }

    function pesquisar (){
        vm.tbResultado = true;
    }
    function editar (reuniao){
        $state.go('app.private.reuniao.editar-reuniao', {reuniao: reuniao});
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
    function changePage(page){
    	vm.dto.currentPage = page;
    	vm.dto.list = _itens.slice(((vm.dto.currentPage-1)*vm.dto.pageSize), vm.dto.pageSize*vm.dto.currentPage);
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
  }


})();
