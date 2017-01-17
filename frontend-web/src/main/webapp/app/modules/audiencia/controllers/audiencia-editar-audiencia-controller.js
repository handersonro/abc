(function(){
    angular
        .module('sisagmApp.audiencia.controllers')
        .controller('AudienciaEditarAudienciaController', AudienciaEditarAudienciaController);

    /* @ngInject */
    function AudienciaEditarAudienciaController($scope, $mdDialog, $timeout, $stateParams, $q, $state, AlertsService, EventoService){
        var vm = this;
        vm.isEdicao = true;
        vm.buscaParticipanteExterno = buscaParticipanteExterno;
        vm.title = "Editar audiência";
        vm.audiencia = $stateParams.audiencia;

        vm.remetente =  vm.audiencia.remetente;
        vm.participantes = [];

        vm.autoridade = {noAutoridade : 'Ministro'};
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvar = salvar;
        vm.listaAutoridades = {};
        vm.pessoasParaSeremRemovidas = [];
        vm.removeParticipante = removeParticipante;
        vm.procurarLocal = EventoService.obterLocais;
        inicializar();
        function inicializar(){
            if(vm.dataInicio > vm.dataFim){
                return AlertsService.success($filter('translate')('A13.4'));
            }
            EventoService.obterLocalidadePeloId(vm.audiencia.idLocalidade)
                .success(function (data) {
                    vm.localidade = data;
                });

            vm.audiencia.pessoas.forEach(function (pessoa) {
                EventoService.obterParticipanteExternoPorIdPessoa(pessoa.id)
                    .success(function (data) {
                        vm.participantes.push(data);
                    });
            });
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
            audiencia.idUf = vm.localidade.uf.id;
            audiencia.nuRegiao = vm.localidade.uf.nuRegiao;
            audiencia.noLocalEvento = vm.localidade.noLocalidade;
            audiencia.idLocalidade = vm.localidade.id;
            audiencia.remetente = vm.remetente;
            audiencia.pessoasParaSeremRemovidas = vm.pessoasParaSeremRemovidas;

            var pessoas = [];

            vm.participantes.forEach(function (usuario) {
                pessoas.push(usuario.pessoa);
            });

            audiencia.pessoas = pessoas;

            console.log(audiencia);

            EventoService.editar(audiencia).then(
                function (retorno) {
                    AlertsService.success('Registro alterado com sucesso.');
                    $state.go('app.private.audiencia.pesquisar-audiencia');
                }
            );

        }

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

        function buscaParticipanteExterno (noParticipante) {
            var retorno = $q.defer();

            EventoService.obterParticipanteExterno(noParticipante)
                .success(function (data) {
                    retorno.resolve(data);
                })
                .error(function () {
                    retorno.reject(alert('Não foi possível carregar os dados'));
                });

            return retorno.promise;
        }

        function removeParticipante(chip) {
            vm.pessoasParaSeremRemovidas.push(chip.pessoa);
        }
        /*DIALOG*/
    }
})();
