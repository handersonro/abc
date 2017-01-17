(function(){
    angular
        .module('sisagmApp')
        .constant('baseURL','http://localhost:8080/sisagm/api/')
        .config(configDev);

    /* @ngInject */
    function configDev(RestangularProvider,baseURL){
		RestangularProvider.setBaseUrl(baseURL);
    }
})();
