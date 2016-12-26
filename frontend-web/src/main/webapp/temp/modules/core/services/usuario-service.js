(function(){
    'use strict';

    angular
        .module('sisagmApp.core.services')
        .service('Usuario', Usuario);

    /* @ngInject */
    function Usuario(){
        var service = this;

        service.login = {};

        service.setLogin = setLogin;
        service.getLogin = getLogin;

        function setLogin(login){
            service.login = login;
        }

        function getLogin(){
            return service.login;
        }

    }
})();
