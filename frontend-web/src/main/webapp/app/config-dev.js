(function(){
    angular
        .module('sisagmApp')
        .config(configDev);

    /* @ngInject */
    function configDev(RestangularProvider){
		RestangularProvider.setBaseUrl('http://localhost:8080/sisagm/api/');
    }
})();
