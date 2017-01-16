(function(){
    'use strict';

    angular
        .module('sisagmApp.audiencia.controllers')
        .service('UsuarioRestService', UsuarioRestService);

    /* @ngInject */
    function UsuarioRestService($q, $http, Restangular, baseURL){
        var service = this;

        service.obterListaUsuario = obterListaUsuario;
        service.obterParticipanteExterno = obterParticipanteExterno;
        service.obterRemetentesPeloNome = buscaRemetentePeloNome;

        ////////////////////////////
        function obterParticipanteExterno(noParticipante){
            var retorno = $q.defer();

            retorno = $http.get(baseURL+'participantes/externo?noParticipante='+noParticipante);

            return retorno;
        }

        function buscaRemetentePeloNome(noUsuario){
            return $http.get(baseURL+ 'remetentes?noRemetente=' + noUsuario);
        }

        function obterListaUsuario(dto){
            var retorno = $q.defer();
            $http
                 .get('modules/audiencia/data/list-usuario.json')
                 .success (function(data){
                    retorno.resolve(data);
                 })
                 .error(function(){
                     retorno.reject(alert('Não fooi possivel carregar os dados'));
                 });
            return retorno.promise;
        }

    }


})();
