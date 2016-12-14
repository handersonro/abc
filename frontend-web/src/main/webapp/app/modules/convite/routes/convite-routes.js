(function(){
    'use strict';

    angular

        .module('sisagmApp.convite.routes')
        .config(configPublicRoutes);

    /* @ngInject */
    function configPublicRoutes($stateProvider) {
        var MODULE_NAME = 'convite';
        var MODULE_PATH = 'modules/'+MODULE_NAME+'/';
        var STATE_PATH = 'app.private.';
        $stateProvider
            .state(STATE_PATH+MODULE_NAME, {
                url: '/'+MODULE_NAME,
                abstract: false,
                controller: 'ConviteController',
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
            .state(STATE_PATH+MODULE_NAME+'.inserir-convite', {
                url: '/inserir-convite',
                controller: 'ConviteInserirConviteController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/convite-inserir-convite-view.html',
                resolve: {
                }
            });
    }
})();
