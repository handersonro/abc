(function(){
    "use strict";

    angular.module('sisagmApp.autoridade.controllers', [] );
    angular.module('sisagmApp.autoridade.services', ['sisagmApp.core.services'] );
    angular.module('sisagmApp.autoridade.routes', [] );

    angular
        .module('sisagmApp.autoridade', [
            'sisagmApp.autoridade.controllers',
            'sisagmApp.autoridade.services',
            'sisagmApp.autoridade.routes'
        ]);
})();
