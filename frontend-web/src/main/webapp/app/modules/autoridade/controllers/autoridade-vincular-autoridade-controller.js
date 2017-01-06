(function(){
    angular
        .module('sisagmApp.autoridade.controllers')
        .controller('AutoridadeVincularAutoridadeController', AutoridadeVincularAutoridadeController);

    /* @ngInject */
    function AutoridadeVincularAutoridadeController($scope, $timeout,$log, $q,$state, UsuarioRestService, AlertsService){
    var vm = this;

    vm.listAutoridades = {};

    vm.title = "Vincular autoridade";
    vm.autoridade = {};
    vm.showBtnSalvar = showBtnSalvar;
    vm.salvar = salvar;
    vm.limpar = limpar;
    vm.procurarUsuario = UsuarioRestService.obterUsuarios;
    inicializar();
    ///////////////////////////////////
    function inicializar(){
        vm.listAutoridades = [
            {
                autoridade: 'Ministro do Turismo'
            },
            {
                autoridade: 'Secretário Executivo',
            },
            {
                autoridade: 'Ministro Nacional de Estruturação do Turismo',
            },
            {
                autoridade: 'Secretário Nacional de Qualificação e Promoção do Turismo'
            }
        ];
    }
    function showBtnSalvar(){
      return $scope.formVincularAutoridade.$invalid;
    }
    function salvar(){
        AlertsService.success('Registro incluído com sucesso.');
        $state.go('app.private.autoridade.vincular-autoridade', {}, {reload: true});
    }
    function limpar(){
        $state.go('app.private.autoridade.vincular-autoridade', {}, {reload: true});
    }

  }


})();
