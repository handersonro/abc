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
