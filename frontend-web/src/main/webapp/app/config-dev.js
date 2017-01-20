(function(){
    angular
        .module('sisagmApp')
        .constant('baseURL','http://192.168.56.10:28080/sisagm-api/api/')
        .config(configDev);

    /* @ngInject */
    function configDev(RestangularProvider,baseURL){
		RestangularProvider.setBaseUrl(baseURL);
    }
})();
