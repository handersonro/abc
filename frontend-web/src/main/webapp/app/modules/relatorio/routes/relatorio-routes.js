(function(){
    'use strict';

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
                },
                data: {
                    authorities: []
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.emitir-relatorio', {
                url: '/emitir-relatorio',
                controller: 'RelatorioEmitirRelatorioController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/relatorio-emitir-relatorio-view.html',
                resolve: {
                },
                data: {
                    authorities: []
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.emitir-relatorio-convite', {
                url: '/emitir-relatorio-convite',
                controller: 'RelatorioEmitirRelatorioConviteController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/relatorio-emitir-relatorio-convite-view.html',
                resolve: {
                },
                data: {
                    authorities: []
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.emitir-relatorio-reunioes', {
                url: '/emitir-relatorio-reunioes',
                controller: 'RelatorioEmitirRelatorioReunioesController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/relatorio-emitir-relatorio-reunioes-view.html',
                resolve: {
                },
                data: {
                    authorities: []
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.emitir-relatorio-auditoria', {
                url: '/emitir-relatorio-auditoria',
                controller: 'RelatorioEmitirRelatorioAuditoriaController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/relatorio-emitir-relatorio-auditoria-view.html',
                resolve: {
                },
                data: {
                    authorities: []
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.relatorio-auditoria', {
            url: '/relatorio-auditoria',
            controller: 'RelatorioController',
            controllerAs: 'vm',
            templateUrl: MODULE_PATH+'views/relatorio-auditoria.html',
            resolve: {
            },
                data: {
                    authorities: []
                }
        });
    }
})();
