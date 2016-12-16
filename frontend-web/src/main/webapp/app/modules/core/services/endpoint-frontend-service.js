(function(){
    'use strict';
    angular
        .module('sisagmApp.core.services')
        .factory('EndpointFrontend', EndpointFrontend);
    /* @ngInject */
    function EndpointFrontend(Restangular, $location){
        return Restangular.withConfig(function(RestangularConfigurer) {
            var fullUrl = $location.absUrl();
            var contexto = fullUrl.substr(0, fullUrl.lastIndexOf(fullUrl.indexOf('.html') !== -1 ? "index.html" : "#"));
            RestangularConfigurer.setBaseUrl(
                contexto.substr(0, contexto.lastIndexOf('/')+1)
            );
        });
    }
})();
