(function(){
    'use strict';

    angular

        .module('sisagmApp.autoridade.routes')
        .config(configPublicRoutes);

    /* @ngInject */
    function configPublicRoutes($stateProvider) {
        var MODULE_NAME = 'autoridade';
        var MODULE_PATH = 'modules/'+MODULE_NAME+'/';
        var STATE_PATH = 'app.private.';
        $stateProvider
            .state(STATE_PATH+MODULE_NAME, {
                url: '/'+MODULE_NAME,
                abstract: false,
                controller: 'AutoridadeController',
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
            .state(STATE_PATH+MODULE_NAME+'.inserir-autoridade', {
                url: '/inserir-autoridade',
                controller: 'AutoridadeInserirAutoridadeController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/autoridade-inserir-autoridade-view.html',
                resolve: {
                },
                data: {
                    authorities: ['INCLUIR_AUTORIDADE']
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.vincular-autoridade', {
                url: '/vincular-autoridade',
                controller: 'AutoridadeVincularAutoridadeController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/autoridade-vincular-autoridade-view.html',
                resolve: {
                },
                data: {
                    authorities: ['VINCULAR_AUTORIDADE']
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.editar-autoridade', {
                url: '/editar-autoridade',
                controller: 'AutoridadeEditarAutoridadeController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/autoridade-inserir-autoridade-view.html',
                resolve: {
                },
                params: {
                    autoridade: null
                },
                data: {
                    authorities: ['PESQUISAR_AUTORIDADE']
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.pesquisar-autoridade', {
                url: '/pesquisar-autoridade',
                controller: 'AutoridadePesquisarAutoridadeController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/autoridade-pesquisar-autoridade-view.html',
                params: {
                    filtro: {
                        filtros: { noAutoridade : '', noEmail : ''},
                        currentPage: 1,
                        pageSize: 20,
                        sortFields: 'id',
                        sortDirections: 'asc'
                    }
                },
                resolve: {
                },
                data: {
                    authorities: ['PESQUISAR_AUTORIDADE']
                }
            });
    }
})();
