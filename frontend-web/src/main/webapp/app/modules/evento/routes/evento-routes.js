(function(){
    'use strict';

    angular

        .module('sisagmApp.reuniao.routes')
        .config(configPublicRoutes);

    /* @ngInject */
    function configPublicRoutes($stateProvider) {
        var MODULE_NAME = 'evento';
        var MODULE_PATH = 'modules/'+MODULE_NAME+'/';
        var STATE_PATH = 'app.private.';
        $stateProvider
            .state(STATE_PATH+MODULE_NAME, {
                url: '/'+MODULE_NAME,
                abstract: false,
                controller: 'EventoController',
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
            .state(STATE_PATH+MODULE_NAME+'.confirmar', {
                url: '/confirmar',
                controller: 'EventoController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/confirmar-view.html',
                resolve: {
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.recusar', {
                url: '/recusar',
                controller: 'EventoController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/recusar-view.html',
                resolve: {
                },
                params: {
                    reuniao: null
                }
            });
    }
})();
