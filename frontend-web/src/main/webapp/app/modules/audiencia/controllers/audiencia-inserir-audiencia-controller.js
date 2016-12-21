(function(){
    angular
        .module('sisagmApp.audiencia.controllers')
        .controller('AudienciaInserirAudienciaController', AudienciaInserirAudienciaController);

    /* @ngInject */
    function AudienciaInserirAudienciaController($scope, $mdDialog, $timeout, AlertsService, ConviteRestService){
        var vm = this;
        vm.procurarLocal = ConviteRestService.obterLocais;
        ///////////////////////////////////
        vm.title = "Pesquisar audiencia";
        vm.autoridade = "Ministro";
        vm.telaPesquisa = true;
        vm.tbResultado = false;
        vm.telaCadastro = false;
        vm.filtro = {
              remetente: '',
              selectedItem: '',
              validado: '',
              observacao: '',
              despacho: '',
              assunto: ''
        };
        vm.audiencia = {
              solicitante: '',
              dataCadastro: '',
              selectedItem: '',
              validado: '',
              assunto: '',
              observacao: '',
              assunto: ''
        };
        vm.limpar = function(){
          vm.filtro = {};
          vm.audiencia = {};
        }
        vm.backTlPesquisa = function(){
            vm.title = "Pesquisar audiência";
            vm.telaPesquisa = true;
            vm.telaCadastro = false;
            vm.tbResultado = false;
        }
        vm.salvar = function(){
            AlertsService.success('Registro incluído com sucesso.');
            vm.title = "Pesquisar audiência";
            vm.telaPesquisa = true;
            vm.telaCadastro = false;
            vm.tbResultado = false;

        }
        vm.pesquisar = function(){
          vm.tbResultado = true;
        }
        vm.cadastro = function(){
          vm.limpar();
          vm.title = "Incluir audiência";
          vm.tbResultado = false;
          vm.telaPesquisa = false;
          vm.telaCadastro = true;
        }
        vm.editar = function(item){
            vm.title = "Editar audiência";
            vm.audiencia.solicitante = item.solicitante;
            vm.audiencia.selectedItem = item.localEvento;
            vm.audiencia.validado = item.validado;
            vm.audiencia.despacho = item.despacho;
            vm.audiencia.observacao = item.observacao;
            vm.audiencia.assunto = item.assunto;
            vm.tbResultado = false;
            vm.telaPesquisa = false;
            vm.telaCadastro = true;

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
