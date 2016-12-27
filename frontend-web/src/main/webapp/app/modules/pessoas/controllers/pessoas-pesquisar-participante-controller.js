(function(){
    angular
        .module('sisagmApp.pessoas.controllers')
        .controller('PessoasPesquisarParticipanteController', PessoasPesquisarParticipanteController);

    /* @ngInject */
    function PessoasPesquisarParticipanteController($scope, $timeout, $mdSidenav, $log, $http, $mdDialog, $state, AlertsService){
        var vm = this;
        vm.tbResultado = false;
        vm.editar = editar;
        vm.filtro = {};
        vm.title = "Pesquisar participante";

        ///////////////////////////////////

        vm.limpar = function(){
            vm.filtro ={};
        }
        vm.pesquisar = function(){
            vm.tbResultado = true;
        }
        function editar (participante){
            $state.go('app.private.pessoas.editar-participante', {participante: participante});
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
