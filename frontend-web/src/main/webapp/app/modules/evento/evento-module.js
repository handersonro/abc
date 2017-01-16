(function(){
    "use strict";

    angular.module('sisagmApp.evento.controllers', [] );
    angular.module('sisagmApp.evento.services', ['sisagmApp.core.services'] );
    angular.module('sisagmApp.evento.routes', [] );

    angular
        .module('sisagmApp.evento', [
            'sisagmApp.evento.controllers',
            'sisagmApp.evento.services',
            'sisagmApp.evento.routes'
        ]);
})();
