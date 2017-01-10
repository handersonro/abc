/**
 * Created by john.clemente on 10/01/2017.
 */
(function () {
    'use strict';
    /**
     * @ngdoc function
     * @name sisagmApp.autoridade.services:AutoridadeService
     * @description # AutoridadeService Serviço para Autoridade
     */
    angular
        .module('sisagmApp.autoridade.services')
        .factory('AutoridadeService', AutoridadeService);


    /* @ngInject */
    function AutoridadeService(Restangular) {
        return {
            obterPorId: Restangular.one('autoridades').customGET,
            salvar: Restangular.one('autoridades').customPOST,
            editar: Restangular.one('autoridades').customPUT,
            excluirPorId: Restangular.one('autoridades').customDELETE,
            consultarComFiltroSemLoader: Restangular.one('autoridades/', 'pesquisar').withHttpConfig({'da-loader': false}).customPOST
        };
    }
})();