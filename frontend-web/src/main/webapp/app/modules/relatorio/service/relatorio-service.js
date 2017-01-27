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
        .module('sisagmApp.relatorio.services')
        .factory('RelatorioService', RelatorioService);


    /* @ngInject */
    function RelatorioService(Restangular,$http,baseURL) {

        return {
            obterDados: Restangular.one('relatorios/', 'relatorio-audiencia').customPOST,
            obterDadosConvite: Restangular.one('relatorios/', 'relatorio-convite').customPOST,
            obterRemetentes: Restangular.one('relatorios/', 'pesquisar-remetente').customPOST,
            obterDadosReuniao: Restangular.one('relatorios/', 'solicitar-reuniao').customPOST
        };
    }
})();
