(function(){
    angular
        .module('sisagmApp.autoridade.controllers')
        .controller('AutoridadeEditarAutoridadeController', AutoridadeEditarAutoridadeController);

    /* @ngInject */
    function AutoridadeEditarAutoridadeController($scope, $timeout, $http, AlertsService, $stateParams, $state,AutoridadeService){
        var vm = this;
        vm.title = "Editar autoridade";
        vm.autoridade = $stateParams.autoridade;

        vm.limpar = limpar;
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvar = salvar;

        inicializar();
        ///////////////////////////////////
        function inicializar(){

        }

        function limpar(){
            vm.autoridade = {};
        }

        function salvar(autoridade){
            AutoridadeService.editar(autoridade).then(
                function (retorno) {
                    AlertsService.success('Registro alterado com sucesso.');
                    $state.go('app.private.autoridade.pesquisar-autoridade');
                }
            );
        }

        function showBtnSalvar(){
          return $scope.formAutoridade.$invalid;
        }
    }
})();
