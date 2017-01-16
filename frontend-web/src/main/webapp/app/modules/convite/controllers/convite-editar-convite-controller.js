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


        if(vm.convite.flEventoInternacional == false){
            $scope.flEventoInternacional = vm.convite.flEventoInternacional = 'Evento nacional';
        }

        if(vm.convite.flEventoInternacional == true){
            $scope.flEventoInternacional = vm.convite.flEventoInternacional = 'Evento internacional';
        }


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

        function salvar(convite){

            ConviteRestService.editar(convite).then(
                function (retorno) {
                    AlertsService.success('Registro alterado com sucesso.');
                    $state.go('app.private.pessoas.pesquisar-remetente');
                }
            );
        }

        function showBtnSalvar(){
          return $scope.formConvite.$invalid;
        }

    }
})();
