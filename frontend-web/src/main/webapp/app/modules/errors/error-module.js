(function(){
    "use strict";

    angular.module('sisagmApp.errors.controllers', [] );
    angular.module('sisagmApp.errors.services', ['sisagmApp.core.services'] );
    angular.module('sisagmApp.errors.routes', [] );

    angular
        .module('sisagmApp.errors', [
            'sisagmApp.errors.controllers',
            'sisagmApp.errors.services',
            'sisagmApp.errors.routes'
        ]);
})();
