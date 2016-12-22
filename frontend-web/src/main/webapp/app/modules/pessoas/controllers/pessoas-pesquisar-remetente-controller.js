(function(){
    angular
        .module('sisagmApp.pessoas.controllers')
        .controller('PessoasPesquisarRemetenteController', PessoasPesquisarRemetenteController);

    /* @ngInject */
    function PessoasPesquisarRemetenteController($scope, $timeout, $mdSidenav, $log, $http, $mdDialog, AlertsService){
        var vm = this;
        ///////////////////////////////////
        $scope.title = "Pesquisar remetente";
        $scope.tbResultado = false;
        vm.filtro = {
              nome: '',
              cargo: '',
              email: '',
              tel: ''
        };
        vm.limpar = function(){
            vm.filtro ={};
        }
        $scope.pesquisar = function(){
            $scope.tbResultado = true;
        }
        $scope.editar = function(){
            /*
            vm.remetente.nome = item.nome;
            vm.remetente.cargo= item.cargo;
            vm.remetente.email= item.email;
            vm.remetente.tel = item.tel;
            */
        }

        $scope.backTlPesquisa = function(){
            $scope.title = "Pesquisar remetente";
            $scope.telaPesquisa = true;
            $scope.telaCadastro = false;
            $scope.telaVisualizacao = false;
            $scope.tbResultado = false;

        }

        vm.showSalvar = showSalvar;
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
            .ok('Sim')
            .cancel('Não');

            $mdDialog.show(confirm).then(function() {
                $scope.status = 'You decided to get rid of your debt.';
            }, function() {
                $scope.status = 'You decided to keep your debt.';
            });
        };
        /*DIALOG*/

        /**
        * Supplies a function that will continue to operate until the
        * time is up.
        */
        $scope.toggleLeft = buildDelayedToggler('left');
        $scope.toggleRight = buildToggler('right');
        $scope.isOpenRight = function(){
            return $mdSidenav('right').isOpen();
        };

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

        /**
        * Build handler to open/close a SideNav; when animation finishes
        * report completion in console
        */
        function buildDelayedToggler(navID) {
            return debounce(function() {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
            }, 200);
        }

        function buildToggler(navID) {
            return function() {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
            }
        }
    }
})();
