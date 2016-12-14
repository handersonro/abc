
angular.module('menu.directives')

 .directive('menuToggle', ['$timeout','$translate', '$translatePartialLoader', 'menuService', 'RecursionHelper', function ($timeout ,$translate, $translatePartialLoader, menuService, RecursionHelper) {

     $translatePartialLoader.addPart('menu');
     $translate.refresh();

     return {
        scope: {
          section: '=',
            sectionSelected: '='
        },
        replace: true,
        controller: ['$scope', 'menuService', function($scope, menuService){

            $scope.sectionDecoratingToggle = menuService.sectionDecoratingToggle;
            $scope.sectionCompareToggle = menuService.sectionCompareToggle;
            $scope.selectSection = menuService.selectSection;
            $scope.showFullWidth = menuService.showFullWidth;
        }],

        templateUrl: 'modules/menu/views/menu-toggle.html',
        compile: function(element) {
            // Use the compile function from the RecursionHelper,
            // And return the linking function(s) which it returns
            return RecursionHelper.compile(element);
        }
      };
  }]);
