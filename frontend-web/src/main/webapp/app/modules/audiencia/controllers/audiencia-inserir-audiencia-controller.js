(function(){
    angular
        .module('sisagmApp.audiencia.controllers')
        .controller('AudienciaInserirAudienciaController', AudienciaInserirAudienciaController);

    /* @ngInject */
    function AudienciaInserirAudienciaController($scope, $mdDialog, $timeout, AlertsService, ConviteRestService, $filter, $q, UsuarioRestService){
        var vm = this;
        vm.readonly = false;
        vm.selectedItem = null;
        vm.searchText = null;
        vm.buscaParticipanteExterno = buscaParticipanteExterno;
        vm.participantes = [];
        vm.numberChips = [];
        vm.numberChips2 = [];
        vm.listSistemas = [];
        vm.numberBuffer = '';
        vm.autocompleteDemoRequireMatch = true;
        vm.transformChip = transformChip;
        vm.buscarRemetentePeloNome = buscarRemetentePeloNome;

        vm.procurarLocal = ConviteRestService.obterLocais;

        vm.title = "Incluir audiência";
        vm.autoridade = {noAutoridade : 'Ministro'};
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvar = salvar;
        vm.listaAutoridades = {};
        vm.audiencia = {};
        inicializar();
        function inicializar(){
            vm.audiencia = {
                dtCadastro: new Date()
            };
            if(vm.dataInicio > vm.dataFim){
                return AlertsService.success($filter('translate')('A13.4'));
            }
        }
        ///////////////////////////////////

        vm.limpar = function(){
            vm.audiencia = {};
        }

        function showBtnSalvar(){
            return $scope.formAudiencia.$invalid;
        }
        function salvar(audiencia){

            if(vm.audiencia.dataInicio > vm.audiencia.dataFim){
                return AlertsService.success($filter('translate')('A13.4'));
            }

            audiencia.tipoEvento = {id: 1,noTipoEvento: 'AUDIENCIA'};
            audiencia.idUf = audiencia.localidade.uf.id;
            audiencia.nuRegiao = audiencia.localidade.uf.nuRegiao;
            audiencia.noLocalEvento = audiencia.localidade.noLocalidade;
            audiencia.idLocalidade = audiencia.localidade.id;
            audiencia.flEventoAtivo = true;
            audiencia.flEventoInternacional = false;
            audiencia.idPais = 1;
            audiencia.remetente = vm.remetente;
            pessoas = [];

            vm.participantes.forEach(function (usuario) {
                pessoas.push(usuario.pessoa);
            });

            audiencia.pessoas = pessoas;

            ConviteRestService.salvar(audiencia).then(
                function (retorno) {
                    AlertsService.success('Registro incluído com sucesso.');
                    $state.go('app.private.audiencia.inserir-audiencia', {}, {reload: true});
                }
            );
        }

        /*DIALOG*/
        vm.showConfirm = function(ev) {
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
        /*CHIP*/
        function transformChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }

            // Otherwise, create a new one
            return { name: chip, type: 'new' }
        }
        function buscaParticipanteExterno (noParticipante) {
            var retorno = $q.defer();

            UsuarioRestService.obterParticipanteExterno(noParticipante)
                .success(function (data) {
                    retorno.resolve(data);
                })
                .error(function () {
                    retorno.reject(alert('Não foi possível carregar os dados'));
                });

            return retorno.promise;
        }
        /*CHIPS*/

        function buscarRemetentePeloNome(noUsuario) {
            var retorno = $q.defer();
            UsuarioRestService.obterRemetentesPeloNome(noUsuario)
                .success(function (data) {
                    retorno.resolve(data);
                })
                .error(function () {
                    retorno.reject(alert('Não foi possivel carregar os dados'));
                });
            return retorno.promise;
        }
    }
})();