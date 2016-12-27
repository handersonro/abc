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
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.inserir-autoridade', {
                url: '/inserir-autoridade',
                controller: 'AutoridadeInserirAutoridadeController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/autoridade-inserir-autoridade-view.html',
                resolve: {
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
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.pesquisar-autoridade', {
                url: '/pesquisar-autoridade',
                controller: 'AutoridadePesquisarAutoridadeController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/autoridade-pesquisar-autoridade-view.html',
                resolve: {
                }
            });
    }
})();
