(function(){
    'use strict';

    angular
        .module('sisagmApp')
        .config(configPublicRoutes);

    /* @ngInject */
    function configPublicRoutes($stateProvider,$injector) {
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
                    callback: function(){
                    }
                }
            });

    }
})();
