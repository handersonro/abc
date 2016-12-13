(function(){
    angular
        .module('sisagmApp.core.services')
        .factory('Builder', Builder);
    /* @ngInject */
    function Builder(){
        return function(){
            var service = this;

            service.createSetters = createSetters;

            return service;
            /////////////////////////////////
            function createSetters(builder, domain){
                var property;
                for(property in domain){
                    if(domain.hasOwnProperty(property) && typeof domain[property] !== 'function'){
                        builder['com'+capitalizeFirstLetter(property)] = changeProperty(builder, domain, property);
                    }
                }
                return builder;
            }
            function changeProperty(builder, domain, property){
                return function(value){
                    domain[property] = value;
                    return builder;
                };
            }
            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

        };
    }
})();
