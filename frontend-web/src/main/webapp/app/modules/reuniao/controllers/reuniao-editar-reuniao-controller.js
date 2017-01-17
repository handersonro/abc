(function(){
    angular
        .module('sisagmApp.reuniao.controllers')
        .controller('ReuniaoEditarReuniaoController', ReuniaoEditarReuniaoController);

    /* @ngInject */
    function ReuniaoEditarReuniaoController($scope, $timeout, $http, AlertsService, $stateParams, $state, ConviteRestService){
        var vm = this;
        vm.title = "Editar reunião";
        vm.autoridade = "Ministro";
        vm.reuniao = $stateParams.reuniao;

        vm.limpar = limpar;
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvar = salvar;
        vm.listaAutoridades = {};
        vm.procurarLocal = ConviteRestService.obterLocais;

        inicializar();
        ///////////////////////////////////
        function inicializar(){
            vm.reuniao.pessoas.forEach(function (pessoa) {
                EventoService.obterParticipanteExternoPorId(pessoa.id)
                    .success(function (data) {
                        vm.participantes.push(data);
                    });
            });
        }

        console.log(vm.reuniao);
        console.log(vm.participantes);

        function limpar(){
            vm.reuniao = {};
        }

        function salvar(){
          AlertsService.success('Registro alterado com sucesso.');
          $state.go('app.private.reuniao.pesquisar-reuniao');
        }

        function showBtnSalvar(){
          return $scope.formReuniao.$invalid;
        }
    }
})();
