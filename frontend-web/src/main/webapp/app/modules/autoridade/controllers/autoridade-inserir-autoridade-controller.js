(function(){
    angular
        .module('sisagmApp.autoridade.controllers')
        .controller('AutoridadeInserirAutoridadeController', AutoridadeInserirAutoridadeController);

    /* @ngInject */
    function AutoridadeInserirAutoridadeController($scope, $timeout,$log, $mdDialog, $state, AlertsService, AutoridadeService){
    var vm = this;
    vm.title = "Incluir autoridade";

    vm.autoridade = {};
    vm.showBtnSalvar = showBtnSalvar;
    vm.salvar = salvar;
    vm.limpar = limpar;
    vm.help = help;

    inicializar();
    ///////////////////////////////////
    function inicializar(){

    }
    function showBtnSalvar(){
      return $scope.formAutoridade.$invalid;
    }
    function salvar(autoridade){

        AutoridadeService.salvar(autoridade).then(
            function (retorno) {
                AlertsService.success('Registro incluído com sucesso.');
                $state.go('app.private.autoridade.inserir-autoridade', {}, {reload: true});
            }
        );
    }
    function limpar(){
        $state.go('app.private.autoridade.inserir-autoridade', {}, {reload: true});
    }

        /*MODAL*/
        function help(ev) {
            $mdDialog.show({
                controller: AutoridadeInserirAutoridadeController,
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
