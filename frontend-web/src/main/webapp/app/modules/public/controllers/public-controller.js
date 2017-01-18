(function(){
    angular
        .module('sisagmApp.public.controllers')
        .controller('PublicController', PublicController);



    /* @ngInject */
    function PublicController($scope,$state,$injector){

        ///////////////////////////////////
        console.log("Hello from PublicController!", $state.get('app'));


         var Principal = $injector.get('Principal');


        var authReturn = Principal.identity(false).then(function (e) {
            var MODULE_NAME = 'audiencia';
            var MODULE_PATH = 'modules/'+MODULE_NAME+'/';
            var STATE_PATH = 'app.private.';

            angular.forEach(e.authorities[0].funcionalidades, function(item, key) {

                item['funcionalidade'] = item['funcionalidade'].replace(/\{MODULE_NAME\}/g,MODULE_NAME).replace(/\{MODULE_PATH\}/g,MODULE_PATH).replace(/'/g,'"');

                console.log('A4',angular.fromJson(item['funcionalidade']));



                //$stateProvider.state(e.authorities[0].funcionalidades)



            });


                $scope.XXX = e.authorities[0].funcionalidades;

                //Principal.updateMenu();

            //module('ui.router');


        });







    }
})();
