
(function(){
    'use strict';
    angular
        .module('pessoa.model')
        .factory('PessoaRESTService', PessoaRESTService);

    /* @ngInject */
    function PessoaRESTService(Restangular){
        var service = {};
        var endPoint = Restangular.one('pessoa');

        service.salvar = salvar;
        service.atualizar = atualizar;

        return service;
        //////////////////
        function atualizar(perfil){
            return endPoint.customPUT(perfil);
        }

        function salvar(perfilDTO){
            return endPoint.customPOST(perfilDTO);
        }
    }
})();
