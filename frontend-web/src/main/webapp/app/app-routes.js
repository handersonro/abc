(function(){
    angular
        .module('sisagmApp.routes')
        .config(configRoutesApp);

    /* @ngInject */
    function configRoutesApp($ocLazyLoadProvider, $stateProvider, $urlRouterProvider){
        $stateProvider
            .state('app', {
               url: '',
               controller: 'AppController',
               controllerAs: 'appCtrl',
               abstract: true,
               templateUrl: 'app-view.html',
               resolve:  {
                    /* @ngInject */
                   /*'endpoint': function(CASService, $q, Restangular, AlertsManager){
                        var retorno = $q.defer();

                        CASService.endPointBackend('sisagm.backend.url').then(
                            function(urlEndpoint){
                                Restangular.setBaseUrl(urlEndpoint.nome);
                                retorno.resolve();
                            },
                            function(error){
                                AlertsManager.addError('Não foi possível recuperar o endpoint');
                                retorno.resolve();
                            }
                        );

                        return retorno.promise;
                   },*/

                    /* @ngInject */
                   /*'checkConnection': function($q, Restangular, app, Usuario, endpoint, AlertsManager, CASService){
                        var retorno = $q.defer();

                        CASService.usuarioAutenticado().then(
                            function(informacoesUsuario){
                                Usuario.informacoesUsuario = informacoesUsuario;
                                retorno.resolve();
                            },
                            function(error){
                                AlertsManager.addError('Não foi possível encontrar o backend');
                                retorno.reject();
                            }
                        );

                        return retorno.promise;
                   },*/
                   /* @ngInject */
                  /*'sincronizarUsuario': function($q, checkConnection,CASService){
                       var retorno = $q.defer();

                       CASService.sincronizarUsuario().then(
                           function(){
                               retorno.resolve();
                           },
                           function(error){
                               AlertsManager.addError('Não foi possível sincronizar o usuário');
                               retorno.reject();
                           }
                       );

                       return retorno.promise;
                  }*/

               }
           });

        $urlRouterProvider.otherwise('/private');
    }
})();
