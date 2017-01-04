(function(){
    angular
        .module('sisagmApp.reuniao.controllers')
        .controller('ReuniaoEditarReuniaoController', ReuniaoEditarReuniaoController);

    /* @ngInject */
    function ReuniaoEditarReuniaoController($scope, $timeout, $http, AlertsService, $stateParams, $state, UsuarioRestService, ConviteRestService){
        var vm = this;
        vm.title = "Editar reunião";
        vm.autoridade = "Ministro";
        vm.reuniao = $stateParams.reuniao;

        vm.limpar = limpar;
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvar = salvar;
        vm.listaAutoridades = {};
        vm.procurarUsuario = UsuarioRestService.obterUsuarios;
        vm.procurarLocal = ConviteRestService.obterLocais;

        inicializar();
        ///////////////////////////////////
        function inicializar(){
        }

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
