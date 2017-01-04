(function(){
    "use strict";

    angular.module('sisagmApp.home.controllers', [] );
    angular.module('sisagmApp.home.services', ['sisagmApp.core.services'] );
    angular.module('sisagmApp.home.routes', [] );

    angular
        .module('sisagmApp.home', [
            'sisagmApp.home.controllers',
            'sisagmApp.home.services',
            'sisagmApp.home.routes'
        ]);
})();
