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
            obterPorId: Restangular.one('pessoa/fisica').customGET,
            salvar: Restangular.one('remetentes').customPOST,
            editar: Restangular.one('remetentes').customPUT,
            excluirPorId: Restangular.one('remetentes').customDELETE,
            consultarComFiltro: Restangular.one('remetentes/', 'pesquisar').customPOST,
            consultarComFiltroSemLoader: Restangular.one('remetentes/', 'pesquisar').withHttpConfig({'da-loader': false}).customPOST,
            validaCpfReceita: Restangular.one('receitafederal/').customGET
        };
    }
})();
