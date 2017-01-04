 angular.module('menu.controllers')

.controller('MenuController', ['$rootScope','$log','$state','$timeout','$mdSidenav','$location','menuService','$scope',
      function ($rootScope, $log, $state, $timeout, $mdSidenav, $location, menuService, $scope) {
        $scope.selectItem = menuService.selectItem;
        $scope.sections = menuService.sections;
        $scope.selectSection = menuService.selectSection;
        $scope.setFocus = menuService.setFocus;
        $scope.removeFocus = menuService.removeFocus;
        $scope.isOpen = menuService.isOpen;
        $scope.showFullWidth = menuService.showFullWidth;
        $scope.sectionIndice = menuService.sectionIndice;
        $scope.sectionCompareToggle = menuService.sectionCompareToggle;
        $scope.sectionPush = menuService.sectionPush;
        $scope.sectionDecoratingToggle = menuService.sectionDecoratingToggle;
        $scope.setIsOpen = menuService.setIsOpen;
        $scope.getIsOpen = menuService.getIsOpen;

        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');

        function buildToggler(componentId) {
          return function() {
            $mdSidenav(componentId).toggle();
          }
        }
      }]);
