(function () {
    angular
        .module('sisagmApp.convite.controllers')
        .controller('ConviteInserirConviteController', ConviteInserirConviteController);

    /* @ngInject */
    function ConviteInserirConviteController($scope, $timeout, $mdSidenav, $log, $http, $mdDialog, $state, AlertsService, ConviteRestService,EventoService,Principal) {
        var vm = this;
        vm.title = "Incluir convite";
        Principal.identity().then(function(account) {
            vm.autoridade  = account.userAutenticado.autoridade.noAutoridade;
        });
        vm.convite = {};
        vm.validacoes = {};
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvar = salvar;
        vm.limpar = limpar;
        vm.help = help;
        vm.tipoEvento = {};


        vm.procurarLocal = ConviteRestService.obterLocais;
        vm.procurarRemetente = ConviteRestService.obterRemetentes;
        vm.procurarPaises = ConviteRestService.obterPaises;
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
                idPais: '',
                idUf: '',
                noCidadeInternacional: '',
                idLocalidade: '',
                noObservacao: '',
                noDespacho: ''
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

            var tipoEvento = {id: 2,noTipoEvento: 'CONVITE'};

            if (vm.convite.dtInicioEvento.getTime() > vm.convite.dtFimEvento.getTime()) {
                 return AlertsService.success('O início do evento deve ser anterior ao término.');
            }

            vm.convite.tipoEvento = tipoEvento;
            vm.convite.noLocalEvento = vm.convite.idLocalidade.localidadesUf;
            vm.convite.idLocalidade = vm.convite.idLocalidade.id;

            vm.convite.flEventoAtivo = true;
            if(vm.convite.flEventoInternacional =='Evento nacional'){
                vm.convite.flEventoInternacional = 0;
                vm.convite.idPais = 1;
            }else if(vm.convite.flEventoInternacional =='Evento internacional'){
                vm.convite.flEventoInternacional = 1;
                vm.convite.noLocalEvento = vm.convite.idPais.noPais;
                vm.convite.idPais = vm.convite.idPais.id;
            }
            ConviteRestService.salvar(vm.convite).then(
                function (retorno) {
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
         * Obterm os paises da base do
         * */
        function obterPaises(noPais) {
            var retorno = $q.defer();
            $http.get('evento/paises?noPais=' + noPais)
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

        /*MODAL*/
        function help(ev) {
            $mdDialog.show({
                controller: ConviteInserirConviteController,
                templateUrl: 'modules/convite/help/modal-incluir-help.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        };
        $scope.close = function() {
            $mdDialog.cancel();
        };
        /*MODAL*/

    }


})();
