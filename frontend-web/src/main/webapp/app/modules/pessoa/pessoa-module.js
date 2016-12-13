(function(){
    "use strict";

    angular.module('pessoa.controllers', [] );
    angular.module('pessoa.services', []);
    angular.module('pessoa.routes', [] );
    angular.module('pessoa.directives', [] );
    angular.module('pessoa.filters', [] );
    angular.module('pessoa.model', ['sisagmApp.core.services'] );

    angular.module('pessoa', [
        'pessoa.controllers',
        'pessoa.services',
        'pessoa.routes',
        'pessoa.directives',
        'pessoa.filters',
        'pessoa.model'
    ]);
})();
