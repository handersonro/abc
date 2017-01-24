(function(){
    angular
        .module('sisagmApp.reuniao.controllers')
        .controller('ReuniaoEmitirReuniaoController', ReuniaoEmitirReuniaoController);

    /* @ngInject */
    function ReuniaoEmitirReuniaoController($scope, $timeout, $http, AlertsService, $mdDialog, $stateParams, $state, $q, ReuniaoService,EventoService){
        var vm = this;

        vm.reuniao = $state.current.reuniao;
        vm.participantes = [];
        console.log("Aqui",vm.reuniao.id);
        inicializar();
        ///////////////////////////////////
        function inicializar(){

            // alert('aqui chegou');
            ReuniaoService.emitirListaParticipantes(vm.reuniao.id)
                .success(function (data) {
                    vm.reuniao = data;
                });

            vm.reuniao.pessoas.forEach(function (pessoa) {
                EventoService.obterParticipanteInternoPorId(pessoa.id)
                    .success(function (data) {
                        vm.participantes.push(data);
                    });
            });
        }

    }
})();
