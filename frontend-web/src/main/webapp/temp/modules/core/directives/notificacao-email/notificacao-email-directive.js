(function(){
    angular
        .module('sisagmApp.core.directives')
        .directive('notificacaoEmail', notificacaoEmailDirective );
    /* @ngInject */
    function notificacaoEmailDirective(){
        return {
            restrict: 'AE',
            templateUrl: 'modules/core/directives/notificacao-email/notificacao-email-view.html',
            replace: true,
            scope: {

            },
            controller: 'NotificacaoEmailController',
            link: function(scope, element, attrs){

            }
        };
    }
})();
