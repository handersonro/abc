(function () {
    'use strict';

    angular
        .module('sisagmApp.convite.controllers')
        .service('ConviteRestService', ConviteRestService);

    /* @ngInject */
    function ConviteRestService(Restangular) {
        return {
            salvar: Restangular.one('eventos').customPOST,
            obterLocais: Restangular.one('eventos/localidades').customGET,
            obterRemetentes: Restangular.one('eventos/remetentes').customGET
        };
    }

})();
