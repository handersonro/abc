(function(){
    'use strict';
    angular
    .module('sisagmApp.core.directives')
    .directive('filtroPesquisa', filtroPesquisaDirective );

    /* @ngInject */
    function filtroPesquisaDirective(){
      /*

      */
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'modules/core/directives/filtro-pesquisa/filtro-pesquisa-view.html',
            controller: 'FiltroPesquisaController',
            transclude: true,
            scope:{
                consultar: '&',
                autocomplete: '&',
                parametros: '='

            }
        };
    }
})();
