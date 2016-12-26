(function(){
    'use strict';

    configPublicRoutes.$inject = ["$stateProvider"];
    angular
        .module('sisagmApp.public.routes')
        .config(configPublicRoutes);

    /* @ngInject */
    function configPublicRoutes($stateProvider) {
        $stateProvider
            .state( 'app.public', {
                url: '/public',
                controller: 'PublicController',
                controllerAs: 'vm',
                templateUrl: 'modules/public/views/public-view.html',
                resolve:  {

                },
                ncyBreadcrumb: {
                    skip: true
                },
                params: {
                    callback: null
                }
            });
    }
})();
