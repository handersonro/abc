(function(){
    'use strict';
    angular
    .module('sisagmApp.core.directives')
    .directive('paginacaoResumo', paginacaoResumoDirective );

    /* @ngInject */
    function paginacaoResumoDirective($filter){

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'modules/core/directives/paginacao-resumo/paginacao-resumo-view.html',
            scope: {
                table:'=table'
            },
            compile: function (elem, attrs) {
                return {
                    pre: function(scope, element, attrs){
                    },
                    post: function(scope, element, attrs){
                        var unregister = scope.$watchCollection(function(){

                            return [scope.table.total(), scope.table.page()];
                        }, function(newVal, oldVal){
                            scope.total = scope.table.total();
                            if(scope.table.total() > 0){
                                scope.inicioItensExibidos = ((scope.table.page()-1) * scope.table.count())+1;
                                scope.finalItensExibidos = scope.table.page() * scope.table.count() < scope.table.total() ? scope.table.page() * scope.table.count() : scope.table.total();
                            }else {
                                scope.inicioItensExibidos = 0;
                                scope.finalItensExibidos = 0;
                            }
                        });

                        scope.$on("$destroy", function(){
                            unregister();
                        });
                    }
                };
            }
        };
    }
})();
