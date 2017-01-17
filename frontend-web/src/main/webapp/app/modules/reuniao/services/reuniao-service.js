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
    function ReuniaoService(Restangular,$http,baseURL) {

        function buscaParticipantePeloNome(noParticipante) {
            return $http.get(baseURL+'participantes/interno?noParticipante='+noParticipante);
        }

        function buscarParticipante(noParticipante) {
            return $http.get(baseURL+'participantes/interno/buscar?noParticipante='+noParticipante);
        }


        return {
            obterPorId: Restangular.one('eventos').customGET,
            buscaParticipantePeloNome: buscaParticipantePeloNome,
            buscarParticipante: buscarParticipante,
            salvar: Restangular.one('eventos').customPOST,
            editar: Restangular.one('eventos').customPUT,
            excluirPorId: Restangular.one('eventos').customDELETE,
            consultarComFiltroSemLoader: Restangular.one('eventos/', 'pesquisar').withHttpConfig({'da-loader': false}).customPOST

        };
    }
})();
