(function () {
    angular
        .module('sisagmApp.convite.controllers')
        .controller('ConviteInserirConviteController', ConviteInserirConviteController);

    /* @ngInject */
    function ConviteInserirConviteController($scope, $timeout, $mdSidenav, $log, $http, $mdDialog, $state, AlertsService, ConviteRestService) {
        var vm = this;
        vm.title = "Incluir convite";
        vm.autoridade = 'Ministro';
        vm.convite = {};
        vm.validacoes = {};
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvar = salvar;
        vm.limpar = limpar;
        vm.tipoEvento = {};


        vm.procurarLocal = ConviteRestService.obterLocais;
        vm.procurarRemetente = ConviteRestService.obterRemetentes;
        inicializar();
        ///////////////////////////////////
        function inicializar() {
            vm.convite = {
                dtInicioEvento: '',
                dtFimEvento: '',
                dtCadastro: new Date(),
                remetente: '',
                descricao: '',
                tipoEvento: '',
                flEventoInternacional: '',
                pais: '',
                cidade: '',
                idLocalidade: '',
                observacao: '',
                despacho: ''
            };
            vm.validacoes = [
                {validado: 'Sim'},
                {validado: 'Não'},
                {validado: 'Indiferente'}
            ];

        }

        function showBtnSalvar() {
            return $scope.formConvite.$invalid;
        }

        function salvar(convite) {
            console.log(vm.convite);
            var tipoEvento = {id: 2};
            if (convite.dataInicioEvento > convite.dataFimEvento) {
                return AlertsService.success($filter('translate')('A13.4'));
            }

            vm.convite.tipoEvento = tipoEvento;
            if(vm.convite.flEventoInternacional =='Evento nacional'){
                vm.convite.flEventoInternacional = false;
            }else{
                vm.convite.flEventoInternacional = true;
            }
            ConviteRestService.salvar(convite).then(
                function (retorno) {
                    console.log(convite + 'No salvar');
                    AlertsService.success('Registro incluído com sucesso.');
                    $state.go('app.private.convite.inserir-convite', {}, {reload: true});
                }
            );

        }

        /**
         * Obterm as localiades apartir do terceiro caracter pesquisado
         * */
        function obterLocais(localEvento) {
            var retorno = $q.defer();
            $http.get('evento/localidades?noLocalidade=' + localEvento)
                .success(function (data) {
                    retorno.resolve(data);
                })
                .error(function () {
                    retorno.reject(alert('Não fooi possivel carregar os dados'));
                });
            return retorno.promise;
        }

        /**
         * Obterm as localiades apartir do terceiro caracter pesquisado
         * */
        function obterRemetentes(remetente) {
            var retorno = $q.defer();
            $http.get('evento/remetentes?noRemetente=' + remetente)
                .success(function (data) {
                    retorno.resolve(data);
                })
                .error(function () {
                    retorno.reject(alert('Não fooi possivel carregar os dados'));
                });
            return retorno.promise;
        }


        function limpar() {
            $state.go('app.private.convite.inserir-convite', {}, {reload: true});
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

         function obterLocais(estado) {
             var promiseLoadMoreData = ConviteRestService.obterLocais(estado);

             promiseLoadMoreData.then(function(data) {
                 vm.procurarLocal = data.list;
                 $anchorScroll();
             });

             return promiseLoadMoreData;
         }

    }


})();
