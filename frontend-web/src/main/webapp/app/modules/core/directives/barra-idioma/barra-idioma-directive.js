(function(){
    angular
    .module('sisagmApp.core.directives')
    .directive('barraIdioma', barraIdiomaDirective );
/* @ngInject */
    function barraIdiomaDirective(){
        return {
            restrict: 'AE',
            templateUrl: 'modules/core/directives/barra-idioma/barra-idioma-view.html',
            replace: true,
            controller: 'BarraIdiomaController',
            link: function(scope, element, attrs){

            }
        };
    }
})();
