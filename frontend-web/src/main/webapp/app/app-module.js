(function(){
    angular.module('sisagmApp.controllers', []);
    angular.module('sisagmApp.routes', ['ui.router', 'oc.lazyLoad']);

    angular
        .module('sisagmApp', [
            'ngMaterial',
            'restangular',
            'ngTable',
            'ngMdIcons',
            'pascalprecht.translate',
            'ncy-angular-breadcrumb',

            'sisagmApp.routes',
            'sisagmApp.core',
            'sisagmApp.controllers',

            'sisagmApp.private',
            'sisagmApp.public',
            'sisagmApp.login',
            'menu',


            'da-loader',
            'da-infinity-scroll',
            '$alerts',


            'pessoa',


        ]);
})();
