(function(){
    angular
    .module('$alerts')
    .factory('httpMessageHandleInterceptor', httpMessageHandleInterceptor);

    function httpMessageHandleInterceptor($q, $log, $rootScope,$localStorage, $sessionStorage,$injector,$location){
        return {
            // optional method
            'request': function(config) {

                config.headers = config.headers || {};
                var token = $localStorage.authenticationToken || $sessionStorage.authenticationToken;
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }


                return config;
            },

            // optional method
            'requestError': function(rejection) {
                return $q.reject(rejection);
            },

            // optional method
            'response': function(response) {
                // do something on success
                return response;
            },

            // optional method
            'responseError': function(rejection) {
                var exceptions = rejection && rejection.data && rejection.data.erros || [];
                if (!(rejection.status === 401 && (rejection.data === '' || (rejection.data.path && rejection.data.path.indexOf('/api/account') === 0 )))) {
                    console.log('TENTANDO LOGAR')
                    // $rootScope.$emit('turismoApp.httpError', rejection);
                }
                if (rejection.status === 401) {
                    console.log('TENTANDO ACESSAR SEM ESTAR LOGADO')
                    delete $localStorage.authenticationToken;
                    var Principal = $injector.get('Principal');
                    if (Principal.isAuthenticated()) {
                        var Auth = $injector.get('Auth');
                        Auth.authorize(true);
                    }else{
                        $location.url('/public/login/entrar');
                    }

                }
                console.log('PASSOU')


                if( exceptions.length ){
                    for( var i in exceptions ){
                        $rootScope.$broadcast('responseErrorEvent', { type: exceptions[i].type, msg: exceptions[i].msg });
                    }
                }else if(rejection.status === -1){
                    $rootScope.$broadcast('responseErrorEvent', { type: "error", msg: "Impossível realizar a requisição para: "+ rejection.config.url });
                }

                return $q.reject(rejection);
            }
        };
    }
})();
