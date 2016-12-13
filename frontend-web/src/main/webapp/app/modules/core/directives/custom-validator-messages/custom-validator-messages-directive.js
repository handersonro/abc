(function(){
    'use strict';
    angular
    .module('sisagmApp.core.directives')
    .directive('customValidatorMessages', messagesDirective );

    /* @ngInject */
    function messagesDirective(){
        var DEFAULT_PREFIX = 'msg.error.';

        return {
            restrict: 'E',
            replace: true,
            require:'^form',
            templateUrl: 'modules/core/directives/custom-validator-messages/custom-validator-messages.html',
            scope: {
                inputName:'@inputName',
                overwriteMessage:'=?'
            },
            compile: function (elem, attrs) {
                return {
                    pre: function(scope, element, attrs, formController){
                    },
                    post: function(scope, element, attrs, formController){
                        scope.form = formController;
                        scope.concatDefaultStringMsg = function (sufix) {
                            if(attrs.hasOwnProperty('overwriteMessage')){
                                if(scope.overwriteMessage[sufix]){
                                    return scope.overwriteMessage[sufix];
                                }
                            }

                            return DEFAULT_PREFIX + sufix;
                        };
                    }
                };
            }
        };
    }
})();
