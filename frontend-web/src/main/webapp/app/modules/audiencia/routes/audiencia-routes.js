(function(){
    'use strict';

    angular

        .module('sisagmApp.audiencia.routes')
        .config(configPublicRoutes);

    /* @ngInject */
    function configPublicRoutes($stateProvider) {
        /*var MODULE_NAME = 'audiencia';
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
                },
                data: {
                    authorities: []
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.inserir-audiencia', {
                url: '/inserir-audiencia',
                controller: 'AudienciaInserirAudienciaController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/audiencia-inserir-audiencia-view.html',
                resolve: {
                },
                data: {
                    authorities: []
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
                },
                data: {
                    authorities: []
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.pesquisar-audiencia', {
                url: '/pesquisar-audiencia',
                controller: 'AudienciaPesquisarAudienciaController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/audiencia-pesquisar-audiencia-view.html',
                params: {
                    filtro: {
                        filtros: {},
                        currentPage: 1,
                        pageSize: 20,
                        sortFields: 'id',
                        sortDirections: 'asc'
                    }
                },
                resolve: {
                },
                data: {
                    authorities: []
                }
            });*/
    }
})();
