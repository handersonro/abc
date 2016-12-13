(function(){
    "use strict";

    angular.module('sisagmApp.pessoas.controllers', [] );
    angular.module('sisagmApp.pessoas.services', ['sisagmApp.core.services'] );
    angular.module('sisagmApp.pessoas.routes', [] );

    angular
        .module('sisagmApp.pessoas', [
            'sisagmApp.pessoas.controllers',
            'sisagmApp.pessoas.services',
            'sisagmApp.pessoas.routes'
        ]);
})();
