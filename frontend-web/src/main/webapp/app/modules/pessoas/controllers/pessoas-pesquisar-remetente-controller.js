(function(){
    angular
        .module('sisagmApp.pessoas.controllers')
        .controller('PessoasPesquisarRemetenteController', PessoasPesquisarRemetenteController);

    /* @ngInject */
    function PessoasPesquisarRemetenteController($scope, $timeout, $mdSidenav, $log, $http, $mdDialog, AlertsService, $state){
        var vm = this;

        vm.limpar = limpar;
        vm.showSalvar = showSalvar;
        vm.pesquisar = pesquisar;
        vm.editar = editar;

        ///////////////////////////////////
        vm.title = "Pesquisar remetente";
        vm.tbResultado = false;
        vm.filtro = {
              nome: '',
              cargo: '',
              email: '',
              tel: ''
        };
        function limpar (){
            vm.filtro ={};
        }
        function pesquisar(){
            vm.tbResultado = true;
        }
        function editar (remetente){
            $state.go('app.private.pessoas.editar-remetente', {remetente: remetente});
        }

        function showSalvar(){
          return $scope.formRemetente.$invalid;
        }

        $scope.carregaLista = function(){
            $http
            .get('modules/pessoas/data/list-pessoas.json')
            .success (function(data){
                $scope.lista = data;
            })
            .error(function(){
                alert('Não fooi possivel carregar os dados')
            });
        };
        $scope.carregaLista();

        /*DIALOG*/
        $scope.showConfirm = function(ev) {
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
    }
})();
