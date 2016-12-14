(function(){
    "use strict";

    angular.module('sisagmApp.private.controllers', [] );
    angular.module('sisagmApp.private.services', ['sisagmApp.core.services'] );
    angular.module('sisagmApp.private.routes', ['sisagmApp.routes'] );
    angular.module('sisagmApp.private.diretivas.status', [] );

    angular
        .module('sisagmApp.private', [
            'sisagmApp.private.controllers',
            'sisagmApp.private.services',
            'sisagmApp.private.routes',
            'menu'
        ]);
})();
