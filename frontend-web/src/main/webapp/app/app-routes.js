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
                   authorize: ['Auth',
                       function (Auth) {
                           return Auth.authorize();
                       }
                   ]

                //    /* @ngInject */
                //    'endpoint': function($q, Restangular, AlertsManager, EndpointFrontend){
                //        var retorno = $q.defer();
                   //
                //        EndpointFrontend.one('locator/endpoint/backend').customGET('sisagm.url.backend').then(
                //            function(urlEndpoint){
                //                Restangular.setBaseUrl(urlEndpoint.nome);
                //                retorno.resolve();
                //            },
                //            function(error){
                //                AlertsManager.addError('Não foi possível recuperar o endpoint');
                //                retorno.resolve();
                //            }
                //        );
                   //
                //        return retorno.promise;
                //    }

               }
           })
            /* Importante para ANTÔNIO CESAR
            .state('teste', {
                url: '/teste',
                template: '<p>deu certo</p>'
            });
            */

        $urlRouterProvider.otherwise('/public/login/entrar');
    }
})();
