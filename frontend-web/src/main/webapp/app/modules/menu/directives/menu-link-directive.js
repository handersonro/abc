(function(){
  'use strict';

  angular.module('menu.directives')

   .directive('menuLink', function () {
      return {
        scope: {
          section: '='
        },
        replace: true,
        controller: ['$scope','menuService', function($scope){
        }],
        templateUrl: 'modules/menu/views/menu-link.html',
        link: function ($scope, $element) {
        }
      };
    })
})();
