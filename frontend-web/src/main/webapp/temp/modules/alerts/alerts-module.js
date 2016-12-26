(function(){
    angular.module('$alerts.controllers', []);
    angular.module('$alerts.directives', []);
    angular.module('$alerts.services', []);
    angular.module('$alerts.filters', []);

    angular
        .module('$alerts', [
            '$alerts.controllers',
            '$alerts.directives',
            '$alerts.services',
            '$alerts.filters',
            'oc.lazyLoad'
        ]);
})();
