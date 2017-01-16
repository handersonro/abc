(function(){
    "use strict";

    angular.module('sisagmApp.reuniao.controllers', [] );
    angular.module('sisagmApp.reuniao.services', ['sisagmApp.core.services'] );
    angular.module('sisagmApp.reuniao.routes', [] );

    angular
        .module('sisagmApp.evento', [
            'sisagmApp.evento.controllers',
            'sisagmApp.evento.services',
            'sisagmApp.evento.routes'
        ]);
})();
