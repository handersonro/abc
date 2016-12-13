(function(){
'use strict';

angular
    .module('menu.directives')
    .directive('sisagmMenu', sisagmMenuDirective);

    function sisagmMenuDirective(){
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'modules/menu/views/menu-view.html',
            controller: 'MenuController',
            controllerAs: 'menuCtrl',
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller){

                    },
                    post: function postLink(scope, iElement, iAttrs, controller){

                    }
                };
            }
        };
    }


})();
