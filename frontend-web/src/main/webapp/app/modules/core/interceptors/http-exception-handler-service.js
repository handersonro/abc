(function(){
    angular
    .module('$alerts')
    .factory('httpMessageHandleInterceptor', httpMessageHandleInterceptor);

    function httpMessageHandleInterceptor($q, $log, $rootScope,$localStorage, $sessionStorage){
        return {
            // optional method
            'request': function(config) {

                config.headers = config.headers || {};
                var token = $localStorage.authenticationToken || $sessionStorage.authenticationToken;
                if (token) {
                    console.log('AUTENTICADO')
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
