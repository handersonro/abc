(function() {
    'use strict';

    angular
        .module('sisagmApp.core.interceptors')
        .factory('authInterceptor', authInterceptor);


    function authInterceptor ($localStorage, $sessionStorage) {

        function request (config) {
            /*jshint camelcase: false */
            config.headers = config.headers || {};
            var token = $localStorage.authenticationToken || $sessionStorage.authenticationToken;
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }
    }
})();
