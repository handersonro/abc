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
                var isAuthenticated = Principal.isAuthenticated();

                if( !$rootScope.logar && !$localStorage.authenticationToken ){
                     // NESSA SITUACAO O USUARIO DEU UM REFRESH NA PAGINA E NÃO POSSUE UM toState
                    $rootScope.logar = true;
                    $state.go('app.public.login.entrar');
                    return;
                }else{
                    $rootScope.logar = false;
                    if($localStorage.authenticationToken === undefined  && $rootScope.toState && $rootScope.toState.name !== 'app.public.login.entrar'){ //NESSE MOMENTO ESTÁ TENTANDO ACESSAR UM RECURSO NÃO PERMITIDO SEM TOKEN
                        $state.go('app.public.login.entrar');
                        return;
                    }
                }

                if(!$rootScope.reload && $localStorage.authenticationToken != undefined && $rootScope.toState == undefined && $rootScope.fromState == undefined){
                    $rootScope.reload = true;
                    $rootScope.sair = true;
                    $rootScope.logar = true;
                    $rootScope.isAuthenticated = true;
                    $state.go("app.public.home.pagina-inicial");
                    return
                }else{
                    $rootScope.reload = false;
                }

                if ( !$rootScope.isAuthenticated && $localStorage.authenticationToken && $rootScope.toState && ($rootScope.fromState.name === 'app.public.login.entrar')) {
                    $rootScope.isAuthenticated = true;
                    $rootScope.reload = true;
                    $rootScope.sair = true;
                    $rootScope.logar = true;
                    location.reload();
                }else {
                    $rootScope.isAuthenticated = false;
                }


                if ( !$rootScope.sair && $localStorage.authenticationToken === undefined  && $rootScope.toState  && ($rootScope.toState.name === 'app.public.login.entrar')) {
                    $rootScope.sair = true;
                    $rootScope.logar = true;
                    location.reload();
                }else {
                    $rootScope.sair = false;
                }

                // console.log('PARAMS ',$rootScope.isLogout)
                //
                // if ( !$rootScope.isLogout && !$localStorage.authenticationToken && $rootScope.toState && ($rootScope.toState.name === 'app.public.login.entrar')) {
                //     console.log('SAINDO');
                //     $rootScope.isLogout = true;
                //     $state.go("app.public.login.entrar");
                //     return;
                // }else {
                //     $rootScope.isLogout = false;
                // }

                // // recover and clear previousState after external login redirect (e.g. oauth2)
                // if (isAuthenticated && !$rootScope.fromState.name && getPreviousState()) {
                //     var previousState = getPreviousState();
                //     resetPreviousState();
                //     $state.go(previousState.name, previousState.params);
                // }
                //

                if ($rootScope.toState && $rootScope.toState.data.authorities && $rootScope.toState.data.authorities.length > 0 && !Principal.hasAnyAuthority($rootScope.toState.data.authorities)) {
                    if (isAuthenticated) {
                        console.log('SEM',$rootScope.toState.data.authorities);
                        // user is signed in but not authorized for desired state
                        //SEM AUTORIZAACO
                        // $state.go('app.public.home.pagina-inicial');
                    }
                    else {
                        // $state.go("app.public.login.entrar");
                        //SEM AUTORIZAACO

                        // user is not authenticated. stow the state they wanted before you
                        // storePreviousState($rootScope.toState.name, $rootScope.toStateParams);
                        // $state.go('app.public.home.pagina-inicial');
                    }
                }else{
                    // $state.go("app.public.login.entrar");

                }
            }
        }

    }
})();
