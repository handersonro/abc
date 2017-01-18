(function() {
    'use strict';

    angular
        .module('sisagmApp.core.services')
        .factory('errorHandlerInterceptor', errorHandlerInterceptor);

    errorHandlerInterceptor.$inject = ['$q', '$rootScope'];

    function errorHandlerInterceptor ($q, $rootScope) {
        var service = {
            responseError: responseError
        };

        return service;

        function responseError (response) {
            console.log('ERRO', response.status);
            if (!(response.status === 401 && (response.data === '' || (response.data.path )))) {
                console.log('ERRO DESCONHECIDO', response.status);
                //&& response.data.path.indexOf('/api/account') === 0
                // $rootScope.$emit('turismoApp.httpError', response);
            }
            return $q.reject(response);
        }
    }
})();
