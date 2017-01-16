/**
 * Created by john.clemente on 13/01/2017.
 */
(function(){
    'use strict';
    /**
     * @ngdoc function
     * @name sisagmApp.reuniao.services:ReuniaoService
     * @description # ReuniaoService Serviço para Reunião
     */
    angular
        .module('sisagmApp.reuniao.services')
        .factory('ReuniaoService', ReuniaoService);


    /* @ngInject */
    function EventoService(Restangular,$http,baseURL) {

        function buscar(noParticipante) {
            return $http.get(baseURL+'participantes/interno?noParticipante='+noParticipante);
        }

        return {
            obterPorHash: Restangular.one('eventos').customGET
        };
    }
})();
