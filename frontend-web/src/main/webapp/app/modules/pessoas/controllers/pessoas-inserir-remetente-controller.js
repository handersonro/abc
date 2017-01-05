(function(){
    angular
        .module('sisagmApp.pessoas.controllers')
        .controller('PessoasInserirRemetenteController', PessoasInserirRemetenteController);

    /* @ngInject */
    function PessoasInserirRemetenteController($scope, $timeout, $http, $state, $stateParams, AlertsService, RemetenteService){
        var vm = this;
        ///////////////////////////////////
        vm.title = "Incluir remetente";
        vm.showBtnSalvar = showBtnSalvar;
        vm.remetente = {};
        vm.limpar = function(){
            $state.go('app.private.pessoas.inserir-remetente', {}, {reload: true});
        }

        vm.salvar = function(remetente){

            var pessoa = {flPessoaAtivo: true};
            remetente.pessoa = pessoa;
            remetente.nuTelefone = remetente.nuTelefone.replace(/[^0-9]/g,'');

            RemetenteService.salvar(remetente).then(
                function (retorno) {
                    AlertsService.success('Registro incluído com sucesso.');
                    $state.go('app.private.pessoas.inserir-remetente', {}, {reload: true});
                }
            );

        }

        function showBtnSalvar(){
          return $scope.formRemetente.$invalid;
        }

        $scope.carregaLista = function(){
            $http
            .get('modules/pessoas/data/list-pessoas.json')
            .success (function(data){
                $scope.lista = data;
            })
            .error(function(){
                alert('Não fooi possivel carregar os dados')
            });
        };
        $scope.carregaLista();

    }
})();
