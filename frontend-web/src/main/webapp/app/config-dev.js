(function(){
    angular
        .module('sisagmApp')
        .config(configDev);

    /* @ngInject */
    function configDev(RestangularProvider){
		RestangularProvider.setBaseUrl();
    }
})();
