(function(){
    angular
        .module('sisagmApp.pessoas.controllers')
        .controller('PessoasEditarRemetenteController', PessoasEditarRemetenteController);

    /* @ngInject */
    function PessoasEditarRemetenteController($scope, $timeout, $http, AlertsService, $stateParams, $state, RemetenteService){
        var vm = this;
        vm.isEdicao = true;
        vm.title = "Editar remetente";
        vm.remetente = $stateParams.remetente;

        if(vm.remetente == null){
            $state.go('app.private.pessoas.pesquisar-remetente');
        }

        vm.limpar = limpar;
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvar = salvar;


        ///////////////////////////////////

        function limpar(){
            vm.remetente.noRemetente = '';
            vm.remetente.noEmail = '';
            vm.remetente.noCargo = '';
            vm.remetente.nuTelefone = '';
        }

        function salvar(remetente){

            remetente.nuTelefone = remetente.nuTelefone.replace(/[^0-9]/g,'');

            RemetenteService.editar(remetente).then(
                function (retorno) {
                    AlertsService.success('Registro alterado com sucesso.');
                    $state.go('app.private.pessoas.pesquisar-remetente');
                }
            );
        }

        function showBtnSalvar(){
          return $scope.formRemetente.$invalid;
        }



    }
})();
