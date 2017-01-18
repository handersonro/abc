(function(){
    'use strict';

    angular

        .module('sisagmApp.evento.routes')
        .config(configPublicRoutes);

    /* @ngInject */
    function configPublicRoutes($stateProvider) {
        var MODULE_NAME = 'evento';
        var MODULE_PATH = 'modules/'+MODULE_NAME+'/';
        var STATE_PATH = 'app.public.';
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
                }
            }).state(STATE_PATH+MODULE_NAME+'.confirmacao-nao-permitida', {
                url: '/confirmacao-nao-permitida',
                controller: 'EventoController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/confirmacao-nao-permitida-view.html',
                resolve: {
                }
             }).state(STATE_PATH+MODULE_NAME+'.recusar-nao-permitida', {
                url: '/recusar-nao-permitida',
                controller: 'EventoController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/recusar-nao-permitida-view.html',
                resolve: {
                }
            });

    }
})();
