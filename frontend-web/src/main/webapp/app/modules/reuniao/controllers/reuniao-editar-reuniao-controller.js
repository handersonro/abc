(function(){
    angular
        .module('sisagmApp.reuniao.controllers')
        .controller('ReuniaoEditarReuniaoController', ReuniaoEditarReuniaoController);

    /* @ngInject */
    function ReuniaoEditarReuniaoController($scope, $timeout, $http, AlertsService, $stateParams, $state, ConviteRestService, EventoService){
        var vm = this;
        vm.title = "Editar reunião";
        vm.autoridade = "Ministro";
        vm.reuniao = $stateParams.reuniao;

        //caso seja recarregado a tela no editar o $stateParams.reuniao retorna vazio e quebra a tela
        //redireiona a tela para o pesquisar novamente
        if(vm.reuniao == null){
            $state.go('app.private.reuniao.pesquisar-reuniao');
        }

        vm.limpar = limpar;
        vm.showBtnSalvar = showBtnSalvar;
        vm.buscaParticipanteExterno = buscaParticipanteExterno;
        vm.salvar = salvar;
        vm.listaAutoridades = {};
        vm.procurarLocal = ConviteRestService.obterLocais;
        vm.removeParticipante = removeParticipante;
        vm.pessoasParaSeremRemovidas = [];
        vm.participantes = [];
        inicializar();
        ///////////////////////////////////
        function inicializar(){
             vm.reuniao.pessoas.forEach(function (pessoa) {
                 EventoService.obterParticipanteInternoPorId(pessoa.id)
                     .success(function (data) {
                         vm.participantes.push(data);
                     });
             });

        }

        function limpar(){
            vm.reuniao = {};
        }

        function salvar(reuniao){
             var tipoEvento = {id: 3,noTipoEvento: 'REUNIAO'};

            reuniao.tipoEvento = tipoEvento;

            var pessoas = [];
            vm.participantes.forEach(function (usuario) {
                pessoas.push(usuario.pessoa);
            });

            reuniao.pessoas = pessoas;
            reuniao.pessoasParaSeremRemovidas = vm.pessoasParaSeremRemovidas;

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
            vm.pessoasParaSeremRemovidas.push(chip.pessoa);
        }
    }
})();
