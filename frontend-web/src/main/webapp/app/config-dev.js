(function(){
    angular
        .module('sisagmApp')
        .constant('baseURL','${ambiente.url}')
        .constant('appURL','${app.url}')
        .constant('versaoProjeto','${project.version}')
        .constant('ambiente','${ambiente.nome}')
        .config(configDev);

    /* @ngInject */
    function configDev(RestangularProvider,baseURL){
        RestangularProvider.setBaseUrl(baseURL);
    }
})();
