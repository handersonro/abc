(function(){
    'use strict';

    angular
        .module('sisagmApp.convite.controllers')
        .service('ConviteRestService', ConviteRestService);

    /* @ngInject */
    function ConviteRestService($q, $http){
        var service = this;

        service.obterListaConvite = obterListaConvite;
        service.obterLocais = obterLocais;

        ////////////////////////////
        function obterLocais(dto){
            var retorno = $q.defer();

            retorno.resolve(
                [
                    {
                        id: 1,
                        local: 'CLN 312 BLOCO E'
                    },
                    {
                        id: 2,
                        local: 'CLS 205'
                    },
                    {
                        id: 3,
                        local: 'Condomínio Solar de Brasília'
                    },
                    {
                        id: 4,
                        local: 'Condomínio Parque do Mirante'
                    },
                    {
                        id: 5,
                        local: 'Condomíno Santa Bárbara'
                    },
                    {
                        id: 6,
                        local: 'Condomínio São Francisco'
                    },
                    {
                        id: 7,
                        local: 'Lago Sul'
                    }
                ]
            );

            return retorno.promise;
        }

        function obterListaConvite(dto){
            var retorno = $q.defer();
            $http
                 .get('modules/convite/data/list-convite.json')
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
