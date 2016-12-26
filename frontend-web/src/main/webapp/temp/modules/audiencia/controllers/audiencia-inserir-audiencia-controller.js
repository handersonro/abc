(function(){
    AudienciaInserirAudienciaController.$inject = ["$scope", "$mdDialog", "$timeout", "AlertsService", "ConviteRestService", "$filter", "UsuarioRestService"];
    angular
        .module('sisagmApp.audiencia.controllers')
        .controller('AudienciaInserirAudienciaController', AudienciaInserirAudienciaController);

    /* @ngInject */
    function AudienciaInserirAudienciaController($scope, $mdDialog, $timeout, AlertsService, ConviteRestService, $filter, UsuarioRestService){
        var vm = this;
        vm.procurarLocal = ConviteRestService.obterLocais;
        vm.procurarUsuario = UsuarioRestService.obterUsuarios;
        vm.title = "Incluir audiencia";
        vm.autoridade = "Ministro";
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvar = salvar;
        vm.listaAutoridades = {};
        vm.audiencia = {};
        inicializar();
        function inicializar(){
            if(vm.dataInicio > vm.dataFim){
                return AlertsService.success($filter('translate')('A13.4'));
            }
            vm.listaAutoridades = [
                {autoridade: "Ministro do turismo"},
                {autoridade: "Secretário executivo"},
                {autoridade: "Secretário Nacional de Estruturação do Turismo"},
                {autoridade: "Secretário Nacional de Qualificação e Promoção do Turismo"}
            ];

        }
        ///////////////////////////////////

        vm.limpar = function(){
          vm.audiencia = {};
        }

        function showBtnSalvar(){
          return $scope.formAudiencia.$invalid;
        }
        function salvar(){
            if(vm.audiencia.dataInicio > vm.audiencia.dataFim){
                return AlertsService.success($filter('translate')('A13.4'));
            }

            AlertsService.success('Registro incluído com sucesso.');
            $state.go('app.private.audiencia.inserir-audiencia', {}, {reload: true});
        }

        vm.carregarListConvite = function(){

             ConviteRestService
                 .obterListaConvite({})
                 .then(
                     function(data){
                         $scope.listaConvites = data;
                     },
                     function(error){

                     }
                 );
        };
        vm.carregarListConvite();
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
        /*DIALOG*/
        vm.showConfirm = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
              .title('Atenção')
              .textContent('Tem certeza que deseja remover esse registro?')
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Sim')
              .cancel('Não');

            $mdDialog.show(confirm).then(function() {
              $scope.status = 'You decided to get rid of your debt.';
            }, function() {
              $scope.status = 'You decided to keep your debt.';
            });
        };
        /*DIALOG*/
    }
})();
