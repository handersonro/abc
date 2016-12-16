(function(){
    "use strict";

    angular.module('sisagmApp.audiencia.controllers', [] );
    angular.module('sisagmApp.audiencia.services', ['sisagmApp.core.services'] );
    angular.module('sisagmApp.audiencia.routes', [] );

    angular
        .module('sisagmApp.audiencia', [
            'sisagmApp.audiencia.controllers',
            'sisagmApp.audiencia.services',
            'sisagmApp.audiencia.routes'
        ]);
})();
