(function() {
    'use strict';

    angular
        .module('sisagmApp.core.autorizacao')
        .factory('Auth', Auth);

    /* @ngInject */
    function Auth ($rootScope, $state, $localStorage, $q, Principal) {
        var service = {
            authorize: authorize
        };

        return service;

        function authorize (force) {
            var authReturn = Principal.identity(force).then(authThen);

            return authReturn;

            function authThen () {
                if(!($rootScope.toState && $rootScope.toState.name.indexOf("app.public") !== -1)) {
                    console.log('ESTOU AQUI');
                    var isAuthenticated = Principal.isAuthenticated();
                    if (!$rootScope.logar && !$localStorage.authenticationToken && $rootScope.toState === undefined) {
                        // NESSA SITUACAO O USUARIO DEU UM REFRESH NA PAGINA E NÃO POSSUE UM toState
                        $rootScope.logar = true;
                        $state.go('app.public.login.entrar');
                    } else {
                        $rootScope.logar = false;
                    }

                    if ($localStorage.authenticationToken === undefined && $rootScope.toState && $rootScope.toState.name !== 'app.public.login.entrar') {
                        //NESSE MOMENTO ESTÁ TENTANDO ACESSAR UM RECURSO NÃO PERMITIDO SEM TOKEN
                        $state.go('app.public.login.entrar');
                    }

                    if ($rootScope.toState && $rootScope.toState.data.authorities && $rootScope.toState.data.authorities.length > 0 && !Principal.hasAnyAuthority($rootScope.toState.data.authorities)) {
                        if (isAuthenticated) {
                            console.log('SEM', $rootScope.toState.data.authorities);
                            // user is signed in but not authorized for desired state
                            //SEM AUTORIZAACO
                            // $state.go('app.private.home.pagina-inicial');
                        }
                        else {
                            // $state.go("app.public.login.entrar");
                            //SEM AUTORIZAACO

                            // user is not authenticated. stow the state they wanted before you
                            // storePreviousState($rootScope.toState.name, $rootScope.toStateParams);
                            // $state.go('app.private.home.pagina-inicial');
                        }
                    }
                }
            }
        }

    }
})();
