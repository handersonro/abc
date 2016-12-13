(function(){
    'use strict';
    angular
    .module('sisagmApp.core.directives')
    .directive('removeWhitespace', removeWhitespace );

    /* @ngInject */
    function removeWhitespace(){

        return {
            restrict: 'A',
            require: 'ngModel',
            compile: function (elem, attrs) {
                return {
                    pre: function(scope, element, attrs){
                    },
                    post: function(scope, element, attrs,ngModel){

                        function formatar(viewValue){
                            if (viewValue !== undefined) {
                                return viewValue.trim().replace(/\s+/g,' ');
                            } else {
                                return "";
                            }
                        }

                        ngModel.$parsers.unshift(function (viewValue) {
                            return  formatar(viewValue);
                        });

                        ngModel.$formatters.unshift(function (viewValue) {
                            return  formatar(viewValue);
                        });

                        element.bind('blur',function(){
                            ngModel.$viewValue = element[0].value = formatar(ngModel.$viewValue);
                            // ngModel.$invalid = true;
                        });

                    }
                };
            }
        };
    }
})();
