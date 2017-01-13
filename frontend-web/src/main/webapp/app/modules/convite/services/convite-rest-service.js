(function () {
    'use strict';

    angular
        .module('sisagmApp.convite.controllers')
        .service('ConviteRestService', ConviteRestService);

    /* @ngInject */
    function ConviteRestService(Restangular) {
        return {
            obterPorId: Restangular.one('eventos').customGET,
            salvar: Restangular.one('eventos').customPOST,
            editar: Restangular.one('eventos').customPUT,
            obterLocais: Restangular.one('eventos/localidades').customGET,
            obterPaises: Restangular.one('eventos/paises').customGET,
            obterRemetentes: Restangular.one('eventos/remetentes').customGET,
            excluirPorId: Restangular.one('eventos').customDELETE,
            consultarComFiltroSemLoader: Restangular.one('eventos/', 'pesquisar').withHttpConfig({'da-loader': false}).customPOST
        };
    }

})();
