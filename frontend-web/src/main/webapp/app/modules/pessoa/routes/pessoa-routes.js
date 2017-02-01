(function(){
    'use strict';

    angular
        .module('pessoa.routes')
        .config(configRoutes);

    /* @ngInject */
    function configRoutes($stateProvider, $ocLazyLoadProvider) {
        var MODULE_NAME = 'pessoa';
        var MODULE_PATH = 'modules/'+MODULE_NAME+'/';
        var STATE_PATH = 'app.private.';

        $stateProvider
            .state(STATE_PATH+'pessoa', {
                url: '/pessoa',
                abstract: false,
                data: {
                    authorities: ['PESQUISAR_REMETENTE']
                },
                controller: 'PessoaController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/'+MODULE_NAME+'-view.html',

                resolve: {
                    /* @ngInject */
                    'translate': function($translatePartialLoader, $translate) {
                        $translatePartialLoader.addPart(MODULE_NAME);
                        return $translate.refresh();
                    }
                },
                onExit: function($translatePartialLoader, $translate){
                    $translatePartialLoader.deletePart(MODULE_PATH, true);
                },


            })
            .state(STATE_PATH+'pessoa.inserir', {
                url: '/inserir',
                controller: 'PessoaInserirController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/pessoa-cadastro-view.html',
                resolve: {
                },
                ncyBreadcrumb: {
                    label: '{{"Inserir pessoa" | translate}}',
                    parent: 'app.private'
                },
                data: {
                    authorities: []
                }
            });
    }
})();
