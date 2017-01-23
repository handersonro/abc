(function() {
    'use strict';

    angular
        .module('sisagmApp.core.services')
        .factory('stateHandler', stateHandler);

    stateHandler.$inject = ['$rootScope', '$state', '$sessionStorage',  '$window',
        'Auth', 'Principal'];

    function stateHandler($rootScope, $state, $sessionStorage,  $window,
        Auth, Principal) {
        return {
            initialize: initialize
        };

        function initialize() {

            var stateChangeStart = $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams, fromState) {
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;
                $rootScope.fromState = fromState;

                if (toState.external) {
                    event.preventDefault();
                    $window.open(toState.url, '_self');
                }

                if (Principal.isIdentityResolved()) {
                    Auth.authorize();
                }

            });

            var stateChangeSuccess = $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {
                if(fromState && fromState.name === 'app.public.login.entrar'){
                    history.go(0);
                    // location.reload();
                    // $state.go('app.private.home.pagina-inicial',{reload:true},{reload:true})
                }
                if(toState && toState.name === 'app.public.login.entrar'){
                    // history.go(0)
                }
                // Set the page title key to the one configured in state or use default one
                // if (toState.data.pageTitle) {
                //     titleKey = toState.data.pageTitle;
                // }
                // $window.document.title = titleKey;
            });

            $rootScope.$on('$destroy', function () {
                if(angular.isDefined(stateChangeStart) && stateChangeStart !== null){
                    stateChangeStart();
                }
                if(angular.isDefined(stateChangeSuccess) && stateChangeSuccess !== null){
                    stateChangeSuccess();
                }
            });
        }
    }
})();
