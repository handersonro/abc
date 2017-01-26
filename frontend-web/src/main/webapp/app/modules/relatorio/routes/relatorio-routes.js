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
                params: {
                    filtro: {
                        filtros: {},
                        currentPage: 1,
                        pageSize: 20,
                        sortFields: 'id',
                        sortDirections: 'asc'
                    }

                },
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
                params: {
                    filtro: {
                        filtros: {},
                        currentPage: 1,
                        pageSize: 20,
                        sortFields: 'id',
                        sortDirections: 'asc'
                    }

                },
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
        })
        .state(STATE_PATH+MODULE_NAME+'.relatorio-solicitar-audiencia', {
            url: '/solicitar-audiencia',
            controller: 'RelatorioSolicitarAudienciaController',
            controllerAs: 'vm',
            templateUrl: MODULE_PATH+'views/relatorio-solicitar-audiencia-view.html',
            params: {
                filtro: {
                    filtros: {},
                    currentPage: 1,
                    pageSize: 20,
                    sortFields: 'id',
                    sortDirections: 'asc'
                }

            },
            resolve: {
            },
            data: {
                authorities: []
            }
        })
        .state(STATE_PATH+MODULE_NAME+'.relatorio-solicitar-auditoria', {
            url: '/solicitar-auditoria',
            controller: 'RelatorioSolicitarAuditoriaController',
            controllerAs: 'vm',
            templateUrl: MODULE_PATH+'views/relatorio-solicitar-auditoria-view.html',
            params: {
                filtro: {
                    filtros: {},
                    currentPage: 1,
                    pageSize: 20,
                    sortFields: 'id',
                    sortDirections: 'asc'
                }

            },
            resolve: {
            },
            data: {
                authorities: []
            }
        })
        .state(STATE_PATH+MODULE_NAME+'.relatorio-solicitar-convite', {
            url: '/solicitar-convite',
            controller: 'RelatorioSolicitarConviteController',
            controllerAs: 'vm',
            templateUrl: MODULE_PATH+'views/relatorio-solicitar-convite-view.html',
            params: {
                filtro: {
                    filtros: {},
                    currentPage: 1,
                    pageSize: 20,
                    sortFields: 'id',
                    sortDirections: 'asc'
                }

            },
            resolve: {
            },
            data: {
                authorities: []
            }
        })
        .state(STATE_PATH+MODULE_NAME+'.relatorio-solicitar-remetentes', {
            url: '/solicitar-remetentes',
            controller: 'RelatorioSolicitarRemetentesController',
            controllerAs: 'vm',
            templateUrl: MODULE_PATH+'views/relatorio-solicitar-remetentes-view.html',
            params: {
                filtro: {
                    filtros: {},
                    currentPage: 1,
                    pageSize: 20,
                    sortFields: 'id',
                    sortDirections: 'asc'
                }

            },
            resolve: {
            },
            data: {
                authorities: []
            }
        })
        .state(STATE_PATH+MODULE_NAME+'.relatorio-solicitar-reuniao', {
            url: '/solicitar-reuniao',
            controller: 'RelatorioSolicitarReuniaoController',
            controllerAs: 'vm',
            templateUrl: MODULE_PATH+'views/relatorio-solicitar-reuniao-view.html',
            params: {
                filtro: {
                    filtros: {},
                    currentPage: 1,
                    pageSize: 20,
                    sortFields: 'id',
                    sortDirections: 'asc'
                }

            },
            resolve: {
            },
            data: {
                authorities: []
            }
        });
    }
})();
