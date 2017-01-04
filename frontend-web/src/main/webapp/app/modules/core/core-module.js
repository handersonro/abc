(function(){
    angular.module('sisagmApp.core.directives', []);
    angular.module('sisagmApp.core.config', []);
    angular.module('sisagmApp.core.services', ['restangular']);
    angular.module('sisagmApp.core.filters', []);
    angular.module('sisagmApp.core.test', ['ngTable', 'ui.router', 'ngMaterial', 'restangular', 'oc.lazyLoad']);


    angular
        .module('sisagmApp.core', [
            'sisagmApp.core.directives',
            'sisagmApp.core.services',
            'sisagmApp.core.filters',
            'sisagmApp.core.config'
        ]);
})();
