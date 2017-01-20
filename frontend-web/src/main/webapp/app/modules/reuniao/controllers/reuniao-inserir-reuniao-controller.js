(function () {
    angular
        .module('sisagmApp.reuniao.controllers')
        .controller('ReuniaoInserirReuniaoController', ReuniaoInserirReuniaoController);

    /* @ngInject */
    function ReuniaoInserirReuniaoController($scope, $timeout, $mdSidenav, $log, $http, $mdDialog, $state, $q, AlertsService, ConviteRestService, ReuniaoService,EventoService) {
        var vm = this;
        vm.isEdit = false;
        vm.title = "Incluir reunião";
        vm.autoridade = {noAutoridade: 'Ministro'};
        vm.help = help;
        vm.reuniao = {};
        vm.validacoes = {};
        vm.participantes = [];
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvar = salvar;
        vm.limpar = limpar;
        vm.listaAutoridades = {};
        vm.readonly = false;
        vm.selectedItem = null;
        vm.searchText = null;
        vm.querySearch = querySearch;
        vm.usuarios = [];
        vm.numberChips = [];
        vm.eventoParticipantes = [];
        vm.numberChips2 = [];
        vm.numberBuffer = '';
        vm.autocompleteDemoRequireMatch = true;
        vm.transformChip = transformChip;
        vm.procurarLocal = EventoService.obterLocais;
        vm.removeParticipante = removeParticipante;
        inicializar();
        ///////////////////////////////////


        function inicializar() {
            vm.reuniao = {
                dtCadastro: new Date()
            };
        }



        function showBtnSalvar() {
            return $scope.formReuniao.$invalid;
        }

        function salvar(reuniao) {

        if (vm.reuniao.dtInicioEvento.getTime() > vm.reuniao.dtFimEvento.getTime()) {
            return AlertsService.success('O início do evento deve ser anterior ao término.');
        }


            // reuniao.idUf = vm.localidade.uf.id;
            // reuniao.nuRegiao = vm.localidade.uf.nuRegiao;
            // reuniao.noLocalEvento = vm.localidade.noLocalidade;
            // reuniao.idLocalidade = vm.localidade.id;
            reuniao.tipoEvento = {id: 3,noTipoEvento: 'REUNIAO'};
            reuniao.flEventoAtivo = true;
            reuniao.pessoas = [];

            reuniao.participanteInternos = vm.participantes;

            ConviteRestService.salvar(reuniao).then(
                function (retorno) {
                    console.log(reuniao + 'No salvar');
                    AlertsService.success('Registro incluído com sucesso.');
                    $state.go('app.private.reuniao.inserir-reuniao', {}, {reload: true});
                }
            );
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

        /**
         * Obterm as Participantes apartir do terceiro caracter pesquisado
         * */
        function querySearch (query) {
            var resolve = $q.defer();
                ReuniaoService.buscaParticipantePeloNome(query)
                    .success(function (data) {
                        resolve.resolve(data);
                    })
                    .error(function () {
                        retorno.reject(alert('Não foi possivel carregar os dados'));
                    });

            return resolve.promise;
        }

        function removeParticipante(chip) {
        }

        /*CHIP*/


        /*MODAL*/
        function help(ev) {
            $mdDialog.show({
                controller: ReuniaoInserirReuniaoController,
                templateUrl: '/modules/reuniao/help/modal-incluir-help.html',
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
