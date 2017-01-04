(function(){
    angular
        .module('$alerts.directives')
        .directive('alerts', alertsDirective);

    /* @ngInject */
    function alertsDirective($mdToast, $timeout){
        return{
            restrict: 'A',
            replace: true,
            
            link:function(scope, element, attrs){


                var tempoTimeout = parseInt(attrs.timeout);

                if(attrs.timeout !== '' && tempoTimeout){
                    $timeout(function(){
                        $mdToast.hide();
                    }, tempoTimeout);
                }
            }
        };
    }
})();
