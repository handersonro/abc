(function(){
    angular
        .module('sisagmApp.core.directives')
        .controller('BarraIdiomaController', BarraIdiomaController );
    /* @ngInject */
    function BarraIdiomaController($scope, $mdDialog){
        /*
        $scope.idiomas = InternacionalizacaoService.getIdiomas();
        $scope.idiomaAtual = InternacionalizacaoService.idiomaSelecionado;
        $scope.$watch(InternacionalizacaoService.idiomaAtual, function(newValue) {
            $scope.idiomaAtual = newValue;
        });
        $scope.mudarIdioma = InternacionalizacaoService.mudarIdioma;
        */
        $scope.idiomas = {
            'pt-BR': {
               label: 'Português',
               descricao: 'Alterar idioma para Português'
            },
            'en-US': {
                label: 'English',
                descricao: 'Change language to English'
            },
            'es-ES': {
                label: 'Spanish',
                descricao: 'Cambie el idioma al Español'
            }
        };
        $scope.idiomaAtual = 'pt-BR';

        $scope.abrirMenuIdiomas = abrirMenuIdiomas;
        $scope.mudarIdioma = mudarIdioma;

        ////////////////////////////////
        function abrirMenuIdiomas($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        }
        function mudarIdioma(idioma){
            $scope.idiomaAtual = idioma;
        }
    }
})();
