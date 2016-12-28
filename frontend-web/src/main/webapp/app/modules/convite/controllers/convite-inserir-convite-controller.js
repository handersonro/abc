(function(){
    angular
        .module('sisagmApp.convite.controllers')
        .controller('ConviteInserirConviteController', ConviteInserirConviteController);

    /* @ngInject */
    function ConviteInserirConviteController($scope, $timeout, $mdSidenav, $log, $http, $mdDialog, $state, AlertsService, ConviteRestService){
    var vm = this;
    vm.title = "Incluir convite";
    vm.autoridade = 'Ministro';
    vm.convite = {};
    vm.validacoes = {};
    vm.showBtnSalvar = showBtnSalvar;
    vm.salvar = salvar;
    vm.limpar = limpar;

    vm.procurarLocal = ConviteRestService.obterLocais;
    inicializar();
    ///////////////////////////////////
    function inicializar(){
        vm.convite = {
              dataInicioEvento: '',
              dataFimEvento: '',
              dataCadastramento: new Date(),
              remetente: '',
              descricao: '',
              tipoEvento: '',
              pais: '',
              cidade: '',
              localEvento: '',
              observacao: '',
              despacho: ''
        };
        console.log(vm.convite.dataCadastramento);
        vm.validacoes=[
          {validado : 'Sim'},
          {validado : 'Não'},
          {validado : 'Indiferente'}
        ];
    }
    function showBtnSalvar(){
      return $scope.formConvite.$invalid;
    }
    function salvar(){
        if(vm.dataInicioEvento > vm.dataFimEvento){
            return AlertsService.success($filter('translate')('A13.4'));
        }

        AlertsService.success('Registro incluído com sucesso.');
        $state.go('app.private.convite.inserir-convite', {}, {reload: true});
    }
    function limpar(){
        $state.go('app.private.convite.inserir-convite', {}, {reload: true});
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
