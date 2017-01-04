(function(){
    "use strict";

    angular.module('menu.controllers', [] );
    angular.module('menu.services', [] );
    angular.module('menu.routes', [] );
    angular.module('menu.directives', [] );
    angular.module('menu.filters', [] );

    angular.module('menu', [
        'menu.controllers',
        'menu.services',
        'menu.routes',
        'menu.directives',
        'menu.filters'
    ]);
})();
