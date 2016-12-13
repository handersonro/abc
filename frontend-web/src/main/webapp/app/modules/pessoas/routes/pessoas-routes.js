(function(){
    'use strict';

    angular

        .module('sisagmApp.pessoas.routes')
        .config(configPublicRoutes);

    /* @ngInject */
    function configPublicRoutes($stateProvider) {
        var MODULE_NAME = 'pessoas';
        var MODULE_PATH = 'modules/'+MODULE_NAME+'/';
        var STATE_PATH = 'app.private.';
        $stateProvider
            .state(STATE_PATH+MODULE_NAME, {
                url: '/'+MODULE_NAME,
                abstract: false,
                controller: 'PessoasController',
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
            .state(STATE_PATH+MODULE_NAME+'.inserir-participante', {
                url: '/inserir-participante',
                controller: 'PessoasInserirParticipanteController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/pessoas-inserir-participante-view.html',
                resolve: {
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.inserir-remetente', {
                url: '/inserir-remetente',
                controller: 'PessoasInserirRemetenteController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/pessoas-inserir-remetente-view.html',
                resolve: {
                }
            });
    }
})();
