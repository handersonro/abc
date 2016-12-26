(function(){
    angular
        .module('sisagmApp.pessoas.controllers')
        .controller('PessoasEditarRemetenteController', PessoasEditarRemetenteController);

    /* @ngInject */
    function PessoasEditarRemetenteController($scope, $timeout, $http, AlertsService, $stateParams, $state){
        var vm = this;
        vm.title = "Editar remetente";
        vm.remetente = $stateParams.remetente;

        vm.limpar = limpar;
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvar = salvar;


        ///////////////////////////////////

        function limpar(){
            vm.remetente ={};
        }

        function salvar(){
          AlertsService.success('Registro alterado com sucesso.');
          $state.go('app.private.pessoas.pesquisar-remetente');
        }

        function showBtnSalvar(){
          return $scope.formRemetente.$invalid;
        }



    }
})();
