(function(){
    'use strict';
    keyBind.$inject = ["keyCodes"];
    angular
        .module('sisagmApp.core.directives')
        .constant('keyCodes', {
                            esc: 27,
                            space: 32,
                            enter: 13,
                            tab: 9,
                            backspace: 8,
                            shift: 16,
                            ctrl: 17,
                            alt: 18,
                            capslock: 20,
                            numlock: 144
                        })
        .directive('keyBind', keyBind );

    /* @ngInject */
    function keyBind(keyCodes){

        function map(obj) {
            var mapped = {};
            for (var key in obj) {
                var action = obj[key];
                if (keyCodes.hasOwnProperty(key)) {
                    mapped[keyCodes[key]] = action;
                }
            }
            return mapped;
        }

        return function (scope, element, attrs) {
            var bindings = map(scope.$eval(attrs.keyBind));
            element.bind("keydown", function (event) {
                if (bindings.hasOwnProperty(event.which)) {
                    scope.$apply(function() {
                         scope.$eval(bindings[event.which]);
                         //console.log("scope");
                    });
                }
            });
        };
    }
})();
