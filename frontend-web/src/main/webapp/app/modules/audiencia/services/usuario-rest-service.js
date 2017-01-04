(function(){
    'use strict';

    angular
        .module('sisagmApp.audiencia.controllers')
        .service('UsuarioRestService', UsuarioRestService);

    /* @ngInject */
    function UsuarioRestService($q, $http){
        var service = this;

        service.obterListaUsuario = obterListaUsuario;
        service.obterUsuarios = obterUsuarios;

        ////////////////////////////
        function obterUsuarios(dto){
            var retorno = $q.defer();

            retorno.resolve(
                [
                    {
                        id: 1,
                        usuario: 'Amanda Silva Mendes'
                    },
                    {
                        id: 2,
                        usuario: 'Maria Madalena'
                    },
                    {
                        id: 3,
                        usuario: 'José Ricardo'
                    },
                    {
                        id: 4,
                        usuario: 'João Araújo'
                    },
                    {
                        id: 5,
                        usuario: 'Marcelo dos Santos'
                    },
                    {
                        id: 6,
                        usuario: 'Bruno Medeiros'
                    },
                    {
                        id: 7,
                        usuario: 'Zilma dos Reis'
                    }
                ]
            );

            return retorno.promise;
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
