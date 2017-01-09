/**
 * Created by john.clemente on 05/01/2017.
 */
(function(){
    'use strict';
    /**
     * @ngdoc function
     * @name sisagmApp.pessoas.services:ParticipanteInternoService
     * @description # ParticipanteInternoService Serviço para Participante Interno
     */
    angular
        .module('sisagmApp.pessoas.services')
        .factory('ParticipanteInternoService', ParticipanteInternoService);


    /* @ngInject */
    function ParticipanteInternoService(Restangular) {
        return {
            salvar: Restangular.one('participantes/interno').customPOST,
            consultarComFiltro: Restangular.one('participantes/interno/', 'pesquisar').customPOST,
            consultarComFiltroSemLoader: Restangular.one('participantes/interno/', 'pesquisar').withHttpConfig({'da-loader': false}).customPOST,
        };
    }
})();
