(function(){
    angular
        .module('sisagmApp.autoridade.controllers')
        .controller('AutoridadeEditarAutoridadeController', AutoridadeEditarAutoridadeController);

    /* @ngInject */
    function AutoridadeEditarAutoridadeController($scope, $timeout, $http, $mdDialog, AlertsService, $stateParams, $state,AutoridadeService){
        var vm = this;
        vm.isEdicao = true;
        vm.title = "Editar autoridade";
        vm.autoridade = $stateParams.autoridade;

        vm.limpar = limpar;
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvar = salvar;
        vm.help = help;

        inicializar();
        ///////////////////////////////////
        function inicializar(){

        }

        function limpar(){
            vm.autoridade.noAutoridade = null;
            vm.autoridade.noEmail = null;
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

        /*MODAL*/
        function help(ev) {
            $mdDialog.show({
                controller: AutoridadeEditarAutoridadeController,
                templateUrl: '/modules/autoridade/help/modal-help.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        };
        $scope.close = function() {
            $mdDialog.cancel();
        };
        /*MODAL*/
    }
})();
