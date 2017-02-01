(function(){
    "use strict";

    angular.module('sisagmApp.reuniao.controllers', ['sisagmApp.evento'] );
    angular.module('sisagmApp.reuniao.services', ['sisagmApp.core.services'] );
    angular.module('sisagmApp.reuniao.routes', [] );

    angular
        .module('sisagmApp.reuniao', [
            'sisagmApp.reuniao.controllers',
            'sisagmApp.reuniao.services',
            'sisagmApp.reuniao.routes'
        ]);
})();
