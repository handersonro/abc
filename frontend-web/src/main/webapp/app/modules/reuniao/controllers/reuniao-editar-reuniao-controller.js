(function(){
    angular
        .module('sisagmApp.reuniao.controllers')
        .controller('ReuniaoEditarReuniaoController', ReuniaoEditarReuniaoController);

    /* @ngInject */
    function ReuniaoEditarReuniaoController($scope, $timeout, $http, AlertsService, $mdDialog, $stateParams, $state, $q,ConviteRestService, EventoService, ReuniaoService){
        var vm = this;
        vm.title = "Editar reunião";
        vm.autoridade = "Ministro";
        vm.reuniao = $stateParams.reuniao;
        vm.help = help;
        vm.isEdit = true;

        //caso seja recarregado a tela no editar o $stateParams.reuniao retorna vazio e quebra a tela
        //redireiona a tela para o pesquisar novamente
        if(vm.reuniao == null){
            $state.go('app.private.reuniao.pesquisar-reuniao');
        }

        vm.limpar = limpar;
        vm.showBtnSalvar = showBtnSalvar;
        vm.buscaParticipanteExterno = buscaParticipanteExterno;
        vm.salvar = salvar;
        vm.querySearch = querySearch;
        vm.listaAutoridades = {};
        vm.procurarLocal = ConviteRestService.obterLocais;
        vm.removeParticipante = removeParticipante;
        vm.pessoasParaSeremRemovidas = [];
        vm.participantes = [];
        inicializar();
        ///////////////////////////////////
        function inicializar(){
            vm.reuniao.dtInicioEvento  = new Date(vm.reuniao.dtInicioEvento);
            vm.reuniao.dtFimEvento  = new Date(vm.reuniao.dtFimEvento);

             vm.reuniao.pessoas.forEach(function (pessoa) {
                 EventoService.obterParticipanteInternoPorId(pessoa.id)
                     .success(function (data) {
                         vm.participantes.push(data);
                     });
             });

            EventoService.obterLocalidadePeloId(vm.reuniao.idLocalidade)
                .success(function (data) {
                    vm.localidade = data;
                });

        }

        function limpar(){
            vm.reuniao = {};
        }

        function salvar(reuniao){
            if (vm.reuniao.dtInicioEvento.getTime() > vm.reuniao.dtFimEvento.getTime()) {
                return AlertsService.success('O início do evento deve ser anterior ao término.');
            }

            reuniao.tipoEvento = {id: 3,noTipoEvento: 'REUNIAO'};
/*            reuniao.idUf = vm.localidade.uf.id;
            reuniao.nuRegiao = vm.localidade.uf.nuRegiao;
            reuniao.noLocalEvento = vm.localidade.noLocalidade;
            reuniao.idLocalidade = vm.localidade.id;*/

            reuniao.pessoasParaSeremRemovidas = vm.pessoasParaSeremRemovidas;
            reuniao.participanteInternos = vm.participantes;
            reuniao.pessoas = [];

            EventoService.editar(reuniao).then(
                function (retorno) {
                    AlertsService.success('Registro alterado com sucesso.');
                    $state.go('app.private.reuniao.pesquisar-reuniao');
                }
            );
        }

        function showBtnSalvar(){
          return $scope.formReuniao.$invalid;
        }

        function querySearch (query) {
            var resolve = $q.defer();
            ReuniaoService.buscaParticipantePeloNome(query)
                .success(function (data) {
                    resolve.resolve(data);
                })
                .error(function () {
                    resolve.reject(alert('Não foi possivel carregar os dados'));
                });

            return resolve.promise;
        }

        function buscaParticipanteExterno (noParticipante) {
            var retorno = $q.defer();

            EventoService.buscarPorNome(noParticipante)
                .success(function (data) {
                    retorno.resolve(data);
                })
                .error(function () {
                    retorno.reject(alert('Não foi possível carregar os dados'));
                });

            return retorno.promise;
        }

        function removeParticipante(chip) {
            if (chip.pessoa != undefined){
                vm.pessoasParaSeremRemovidas.push(chip.pessoa);
            }
        }

        /*MODAL*/
        function help(ev) {
            $mdDialog.show({
                controller: ReuniaoEditarReuniaoController,
                templateUrl: '/modules/reuniao/help/modal-editar-help.html',
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
