(function(){
    'use strict';

    angular
        .module('sisagmApp')
        .config(configPublicRoutes);

    /* @ngInject */
    function configPublicRoutes($stateProvider,$injector) {

        console.log('A1 ');

            // $http({method: 'GET', url: 'http://localhost:8080/sisagm/api/autenticar/account', headers: {
            //     'Authorization': 'Bearer '+ retorno.id_token}
            // });

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

                            console.log('A6');
                    }
                }
            });

    }
})();
