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
    function AutoridadeService(Restangular,$http,baseURL) {

        function buscaRemetentePeloNome(noUsuario){
            return $http.get(baseURL+ 'usuarios?noUsuario=' + noUsuario);
        }

        return {
            obterPorId: Restangular.one('autoridades').customGET,
            obterTodasAutoridades: Restangular.all('autoridades').getList,
            obterRemetentesPeloNome: buscaRemetentePeloNome,
            salvar: Restangular.one('autoridades').customPOST,
            editar: Restangular.one('autoridades').customPUT,
            excluirPorId: Restangular.one('autoridades').customDELETE,
            consultarComFiltroSemLoader: Restangular.one('autoridades/', 'pesquisar').withHttpConfig({'da-loader': false}).customPOST,
            vincularUsuarioAutoridade: Restangular.one('usuarios/vincularAutoridade').customPOST
        };
    }
})();
