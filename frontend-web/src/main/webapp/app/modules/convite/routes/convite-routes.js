(function(){
    'use strict';

    angular

        .module('sisagmApp.convite.routes')
        .config(configPublicRoutes);

    /* @ngInject */
    function configPublicRoutes($stateProvider) {
        var MODULE_NAME = 'convite';
        var MODULE_PATH = 'modules/'+MODULE_NAME+'/';
        var STATE_PATH = 'app.private.';
        $stateProvider
            .state(STATE_PATH+MODULE_NAME, {
                url: '/'+MODULE_NAME,
                abstract: false,
                controller: 'ConviteController',
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
            .state(STATE_PATH+MODULE_NAME+'.inserir-convite', {
                url: '/inserir-convite',
                controller: 'ConviteInserirConviteController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/convite-inserir-convite-view.html',
                resolve: {
                }
            })
            .state(STATE_PATH+MODULE_NAME+'.editar-convite', {
                url: '/editar-convite',
                controller: 'ConviteEditarConviteController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/convite-editar-convite-view.html',
                resolve: {
                },
                params: {
                    convite: null
                }
            })

            .state(STATE_PATH+MODULE_NAME+'.pesquisar-convite', {
                url: '/pesquisar-convite',
                controller: 'ConvitePesquisarConviteController',
                controllerAs: 'vm',
                templateUrl: MODULE_PATH+'views/convite-pesquisar-convite-view.html',
                params: {
                    filtro: {
                        filtros: { noObservacao : '', noDespacho: '', tipoEvento: '', idLocalidade : '',remetente:'',descricao:'',flEventoInternacional:'',dtInicioEvento:'',dtFimEvento:'',dataCadInicial:'',dataCadFinal:'',conviteValidacaoEnum:''},
                        currentPage: 1,
                        pageSize: 20,
                        sortFields: 'remetente',
                        sortDirections: 'asc'
                    }
                },
                resolve: {
                }
            });
    }
})();
