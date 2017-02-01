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
                },
                data: {
                    authorities: []
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.pesquisar-participante', {
                url: '/pesquisar-participante',
                controller: 'PessoasPesquisarParticipanteController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/pessoas-pesquisar-participante-view.html',
                params: {
                    filtro: {
                        filtros: { noParticipanteInterno : '', noCargo : '' , noEmail : '' , nuTelefone : ''},
                        currentPage: 1,
                        pageSize: 20,
                        sortFields: 'id',
                        sortDirections: 'asc'
                    }
                },
                resolve: {
                },
                data: {
                    authorities: ['PESQUISAR_PARTICIPANTE']
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.inserir-participante', {
                url: '/inserir-participante',
                controller: 'PessoasInserirParticipanteController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/pessoas-inserir-participante-view.html',
                resolve: {
                },
                data: {
                    authorities: ['INCLUIR_PARTICIPANTE']
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.editar-participante', {
                url: '/editar-participante',
                controller: 'PessoasEditarParticipanteController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/pessoas-inserir-participante-view.html',
                resolve: {
                },
                params: {
                    participante: null
                },
                data: {
                    authorities: ['PESQUISAR_PARTICIPANTE']
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.inserir-remetente', {
                url: '/inserir-remetente',
                controller: 'PessoasInserirRemetenteController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/pessoas-inserir-remetente-view.html',
                resolve: {
                },
                data: {
                    authorities: ['INCLUIR_REMETENTE']
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.pesquisar-remetente', {
                url: '/pesquisar-remetente',
                controller: 'PessoasPesquisarRemetenteController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/pessoas-pesquisar-remetente-view.html',
                params: {
                    filtro: {
                        filtros: { noRemetente : '', noCargo : '' , noEmail : '' , nuTelefone : ''},
                        currentPage: 1,
                        pageSize: 20,
                        sortFields: 'id',
                        sortDirections: 'asc'
                    }
                },
                resolve: {
                },
                data: {
                    authorities: ['PESQUISAR_REMETENTE']
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.editar-remetente', {
                url: '/editar-remetente',
                controller: 'PessoasEditarRemetenteController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/pessoas-inserir-remetente-view.html',
                resolve: {
                },
                params: {
                    remetente: null
                },
                data: {
                    authorities: ['PESQUISAR_REMETENTE']
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.help', {
            url: '/help',
            controller: 'PessoasEditarRemetenteController',
            controllerAs: 'vm',
            templateUrl: MODULE_PATH+'views/pessoas-help.html',
            resolve: {
            },
            params: {
                remetente: null
            },
            data: {
                authorities: []
            }
        });
    }
})();
