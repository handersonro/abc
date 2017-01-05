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
            editar: Restangular.one('pessoa/fisica').customPUT,
            excluirPorId: Restangular.one('pessoa/fisica/').customDELETE,
            consultarComFiltro: Restangular.one('pessoa/fisica', 'filtro').customPOST,
            consultarComFiltroSemLoader: Restangular.one('pessoa/fisica', 'filtro').withHttpConfig({'da-loader': false}).customPOST,
            validaCpfReceita: Restangular.one('receitafederal/').customGET
        };
    }
})();
