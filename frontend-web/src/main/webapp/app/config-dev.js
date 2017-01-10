(function(){
    angular
        .module('sisagmApp')
        .config(configDev);

    /* @ngInject */
    function configDev(RestangularProvider){
		RestangularProvider.setBaseUrl('http://sturdeswildfly01:8080/sisagm/api');
    }
})();
