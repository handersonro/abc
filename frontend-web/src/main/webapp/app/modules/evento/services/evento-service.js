/**
 * Created by john.clemente on 16/01/2017.
 */
(function(){
    'use strict';

    angular
        .module('sisagmApp.evento.services')
        .service('EventoService', EventoService);

    /* @ngInject */
    function EventoService($q, $http, Restangular, baseURL){

        ////////////////////////////
        function obterParticipanteExterno(noParticipante){
            var retorno = $q.defer();

            retorno = $http.get(baseURL+'participantes/externo?noParticipante='+noParticipante);

            return retorno;
        }

        function buscaRemetentePeloNome(noUsuario){
            return $http.get(baseURL+ 'remetentes?noRemetente=' + noUsuario);
        }

        function obterLocalidadePeloId(id) {
            return $http.get(baseURL+'eventos/localidades?idLocalidade='+id);
        }

        function obterParticipanteExternoPorIdPessoa(id) {
            return $http.get(baseURL+'participantes/externo?idPessoa='+id);
        }

        function obterParticipanteInternoPorId(id) {
            return $http.get(baseURL+'participantes/interno/pessoa/'+id);
        }


        return {
            obterPorId: Restangular.one('eventos').customGET,
            salvar: Restangular.one('eventos').customPOST,
            editar: Restangular.one('eventos').customPUT,
            obterLocais: Restangular.one('eventos/localidades').customGET,
            obterPaises: Restangular.one('eventos/paises').customGET,
            obterRemetentes: Restangular.one('eventos/remetentes').customGET,
            excluirPorId: Restangular.one('eventos').customDELETE,
            consultarComFiltroSemLoader: Restangular.one('eventos/', 'pesquisar').withHttpConfig({'da-loader': false}).customPOST,
            obterParticipanteExterno: obterParticipanteExterno,
            obterRemetentesPeloNome: buscaRemetentePeloNome,
            obterLocalidadePeloId: obterLocalidadePeloId,
            obterParticipanteExternoPorIdPessoa: obterParticipanteExternoPorIdPessoa,
            obterParticipanteInternoPorId: obterParticipanteInternoPorId
        };

    }

})();