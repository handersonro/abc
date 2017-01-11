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
            obterPaises: Restangular.one('eventos/paises').customGET,
            obterRemetentes: Restangular.one('eventos/remetentes').customGET,
            consultarComFiltroSemLoader: Restangular.one('eventos/', 'pesquisar').withHttpConfig({'da-loader': false}).customPOST
        };
    }

})();
