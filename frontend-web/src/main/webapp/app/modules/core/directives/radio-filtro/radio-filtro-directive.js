(function(){
    'use strict';
    angular
    .module('sisagmApp.core.directives')
    .directive('radioFiltro', radioFiltro );

    /* @ngInject */
    function radioFiltro(){
      /*

      */
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'modules/core/directives/radio-filtro/radio-filtro-view.html',
            transclude: true,
            scope:{
                status: '=',
            }
        };
    }
})();
