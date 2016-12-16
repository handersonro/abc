(function(){
    angular
        .module('sisagmApp.convite.controllers')
        .controller('ConviteInserirConviteController', ConviteInserirConviteController);

    /* @ngInject */
    function ConviteInserirConviteController($scope, $timeout, $mdSidenav, $log, $http, $mdDialog, ConviteRestService){
        var vm = this;


        vm.procurarLocal = ConviteRestService.obterLocais;
        ///////////////////////////////////
    $scope.title = "Pesquisar convite";
    $scope.autoridade = 'Ministro';
    $scope.tbResultado = false;
    $scope.telaCadastro = false;
    $scope.telaPesquisa = true;
    $scope.filtro = {
          remetente: '',
          localEvento: '',
          validado: '',
          observacao: '',
          despacho: '',
          descricao: ''
    };
    $scope.convite = {
          dataInicioEvento: '',
          dataFimEvento: '',
          dataCadastramento: '',
          remetente: '',
          descricao: '',
          tipoEvento: '',
          pais: '',
          cidade: '',
          localEvento: '',
          observacao: '',
          despacho: ''
    };
    $scope.limpar = function(){
        $scope.filtro = { autoridade: 'Mario da Silva Mendes'};
        $scope.convite = {};
    }

    $scope.pesquisar = function(){
        $scope.tbResultado = true;
    }
    $scope.editar = function(item){
        $scope.title = "Editar convite";
        console.log(item);
        $scope.convite.tipoEvento = item.remetente;
        $scope.convite.remetente = item.remetente;
        $scope.convite.descricao = item.descricao;
        $scope.convite.tipoEvento = item.tipoEvento;
        $scope.convite.pais = item.pais;
        $scope.convite.cidade = item.cidade;
        $scope.convite.localEvento = item.localEvento;
        $scope.convite.observacao = item.observacao;
        $scope.convite.despacho = item.despacho;



        $scope.tbResultado = false;
        $scope.telaPesquisa = false;
        $scope.telaCadastro = true;

    }

    $scope.cadastro = function(){
        $scope.title = "Incluir convite";
        $scope.tbResultado = false;
        $scope.telaPesquisa = false;
        $scope.telaCadastro = true;
        $scope.limpar();
    }
    $scope.backTlPesquisa = function(){
        $scope.title = "Pesquisar convite";
        $scope.telaPesquisa = true;
        $scope.telaCadastro = false;

        $scope.tbResultado = false;

    }
    $scope.salvar = function(convite){
        console.log($scope.convite);
        $scope.title = "Pesquisar convite";
        $scope.telaPesquisa = true;
        $scope.telaCadastro = false;
    }
   $scope.carregarListConvite = function(){

        ConviteRestService
            .obterListaConvite({})
            .then(
                function(data){
                    $scope.listaConvites = data;
                },
                function(error){

                }
            );
   };
    $scope.carregarListConvite();


    /*DIALOG*/
    $scope.showConfirm = function(ev) {
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

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

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

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
  }


})();
