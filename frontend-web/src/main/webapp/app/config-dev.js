(function(){
    angular
        .module('sisagmApp')
        .constant('baseURL','http://sturdeswildfly01:8080/sisagm-backend/api/')
        .constant('versaoProjeto','${project.version}')
        .constant('ambiente','${ambiente.nome}')
        .config(configDev);

    /* @ngInject */
    function configDev(RestangularProvider,baseURL){
		RestangularProvider.setBaseUrl(baseURL);
    }
})();
