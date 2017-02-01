(function(){
    'use strict';
    angular
        .module('sisagmApp.core.directives')
        .directive('sisagmHeader', sisagmHeaderDirective );

    /* @ngInject */
    function sisagmHeaderDirective($filter){

        return {
            restrict: 'E',
            replace: true,
            controller: 'SisagmHeaderController',
            controllerAs:  'vm',
            templateUrl: 'modules/core/directives/sisagm-header/sisagm-header-view.html',
            scope: {
            }
        };
    }
})();
