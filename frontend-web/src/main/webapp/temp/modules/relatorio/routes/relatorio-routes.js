(function(){
    'use strict';

    configPublicRoutes.$inject = ["$stateProvider"];
    angular

        .module('sisagmApp.relatorio.routes')
        .config(configPublicRoutes);

    /* @ngInject */
    function configPublicRoutes($stateProvider) {
        var MODULE_NAME = 'relatorio';
        var MODULE_PATH = 'modules/'+MODULE_NAME+'/';
        var STATE_PATH = 'app.private.';
        $stateProvider
            .state(STATE_PATH+MODULE_NAME, {
                url: '/'+MODULE_NAME,
                abstract: false,
                controller: 'RelatorioController',
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
            .state(STATE_PATH+MODULE_NAME+'.inserir-relatorio', {
                url: '/inserir-relatorio',
                controller: 'RelatorioInserirRelatorioController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/relatorio-inserir-relatorio-view.html',
                resolve: {
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.inserir-relatorio-convite', {
                url: '/inserir-relatorio-convite',
                controller: 'RelatorioInserirRelatorioConviteController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/relatorio-inserir-relatorio-convite-view.html',
                resolve: {
                }
            });
    }
})();
