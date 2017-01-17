(function(){
    angular
        .module('sisagmApp.reuniao.controllers')
        .controller('ReuniaoPesquisarReuniaoController', ReuniaoPesquisarReuniaoController);

    /* @ngInject */
    function ReuniaoPesquisarReuniaoController($scope, $timeout, $log, $http, $mdDialog, $state,$location, $anchorScroll, AlertsService, DTO,EventoService){
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
    vm.participantes = EventoService.buscarPorNome;

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
            noLocalEvento: '',
            tipoEvento: '',
            noDespacho: '',
            localReuniao: '',
            noPauta: '',
            assunto: '',
            descricao: '',
            dataInicio:'',
            dtFimEvento:'',
            flEventoInternacional: '',
            dataInicialCad:'',
            dataFimCad:''
        };
    }

    function pesquisar (){

        vm.filtro.tipoEvento = {id: 3,noTipoEvento: 'REUNIAO'};
        vm.filtro.flEventoInternacional = false;

        $state.params.filtro.filtros.dataCadInicial = new Date(vm.filtro.dataCadInicial).getTime();
        $state.params.filtro.filtros.dataCadFinal = new Date(vm.filtro.dataCadFinal).getTime();

        $state.params.filtro.filtros.noAssunto = vm.filtro.assunto;
        $state.params.filtro.filtros.noDespacho = vm.filtro.noDespacho;
        $state.params.filtro.filtros.noPauta = vm.filtro.pautaReuniao;
        $state.params.filtro.filtros.tipoEvento = vm.filtro.tipoEvento;
        $state.params.filtro.filtros.noLocalEvento = vm.filtro.localReuniao;

        $state.params.filtro.filtros.dtInicioEvento = vm.filtro.dataInicio;
        $state.params.filtro.filtros.dtFimEvento = vm.filtro.dataFim;

        getMoreInfinityScrollData($state.params.filtro.currentPage);

        $location.hash('result-pesquisa');
        $anchorScroll();
    }

        function getMoreInfinityScrollData(pageNumber){
            $state.params.filtro.currentPage = pageNumber;

            var promiseLoadMoreData = EventoService.consultarComFiltroSemLoader($state.params.filtro);

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
