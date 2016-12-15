(function(){
    angular
        .module('sisagmApp.login.controllers')
        .controller('PessoasInserirParticipanteController', PessoasInserirParticipanteController);

    /* @ngInject */
    function PessoasInserirParticipanteController($scope, $timeout, $mdSidenav, $log, $http, $mdDialog){
        var vm = this;
        ///////////////////////////////////
        $scope.title = "Pesquisar participante";
        $scope.routeName = 'routeName';
        $scope.tbResultado = false;
        $scope.telaCadastro = false;
        $scope.telaPesquisa = true;
        vm.filtro = {
              nome: '',
              cargo: '',
              email: ''
        };
        vm.participante = {
              nome: '',
              cargo: '',
              email: ''
        };
        vm.limpar = function(){
            vm.filtro ={};
            vm.participante ={};
        }
        $scope.pesquisar = function(){
            $scope.tbResultado = true;
        }
        $scope.editar = function(item){
            $scope.title = "Editar participante";
            console.log(item);
            vm.participante.nome= item.nome;
            vm.participante.cargo= item.cargo;
            vm.participante.email= item.email;
            
            $scope.tbResultado = false;
            $scope.telaPesquisa = false;
            $scope.telaCadastro = true;

        }
        $scope.visualizar = function(item){
            $scope.title = "Visualizar participante";
            $scope.nome= item.nome;
            $scope.cargo= item.cargo;
            $scope.email= item.email;
            $scope.tel = item.tel;
            $scope.tbResultado = false;
            $scope.telaPesquisa = false;
            $scope.telaCadastro = false;

        }
        $scope.cadastro = function(){
            $scope.title = "Incluir participante";
            $scope.tbResultado = false;
            $scope.telaPesquisa = false;
            $scope.telaCadastro = true;
            vm.limpar();
        }
        $scope.backTlPesquisa = function(){
            $scope.title = "Pesquisar participante";
            $scope.telaPesquisa = true;
            $scope.telaCadastro = false;

            $scope.tbResultado = false;

        }
        $scope.salvar = function(){
            $scope.title = "Pesquisar participante";
            $scope.telaPesquisa = true;
            $scope.telaCadastro = false;
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
