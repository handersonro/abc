(function () {
    angular
        .module('sisagmApp.reuniao.controllers')
        .controller('ReuniaoInserirReuniaoController', ReuniaoInserirReuniaoController);

    /* @ngInject */
    function ReuniaoInserirReuniaoController($scope, $timeout, $mdSidenav, $log, $http, $mdDialog, $state, $q, AlertsService, ConviteRestService, ReuniaoService) {
        var vm = this;
        vm.title = "Incluir reunião";
        vm.autoridade = {noAutoridade: 'Ministro'};
        vm.reuniao = {};
        vm.validacoes = {};
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvar = salvar;
        vm.limpar = limpar;
        vm.listaAutoridades = {};
        vm.readonly = false;
        vm.selectedItem = null;
        vm.searchText = null;
        vm.querySearch = querySearch;
        vm.vegetables = loadVegetables();
        vm.usuarios = [];
        vm.numberChips = [];
        vm.numberChips2 = [];
        vm.listSistemas = [];
        vm.numberBuffer = '';
        vm.autocompleteDemoRequireMatch = true;
        vm.transformChip = transformChip;
        vm.procurarLocal = ConviteRestService.obterLocais;
        inicializar();
        ///////////////////////////////////
        function inicializar() {
            vm.reuniao.dtCadastro = new Date();
        }

        function showBtnSalvar() {
            return $scope.formReuniao.$invalid;
        }

        function salvar(reuniao) {
            if (vm.dataInicio > vm.dataFim) {
                return AlertsService.success($filter('translate')('A13.4'));
            }
            AlertsService.success('Registro incluído com sucesso.');
            $state.go('app.private.reuniao.inserir-reuniao', {}, {reload: true});
        }

        function limpar() {
            $state.go('app.private.reuniao.inserir-reuniao', {}, {reload: true});
        }

        function debounce(func, wait, context) {
            var timer;

            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function () {
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
            return debounce(function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }

        function buildToggler(navID) {
            return function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }
        }

        /*CHIP*/
        function transformChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }

            // Otherwise, create a new one
            return {name: chip, type: 'new'}
        }

        function querySearch (query) {
            var resolve = $q.defer();
            resolve.resolve(query ? vm.vegetables.filter(createFilterFor(query)) : []);
            return resolve.promise;
        }
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);


            return function filterFn(vegetable) {
                return (vegetable._lowername.indexOf(lowercaseQuery) === 0);
            };

        }

        function loadVegetables() {
            var veggies = [
                { 'name': 'Paulo Júnior de Jesus Peres'},
                { 'name': 'Júlio Nascimento'},
                { 'name': 'Amanda Amorim Neto'},
                { 'name': 'Bruno Azevedo Amaral'},
                { 'name': 'Camila Ribeiro'},
                { 'name': 'Danilo Cabaré'}

            ];

            return veggies.map(function (veg) {
                veg._lowername = veg.name.toLowerCase();
                return veg;
            });
        }

        /*CHIP*/
    }


})();
