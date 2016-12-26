(function(){
    'use strict';

    configRoutes.$inject = ["$stateProvider", "$ocLazyLoadProvider"];
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
                controller: 'PessoaController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/'+MODULE_NAME+'-view.html',
                resolve: {
                    /* @ngInject */
                    'translate': ["$translatePartialLoader", "$translate", function($translatePartialLoader, $translate) {
                        $translatePartialLoader.addPart(MODULE_NAME);
                        return $translate.refresh();
                    }]
                },
                onExit: ["$translatePartialLoader", "$translate", function($translatePartialLoader, $translate){
                    $translatePartialLoader.deletePart(MODULE_PATH, true);
                }],

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
                }
            });
    }
})();
