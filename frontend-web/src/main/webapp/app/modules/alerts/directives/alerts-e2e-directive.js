(function(){
    angular
        .module('$alerts.directives')
        .directive('alertsE2e', alertsE2EDirective);

    /* @ngInject */
    function alertsE2EDirective(AlertsManager){
        return {
            restrict: 'EA',
            templateUrl: 'modules/alerts/views/alerts-e2e-view.html',
            replace: true,
            scope: {

            },
            link:function(scope, element, attrs){
                scope.alerts = [];

                scope.$watchCollection(
                    function(){
                        return AlertsManager.getAll();
                    },
                    function(alerts){
                        if(Object.keys(alerts).length > 0 ){
                            scope.alerts = angular.copy(alerts);                            
                        }
                    }
                );
            }
        };
    }
})();
