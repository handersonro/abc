(function(){
'use strict';

angular.module('menu.directives')

    .directive('menuTree', [ '$mdSticky', function($mdSticky){
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'modules/menu/views/menu.html',
            controller: 'MenuController',
            controllerAs: 'menuCtrl',
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller){

                    },
                    post: function postLink(scope, iElement, iAttrs, controller){

                    }
                }
            }
        }
    }]);
})();
