(function(){
    "use strict";

    angular.module('sisagmApp.convite.controllers', [] );
    angular.module('sisagmApp.convite.services', ['sisagmApp.core.services'] );
    angular.module('sisagmApp.convite.routes', [] );

    angular
        .module('sisagmApp.convite', [
            'sisagmApp.convite.controllers',
            'sisagmApp.convite.services',
            'sisagmApp.convite.routes'
        ]);
})();
