(function(){
    angular
        .module('sisagmApp.pessoas.controllers')
        .controller('PessoasInserirRemetenteController', PessoasInserirRemetenteController);

    /* @ngInject */
    function PessoasInserirRemetenteController($scope, $timeout, $http, AlertsService){
        var vm = this;
        ///////////////////////////////////
        vm.title = "Incluir remetente";
        vm.showBtnSalvar = showBtnSalvar;
        vm.remetente = {
          nome: '',
          cargo: '',
          email: '',
          tel: ''
        };
        vm.limpar = function(){
            vm.remetente ={};
        }

        vm.salvar = function(){
          AlertsService.success('Registro incluído com sucesso.');
          vm.remetente = {};
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
