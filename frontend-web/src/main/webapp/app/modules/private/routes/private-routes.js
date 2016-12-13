(function(){
    'use strict';

    angular

        .module('sisagmApp.private.routes')
        .config(configPrivateRoutes);

    /* @ngInject */
    function configPrivateRoutes($stateProvider, $ocLazyLoadProvider) {
        $stateProvider
            .state( 'app.private', {
                url: '/private',
                controller: 'PrivateController',
                controllerAs: 'vm',
                templateUrl: 'modules/private/views/private-view.html',
                resolve:  {
                    /* @ngInject */
                    'translate': function($translatePartialLoader, $translate) {
                        $translatePartialLoader.addPart('core');
                        return $translate.refresh();
                    }
                },
                ncyBreadcrumb: {
                    skip: true
                },
                params: {
                    callback: null
                },
                /* @ngInject */
                onEnter: function($stateParams){
                    //console.log("AEAE");
                    if($stateParams.callback && $stateParams.callback.enter){
                        var callbackPreState = $stateParams.callback.enter;
                        callbackPreState();
                        delete $stateParams.callback.enter;
                    }
                }
                // ,                ,
                // onEnter: function(Usuario, $state){
                //     if ( !Usuario.getLogin().login ){
                //         $state.go("app.public.login.efetuar-login");
                //     }
                // }
            });
    }
})();
