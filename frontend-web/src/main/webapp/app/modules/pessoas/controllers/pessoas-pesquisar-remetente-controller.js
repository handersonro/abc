(function(){
    angular
        .module('sisagmApp.pessoas.controllers')
        .controller('PessoasPesquisarRemetenteController', PessoasPesquisarRemetenteController);

    /* @ngInject */
    function PessoasPesquisarRemetenteController($scope, $timeout, $mdSidenav, $log, $http, $mdDialog, $state, $location, $anchorScroll, AlertsService, DTO){
        var vm = this;
        var _itens = [];
        vm.limpar = limpar;
        vm.showSalvar = showSalvar;
        vm.pesquisar = pesquisar;
        vm.editar = editar;
        vm.dto = new DTO();
        vm.changePage = changePage;
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
        function pesquisar (){
            vm.tbResultado = true;
            $location.hash('result-pesquisa');
            // call $anchorScroll()
            $anchorScroll();
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
                _itens = data;
                vm.dto.totalResults = data.length;
                vm.dto.list = _itens.slice(0, vm.dto.pageSize);
            })
            .error(function(){
                alert('Não fooi possivel carregar os dados');
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
        function changePage(page){
            console.log('aeaueauh', ((vm.dto.currentPage-1)*vm.dto.pageSize), vm.dto.pageSize*vm.dto.currentPage);
            vm.dto.currentPage = page;
            vm.dto.list = _itens.slice(((vm.dto.currentPage-1)*vm.dto.pageSize), vm.dto.pageSize*vm.dto.currentPage);
        }
        $scope.changePage = changePage;
    }
})();
