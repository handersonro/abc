describe('PessoaService ', function(){
    'use strict';

    var Pessoa;
    var PessoaBuilder;

    beforeEach(function(){
        module('pessoa.model');
        module('pessoa.services');
        module('sisagmApp.core.test');
    });

    beforeEach(inject(function(_Pessoa_, _PessoaBuilder_){
        Pessoa = _Pessoa_;
        PessoaBuilder = _PessoaBuilder_;
    }));


    describe('que valide ', function(){
        it('o tamanho do nome não aceite tamanho < 3', function(){
            var pessoa = new PessoaBuilder().comNome('as').build();
            expect(pessoa.nomeEValido()).toBeFalse();
        });
        it('o tamanho do nome aceite tamanho >= 4', function(){
            var pessoa = new PessoaBuilder().comNome('asdf').build();
            expect(pessoa.nomeEValido()).toBeTruthy();
        });
        it('a idade da pessoa', function(){
            var pessoa = new PessoaBuilder().comIdadeEmAnos(10).build();
            expect(pessoa.eMaiorDeIdade()).toBeFalse();
        });
    });

});
