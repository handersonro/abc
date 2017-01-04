(function(){
    "use strict";

    angular.module('sisagmApp.login.controllers', [] );
    angular.module('sisagmApp.login.services', ['sisagmApp.core.services'] );
    angular.module('sisagmApp.login.routes', [] );

    angular
        .module('sisagmApp.login', [
            'sisagmApp.login.controllers',
            'sisagmApp.login.services',
            'sisagmApp.login.routes'
        ]);
})();
