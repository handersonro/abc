(function() {
    'use strict';

    angular
        .module('sisagmApp.core.autorizacao')
        .factory('Auth', Auth);

    /* @ngInject */
    function Auth ($rootScope, $state, $sessionStorage, $q, Principal) {
        var service = {
            authorize: authorize
        };

        return service;

        function authorize (force) {
            var authReturn = Principal.identity(force).then(authThen);

            return authReturn;

            function authThen () {
                var isAuthenticated = Principal.isAuthenticated();

                // // an authenticated user can't access to login and register pages
                // if (isAuthenticated && $rootScope.toState.parent === 'account' && ($rootScope.toState.name === 'login' || $rootScope.toState.name === 'register' || $rootScope.toState.name === 'social-auth')) {
                //     $state.go('home');
                // }
                //
                // // recover and clear previousState after external login redirect (e.g. oauth2)
                // if (isAuthenticated && !$rootScope.fromState.name && getPreviousState()) {
                //     var previousState = getPreviousState();
                //     resetPreviousState();
                //     $state.go(previousState.name, previousState.params);
                // }
                //
                // if ($rootScope.toState.data.authorities && $rootScope.toState.data.authorities.length > 0 && !Principal.hasAnyAuthority($rootScope.toState.data.authorities)) {
                //     if (isAuthenticated) {
                //         // user is signed in but not authorized for desired state
                //         $state.go('accessdenied');
                //     }
                //     else {
                //         // user is not authenticated. stow the state they wanted before you
                //         // send them to the login service, so you can return them when you're done
                //         storePreviousState($rootScope.toState.name, $rootScope.toStateParams);
                //
                //         // now, send them to the signin state so they can log in
                //         $state.go('accessdenied').then(function() {
                //             LoginService.open();
                //         });
                //     }
                // }
            }
        }

    }
})();
