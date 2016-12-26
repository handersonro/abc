(function(){
  ConvitePesquisarConviteController.$inject = ["$scope", "$timeout", "$mdSidenav", "$log", "$http", "$mdDialog", "$state", "AlertsService", "ConviteRestService"];
    angular
        .module('sisagmApp.convite.controllers')
        .controller('ConvitePesquisarConviteController', ConvitePesquisarConviteController);

    /* @ngInject */
    function ConvitePesquisarConviteController($scope, $timeout, $mdSidenav, $log, $http, $mdDialog, $state, AlertsService, ConviteRestService){
    var vm = this;
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
        vm.tipoEvento=[
          {evento : 'Nacional'},
          {evento : 'Internacional'}
        ];
        vm.validacoes=[
          {validado : 'Sim'},
          {validado : 'Não'},
          {validado : 'Indiferente'}
        ];
    }
    function pesquisar (){
        vm.tbResultado = true;
    }
    function editar (convite){
        $state.go('app.private.convite.editar-convite', {convite: convite});
    }

    vm.carregarListConvite = function(){

        ConviteRestService
            .obterListaConvite({})
            .then(
                function(data){
                    vm.listaConvites = data;
                },
                function(error){

                }
            );
   };
    vm.carregarListConvite();

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
