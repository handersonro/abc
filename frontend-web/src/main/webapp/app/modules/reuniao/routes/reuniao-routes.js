(function(){
    'use strict';

    angular

        .module('sisagmApp.reuniao.routes')
        .config(configPublicRoutes);

    /* @ngInject */
    function configPublicRoutes($stateProvider) {
        var MODULE_NAME = 'reuniao';
        var MODULE_PATH = 'modules/'+MODULE_NAME+'/';
        var STATE_PATH = 'app.private.';
        $stateProvider
            .state(STATE_PATH+MODULE_NAME, {
                url: '/'+MODULE_NAME,
                abstract: false,
                controller: 'ReuniaoController',
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
            .state(STATE_PATH+MODULE_NAME+'.inserir-reuniao', {
                url: '/inserir-reuniao',
                controller: 'ReuniaoInserirReuniaoController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/reuniao-inserir-reuniao-view.html',
                resolve: {
                },
                data: {
                    authorities: ['INCLUIR_REUNIAO']
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.emitir-lista', {
                url: '/emitir-lista',
                controller: 'ReuniaoEmitirReuniaoController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/relatorio-emitir-lista-view.html',
                resolve: {
                },
                data: {
                    authorities: []
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.editar-reuniao', {
                url: '/editar-reuniao',
                controller: 'ReuniaoEditarReuniaoController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/reuniao-inserir-reuniao-view.html',
                resolve: {
                },
                params: {
                    reuniao: null
                },
                data: {
                    authorities: ['PESQUISAR_REUNIAO']
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.pesquisar-reuniao', {
                url: '/pesquisar-reuniao',
                controller: 'ReuniaoPesquisarReuniaoController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/reuniao-pesquisar-reuniao-view.html',
                params: {
                    filtro: {
                        filtros: { noObservacao: '',noRemetente: '',noDespacho: '', tipoEvento: '', noLocalEvento : '', noAssunto:'',descricao:'', noPauta:'', dtInicioEvento:'',dtFimEvento:'',dataCadInicial:'',dataCadFinal:'',conviteValidacao:'',participantes: ''},
                        currentPage: 1,
                        pageSize: 20,
                        sortFields: 'id',
                        sortDirections: 'asc'
                    }

                },
                resolve: {
                },
                data: {
                    authorities: ['PESQUISAR_REUNIAO']
                }
            });
    }
})();
