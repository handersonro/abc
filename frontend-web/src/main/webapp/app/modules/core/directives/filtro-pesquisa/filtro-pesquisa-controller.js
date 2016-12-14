(function(){
    angular
        .module('sisagmApp.core.directives')
        .controller('FiltroPesquisaController', FiltroPesquisaController );
    /* @ngInject */
    function FiltroPesquisaController($scope, menuService, $mdDialog, Restangular, $state, $timeout, Usuario, LoaderService, $translate){

        $scope.toggleFiltro = toggleFiltro;
        $scope.setBlur = setBlur;

        ///////////////////////
         function toggleFiltro(fieldToAutoFocus){
            $scope.filtroPesquisar = !$scope.filtroPesquisar;
            if( $scope.filtroPesquisar ){
                setFocus(fieldToAutoFocus);
            }
        }

        function setBlur(){
          $scope.consultar();
          blur('pesquisa-autoComplete');
        }

        function setFocus(inputId){
            $timeout(function(){
                angular.element(document.querySelector('input[id="'+inputId+'"]')).focus();
            }, 50);
        }

        function blur(inputId){
         $timeout(function(){
             angular.element(document.querySelector('input[id="'+inputId+'"]')).blur();
         }, 50);
     }
    }
})();
