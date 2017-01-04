(function(){
    "use strict";

    angular.module('sisagmApp.relatorio.controllers', [] );
    angular.module('sisagmApp.relatorio.services', ['sisagmApp.core.services'] );
    angular.module('sisagmApp.relatorio.routes', [] );

    angular
        .module('sisagmApp.relatorio', [
            'sisagmApp.relatorio.controllers',
            'sisagmApp.relatorio.services',
            'sisagmApp.relatorio.routes'
        ]);
})();
