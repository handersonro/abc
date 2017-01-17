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
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.inserir-reuniao', {
                url: '/inserir-reuniao',
                controller: 'ReuniaoInserirReuniaoController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/reuniao-inserir-reuniao-view.html',
                resolve: {
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
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.pesquisar-reuniao', {
                url: '/pesquisar-reuniao',
                controller: 'ReuniaoPesquisarReuniaoController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/reuniao-pesquisar-reuniao-view.html',
                params: {
                    filtro: {
                        filtros: { noObservacao: '',noRemetente: '',noDespacho: '', tipoEvento: '', noLocalEvento : '', noAssunto:'',descricao:'', noPauta:'', dtInicioEvento:'',dtFimEvento:'',dataCadInicial:'',dataCadFinal:'',conviteValidacaoEnum:''},
                        currentPage: 1,
                        pageSize: 20,
                        sortFields: 'id',
                        sortDirections: 'asc'
                    }
                },
                resolve: {
                }
            });
    }
})();
