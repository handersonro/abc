/**
 * Created by john.clemente on 05/01/2017.
 */
(function(){
    'use strict';
    /**
     * @ngdoc function
     * @name sisagmApp.pessoas.services:RemetenteService
     * @description # RemetenteService Serviço para Remetente
     */
    angular
        .module('sisagmApp.pessoas.services')
        .factory('RemetenteService', RemetenteService);


    /* @ngInject */
    function RemetenteService(Restangular) {
        return {
            obterPorId: Restangular.one('remetentes').customGET,
            salvar: Restangular.one('remetentes').customPOST,
            editar: Restangular.one('remetentes').customPUT,
            excluirPorId: Restangular.one('remetentes').customDELETE,
            consultarComFiltroSemLoader: Restangular.one('remetentes/', 'pesquisar').withHttpConfig({'da-loader': false}).customPOST,
        };
    }
})();
