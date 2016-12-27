(function(){
    angular
        .module('sisagmApp.reuniao.controllers')
        .controller('ReuniaoInserirReuniaoController', ReuniaoInserirReuniaoController);

    /* @ngInject */
    function ReuniaoInserirReuniaoController($scope, $timeout, $mdSidenav, $log, $http, $mdDialog, $state,  AlertsService, UsuarioRestService, ConviteRestService){
    var vm = this;
    vm.title = "Incluir reunião";
    vm.autoridade = 'Ministro';
    vm.reuniao = {};
    vm.validacoes = {};
    vm.showBtnSalvar = showBtnSalvar;
    vm.salvar = salvar;
    vm.limpar = limpar;
    vm.listaAutoridades = {};
    vm.procurarUsuario = UsuarioRestService.obterUsuarios;
    vm.procurarLocal = ConviteRestService.obterLocais;
    inicializar();
    ///////////////////////////////////
    function inicializar(){
        vm.listaAutoridades = [
            {autoridade: "Ministro do Turismo"},
            {autoridade: "Secretário Executivo"},
            {autoridade: "Secretário Nacional de Estruturação do Turismo"},
            {autoridade: "Secretário Nacional de Qualificação e Promoção do Turismo"}
        ];
    }
    function showBtnSalvar(){
      return $scope.formReuniao.$invalid;
    }
    function salvar(){
        if(vm.dataInicio > vm.dataFim){
            return AlertsService.success($filter('translate')('A13.4'));
        }
        AlertsService.success('Registro incluído com sucesso.');
        $state.go('app.private.reuniao.inserir-reuniao', {}, {reload: true});
    }
    function limpar(){
        $state.go('app.private.reuniao.inserir-reuniao', {}, {reload: true});
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
