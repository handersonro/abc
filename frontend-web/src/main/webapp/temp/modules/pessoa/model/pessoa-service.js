
(function(){
    'use strict';
    Pessoa.$inject = ["PessoaRESTService"];
    angular
        .module('pessoa.model')
        .factory('Pessoa', Pessoa);

    /* @ngInject */
    function Pessoa(PessoaRESTService){
        return function(){
            var domain = {};

            domain.id =
            domain.nome = '';
            domain.email = '';
            domain.sexo = '';
            domain.idadeEmAnos = 0;

            domain.emailEValido = emailEValido;
            domain.eMaiorDeIdade = eMaiorDeIdade;
            domain.inativar = inativar;
            domain.nomeEValido = nomeEValido;
            domain.salvar = salvar;
            domain.update = update;

            return domain;
            //////////////////////////
            function eMaiorDeIdade(){
                return domain.idadeEmAnos >= 18;
            }
            function emailEValido(){
                return domain.nome !== '' && domain.email.length > 3;
            }
            function nomeEValido(){
                return domain.nome !== '' && domain.nome.length > 3;
            }
            function inativar(){
                domain.status = 0;
            }
            function salvar(){
                return PessoaRESTService.salvar(domain);
            }
            function update(){
                PessoaRESTService.update(domain);
            }

        };
    }
})();
