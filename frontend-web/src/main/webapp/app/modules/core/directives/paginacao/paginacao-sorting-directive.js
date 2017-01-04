(function(){
    angular
        .module('sisagmApp.core.directives')
        .directive('paginacaoSorting', paginacaoSortingDirective );

    /* @ngInject */
    function paginacaoSortingDirective(){
        return {
            restrict: 'E',


            templateUrl: 'modules/core/directives/paginacao/paginacao-sorting-view.html',
            scope: {
                dto: '=',
                fieldName: "@"
            },

            compile: function (element, attrs) {


                return {
                    pre: function(scope, element, attrs){


                    },
                    post: function(scope, element, attrs){

                        element.bind('click', toggleSort);




                        function toggleSort(){
                            scope.$apply(function(){
                                console.log(scope.dto, scope.fieldName);
                                if(scope.dto && scope.dto.order && scope.dto.order !== scope.fieldName){
                                    scope.dto.order = scope.fieldName;

                                }else if(scope.dto.order === scope.fieldName){
                                    if(scope.dto.orderDirection === "ASC"){

                                        scope.dto.orderDirection = "DESC";
                                    }else {

                                        scope.dto.orderDirection = "ASC";
                                    }
                                }

                            });
                        }
                    }
                };
            }
        };
    }


})();
