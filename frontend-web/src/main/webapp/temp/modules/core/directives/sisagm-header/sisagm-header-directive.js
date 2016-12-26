(function(){
    'use strict';
    sisagmHeaderDirective.$inject = ["$filter"];
    angular
        .module('sisagmApp.core.directives')
        .directive('sisagmHeader', sisagmHeaderDirective );

    /* @ngInject */
    function sisagmHeaderDirective($filter){

        return {
            restrict: 'E',
            replace: true,
            controller: 'SisagmHeaderController',
            templateUrl: 'modules/core/directives/sisagm-header/sisagm-header-view.html',
            scope: {
            }
        };
    }
})();
