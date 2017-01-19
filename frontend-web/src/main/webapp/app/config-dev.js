(function(){
    angular
        .module('sisagmApp')
        .constant('baseURL','http://sturdeswildfly01:28080/sisagm/api/')
        .config(configDev);

    /* @ngInject */
    function configDev(RestangularProvider,baseURL){
		RestangularProvider.setBaseUrl(baseURL);
    }
})();
