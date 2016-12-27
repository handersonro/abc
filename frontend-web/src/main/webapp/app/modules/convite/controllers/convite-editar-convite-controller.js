(function(){
    angular
        .module('sisagmApp.convite.controllers')
        .controller('ConviteEditarConviteController', ConviteEditarConviteController);

    /* @ngInject */
    function ConviteEditarConviteController($scope, $timeout, $http, AlertsService, $stateParams, $state, ConviteRestService){
        var vm = this;
        vm.title = "Editar convite";
        vm.autoridade = "Ministro";
        vm.convite = $stateParams.convite;

        vm.limpar = limpar;
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvar = salvar;
        vm.validacoes = {};
        vm.procurarLocal = ConviteRestService.obterLocais;

        inicializar();
        ///////////////////////////////////
        function inicializar(){

            vm.validacoes=[
              {validado : 'Sim'},
              {validado : 'Não'},
              {validado : 'Indiferente'}
            ];
        }

        function limpar(){
            vm.convite = {};
        }

        function salvar(){
          AlertsService.success('Registro alterado com sucesso.');
          $state.go('app.private.convite.pesquisar-convite');
        }

        function showBtnSalvar(){
          return $scope.formConvite.$invalid;
        }



    }
})();
