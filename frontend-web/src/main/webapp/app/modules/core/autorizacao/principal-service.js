/**
 * Created by joaopedromilhome on 13/01/17.
 */
(function(){
    angular
        .module('sisagmApp')
        .factory('Principal', Principal);

    function Principal ($q, UsuarioLogado) {
        var _identity,
            _authenticated = false;

        var service = {
            authenticate: authenticate,
            hasAnyAuthority: hasAnyAuthority,
            hasAuthority: hasAuthority,
            identity: identity,
            isAuthenticated: isAuthenticated,
            isIdentityResolved: isIdentityResolved
        };

        return service;

        function authenticate (identity) {
            _identity = identity;
            _authenticated = identity !== null;
        }

        function hasAnyAuthority (authorities) {
            if (!_authenticated || !_identity || !_identity.authorities) {
                return false;
            }
            for (var j = 0; j < _identity.authorities.length; j++) {
                for (var i = 0; i < authorities.length; i++) {
                    if (_identity.authorities.map(function (e) {
                            return e.funcionalidades;
                        })[j].map(function (e) {
                            return e.funcionalidade;
                        }).indexOf(authorities[i]) !== -1) {
                        return true;
                    }
                }
            }
            return false;
        }

        function hasAuthority (authority) {
            if (!_authenticated) {
                return $q.when(false);
            }
            return this.identity().then(function(_id) {
                for (var i = 0; i < _id.authorities.length; i++) {
                    if(_id.authorities.map(function(e) { return e.funcionalidades; })[i].map(function(e) { return e.funcionalidade; }).indexOf(authority) !== -1){
                        return true;
                    }
                }
                return false;
               },
                function(){
                return false;
            });
        }

        function identity (force) {
            var deferred = $q.defer();

            if (force === true) {
                _identity = undefined;
            }

            // check and see if we have retrieved the identity data from the server.
            // if we have, reuse it by immediately resolving
            if (angular.isDefined(_identity)) {
                deferred.resolve(_identity);

                return deferred.promise;
            }

            // retrieve the identity data from the server, update the identity object, and then resolve.
            UsuarioLogado.obterUsuario()
                .then(getUsuarioLogadoThen)
                .catch(getUsuarioLogadoCatch);

            return deferred.promise;

            function getUsuarioLogadoThen (account) {
                _identity = account;
                _authenticated = true;
                deferred.resolve(_identity);
            }

            function getUsuarioLogadoCatch () {
                _identity = null;
                _authenticated = false;
                deferred.resolve(_identity);
            }
        }

        function isAuthenticated () {
            return _authenticated;
        }

        function isIdentityResolved () {
            return angular.isDefined(_identity);
        }
    }
})();
