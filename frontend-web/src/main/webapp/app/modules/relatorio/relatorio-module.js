(function(){
    "use strict";

    angular.module('sisagmApp.relatorio.controllers', ['sisagmApp.evento.services'] );
    angular.module('sisagmApp.relatorio.services', ['sisagmApp.core.services'] );
    angular.module('sisagmApp.relatorio.routes', [] );

    angular
        .module('sisagmApp.relatorio', [
            'sisagmApp.relatorio.controllers',
            'sisagmApp.relatorio.services',
            'sisagmApp.relatorio.routes'
        ]);
})();
