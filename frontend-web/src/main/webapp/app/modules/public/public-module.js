(function(){
    "use strict";

    angular.module('sisagmApp.public.controllers', [] );
    angular.module('sisagmApp.public.services', ['sisagmApp.core.services'] );
    angular.module('sisagmApp.public.routes', [] );

    angular
        .module('sisagmApp.public', [
            'sisagmApp.public.controllers',
            'sisagmApp.public.services',
            'sisagmApp.public.routes'
        ]);
})();
