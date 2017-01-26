(function(){
    angular
        .module('sisagmApp.audiencia.controllers')
        .controller('AudienciaPesquisarAudienciaController', AudienciaPesquisarAudienciaController);

    /* @ngInject */
    function AudienciaPesquisarAudienciaController($scope, $mdDialog, $http, $timeout, AlertsService, $filter, $location, $anchorScroll, $state, ConviteRestService, UsuarioRestService, DTO){
        var vm = this;
        var _itens = [];
        vm.dto = new DTO();
        vm.procurarLocal = ConviteRestService.obterLocais;
        vm.procurarUsuario = UsuarioRestService.obterUsuarios;
        vm.title = "Pesquisar audiencia";
        vm.tbResultado = false;
        vm.validacoes = {};
        vm.autoridade = "Ministro";
        vm.pesquisar = pesquisar;
        vm.editar = editar;
        vm.listaAutoridades = {};
        vm.filtro = {};
        inicializar();
        function inicializar(){
            vm.listaAutoridades = [
                {autoridade: "Ministro do turismo"},
                {autoridade: "Secretário executivo"},
                {autoridade: "Secretário Nacional de Estruturação do Turismo"},
                {autoridade: "Secretário Nacional de Qualificação e Promoção do Turismo"}
            ];
            vm.validacoes=[
              {validado : 'Sim'},
              {validado : 'Não'},
              {validado : 'Indiferente'}
            ];

        }
        ///////////////////////////////////

        vm.limpar = function(){
          vm.filtro = {};
        }
        function editar (audiencia){
            $state.go('app.private.audiencia.editar-audiencia', {audiencia: audiencia});
        }
        function pesquisar (){
            vm.tbResultado = true;
            $location.hash('result-pesquisa');
            // call $anchorScroll()
            $anchorScroll();
        }
        vm.carregarListConvite = function(){
            $http
            .get('modules/convite/data/list-convite.json')
            .success (function(data){
                _itens = data;
                vm.dto.totalResults = data.length;
                vm.dto.list = _itens.slice(0, vm.dto.pageSize);
            })
            .error(function(){
                alert('Não fooi possivel carregar os dados');
            });
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
              .ok('Ok')
              .cancel('Cancelar');

            $mdDialog.show(confirm).then(function() {
              $scope.status = 'You decided to get rid of your debt.';
            }, function() {
              $scope.status = 'You decided to keep your debt.';
            });
        };
        /*DIALOG*/
        function changePage(page){
            vm.dto.currentPage = page;
            vm.dto.list = _itens.slice(((vm.dto.currentPage-1)*vm.dto.pageSize), vm.dto.pageSize*vm.dto.currentPage);
        }
        $scope.changePage = changePage;
    }
})();
