/**
 * Created by joaopedromilhome on 06/01/17.
 */
/**
 * Created by joaopedromilhome on 06/01/17.
 */
(function(){
    'use strict';
    /**
     * @ngdoc function
     * @name sisagmApp.autoridade.services:AutoridadeService
     * @description # AutoridadeService Serviço para Autoridade
     */
    angular
        .module('sisagmApp.login.services')
        .factory('LoginService', LoginService);


    /* @ngInject */
    function LoginService(Restangular) {
        return {
            autenticar: Restangular.one('autenticar/logar').customPOST,
            current: Restangular.one('autenticar/account').get

        };
    }
})();
