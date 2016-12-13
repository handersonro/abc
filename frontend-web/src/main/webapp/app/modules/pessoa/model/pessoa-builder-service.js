(function(){
    angular
        .module('pessoa.model')
        .factory('PessoaBuilder', PessoaBuilder);

    function PessoaBuilder(Pessoa, Builder){
        return function(){
            var pessoa = new Pessoa();
            var builder = new Builder().createSetters(this, pessoa);

            this.build = function(){
                return pessoa;
            };

        };
    }
})();
