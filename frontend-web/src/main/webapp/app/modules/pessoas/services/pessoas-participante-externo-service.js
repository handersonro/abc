/**
 * Created by john.clemente on 05/01/2017.
 */
(function(){
    'use strict';
    /**
     * @ngdoc function
     * @name sisagmApp.pessoas.services:ParticipanteExternoService
     * @description # ParticipanteExternoService Serviço para Participante Externo
     */
    angular
        .module('sisagmApp.pessoas.services')
        .factory('ParticipanteExternoService', ParticipanteExternoService);


    /* @ngInject */
    function ParticipanteExternoService(Restangular) {
        return {
            salvar: Restangular.one('participantes/externo').customPOST,
            consultarComFiltro: Restangular.one('participantes/externo/', 'pesquisar').customPOST,
            consultarComFiltroSemLoader: Restangular.one('participantes/externo/', 'pesquisar').withHttpConfig({'da-loader': false}).customPOST,
            editar: Restangular.one('participantes/externo').customPUT,
            excluirPorId: Restangular.one('participantes/externo').customDELETE,
        };
    }
})();
