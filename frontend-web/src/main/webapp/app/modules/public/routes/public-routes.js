(function(){
    'use strict';

    angular
        .module('sisagmApp')
        .config(configPublicRoutes);

    /* @ngInject */
    function configPublicRoutes($stateProvider,$injector) {


        console.log('A1 ');





            // $http({method: 'GET', url: 'http://localhost:8080/sisagm/api/autenticar/account', headers: {
            //     'Authorization': 'Bearer '+ retorno.id_token}
            // });





        $stateProvider
            .state( 'app.public', {
                url: '/public',
                controller: 'PublicController',
                controllerAs: 'vm',
                templateUrl: 'modules/public/views/public-view.html',
                resolve:  {

                },
                ncyBreadcrumb: {
                    skip: true
                },
                params: {
                    callback: function(){

                            console.log('A6');
                    }
                }
            });



        var MODULE_NAME = 'audiencia';
        var MODULE_PATH = 'modules/'+MODULE_NAME+'/';
        var STATE_PATH = 'app.private.';
        $stateProvider
            .state(STATE_PATH+MODULE_NAME, {
            url: '/'+MODULE_NAME,
                abstract: false,
                controller: 'AudienciaController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/'+MODULE_NAME+'-view.html',
                resolve:  {
            },
            ncyBreadcrumb: {
                skip: true
            },
            params: {
                callback: null
            }
            })
            .state(STATE_PATH+MODULE_NAME+'.inserir-audiencia', {
                url: '/inserir-audiencia',
                controller: 'AudienciaInserirAudienciaController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/audiencia-inserir-audiencia-view.html',
                resolve: {
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.editar-audiencia', {
                url: '/editar-audiencia',
                controller: 'AudienciaEditarAudienciaController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/audiencia-inserir-audiencia-view.html',
                resolve: {
                },
                params: {
                    audiencia: null
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.pesquisar-audiencia', {
                url: '/pesquisar-audiencia',
                controller: 'AudienciaPesquisarAudienciaController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/audiencia-pesquisar-audiencia-view.html',
                resolve: {
                }
            });




    }
})();
