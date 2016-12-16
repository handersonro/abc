(function(){
    angular
        .module('sisagmApp.private.controllers')
        .controller('PrivateController', PrivateController);

    /* @ngInject */
    function PrivateController($scope, menuService, $mdDialog, Restangular, $state, $timeout, Usuario, $translate){
        $scope.login = Usuario.getLogin().login;

        //$scope.loader = LoaderService;

        $scope.toggleMenu = menuService.toggleMenu;

        $scope.toggleFiltro = toggleFiltro;
        $scope.filtros = {
            pesquisa: false
        };
        $scope.translate = translate;

        $scope.abrirTelaGerenciarPerfil = abrirTelaGerenciarPerfil;



        ///////////////////////////////////


        function toggleFiltro(fieldToAutoFocus) {
            $scope.filtros.pesquisa=!$scope.filtros.pesquisa;
            if( $scope.filtros.pesquisa ){
                $scope.setFocus(fieldToAutoFocus);
            }
        }

        function abrirTelaGerenciarPerfil() {
            $state.go('app.private.configurar-perfil.configurar');
        }

        function translate(field){
            return $translate.instant(field);
        }
    }
})();
