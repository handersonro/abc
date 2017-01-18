(function() {
    'use strict';

    angular
        .module('sisagmApp.core.autorizacao')
        .factory('UsuarioLogado', UsuarioLogado);

    /* @ngInject */
    function UsuarioLogado (Restangular) {
        var service = {};
        var endPoint = Restangular.one('autenticar/account');

        service.obterUsuario = obterUsuario;
        return service;

        function obterUsuario() {
            return endPoint.customGET();
        }


    }
})();
