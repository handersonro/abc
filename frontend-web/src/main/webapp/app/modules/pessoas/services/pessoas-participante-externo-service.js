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
            salvar: Restangular.one('participantes/externo').customPOST
        };
    }
})();
