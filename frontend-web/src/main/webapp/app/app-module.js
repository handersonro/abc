(function(){
    angular.module('sisagmApp.controllers', []);
    angular.module('sisagmApp.routes', ['ui.router', 'oc.lazyLoad']);

    angular
        .module('sisagmApp', [
            'ngMaterial',
            'restangular',
            'ngTable',
            'ngMdIcons',
            'ngMask',
            'ngMessages',
            'textAngular',
            'ngMaterialDatePicker',
            'pascalprecht.translate',
            'ncy-angular-breadcrumb',

            'sisagmApp.routes',
            'sisagmApp.core',
            'sisagmApp.controllers',

            'sisagmApp.private',
            'sisagmApp.public',
            'sisagmApp.login',
            'sisagmApp.home',
            'sisagmApp.pessoas',
            'sisagmApp.convite',
            'sisagmApp.reuniao',
            'sisagmApp.audiencia',
            'sisagmApp.autoridade',
            'sisagmApp.relatorio',
            'sisagmApp.evento',
            'menu',
            'ngStorage',
            '$alerts',


            'pessoa',


        ]);
})();
