(function(){
    'use strict';

    angular

        .module('sisagmApp.errors.routes')
        .config(configPublicRoutes);

    /* @ngInject */
    function configPublicRoutes($stateProvider) {
        var MODULE_NAME = 'errors';
        var MODULE_PATH = 'modules/'+MODULE_NAME+'/';
        var STATE_PATH = 'app.public.';
        $stateProvider
            .state(STATE_PATH+MODULE_NAME, {
                url: '/'+MODULE_NAME,
                abstract: false,
                controller: 'ErrorController',
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
            .state(STATE_PATH+MODULE_NAME+'.401', {
                url: '/401',
                controller: 'Error401Controller',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/error-401-view.html',
                resolve: {
                },
                data: {
                    authorities: []
                }
            });
    }
})();
