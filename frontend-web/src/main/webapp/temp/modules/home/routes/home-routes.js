(function(){
    'use strict';

    configPublicRoutes.$inject = ["$stateProvider"];
    angular

        .module('sisagmApp.home.routes')
        .config(configPublicRoutes);

    /* @ngInject */
    function configPublicRoutes($stateProvider) {
        var MODULE_NAME = 'home';
        var MODULE_PATH = 'modules/'+MODULE_NAME+'/';
        var STATE_PATH = 'app.public.';
        $stateProvider
            .state(STATE_PATH+MODULE_NAME, {
                url: '/'+MODULE_NAME,
                abstract: false,
                controller: 'HomeController',
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
            .state(STATE_PATH+MODULE_NAME+'.pagina-inicial', {
                url: '/pagina-inicial',
                controller: 'PaginaInicialController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/pagina-inicial.html',
                resolve: {
                }
            });
    }
})();
