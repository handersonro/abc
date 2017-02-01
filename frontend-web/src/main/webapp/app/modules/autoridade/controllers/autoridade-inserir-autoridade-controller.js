(function(){
    angular
        .module('sisagmApp.autoridade.controllers')
        .controller('AutoridadeInserirAutoridadeController', AutoridadeInserirAutoridadeController);

    /* @ngInject */
    function AutoridadeInserirAutoridadeController($scope, $timeout,$log, $state, AlertsService){
    var vm = this;
    vm.title = "Incluir autoridade";

    vm.autoridade = {};
    vm.showBtnSalvar = showBtnSalvar;
    vm.salvar = salvar;
    vm.limpar = limpar;

    inicializar();
    ///////////////////////////////////
    function inicializar(){

    }
    function showBtnSalvar(){
      return $scope.formAutoridade.$invalid;
    }
    function salvar(){
        AlertsService.success('Registro incluído com sucesso.');
        $state.go('app.private.autoridade.inserir-autoridade', {}, {reload: true});
    }
    function limpar(){
        $state.go('app.private.autoridade.inserir-autoridade', {}, {reload: true});
    }

  }


})();
