(function(){
    angular
        .module('sisagmApp.controllers')
        .controller('AppController', AppController);

    /* @ngInject */
    function AppController($scope, $mdMedia,AlertsManager, $timeout, $rootScope, $state){
        var vm = this;

        vm.screenIsSmall = $mdMedia('xs');

        console.log('xxxx');

        $scope.blur = blur;
        $scope.executarFuncao = executarFuncao;
        $scope.setFocus = setFocus;

        $scope.$watch(function() { return $mdMedia('xs'); }, function(isSmall) {
            vm.screenIsSmall = isSmall;
        });
        $rootScope.$on('$stateChangeError', stateErrorListener);


        ////////////////////////////////////

        function blur(inputId){
            $timeout(function(){
                angular.element(document.querySelector('input[id="'+inputId+'"]')).blur();
            }, 50);
        }
        function executarFuncao(funcao, parametro){
            funcao(parametro);
        }
        function setFocus(inputId){
            $timeout(function(){
                angular.element(document.querySelector('input[id="'+inputId+'"]')).focus();
            }, 50);
        }

        function stateErrorListener(event, toState, toParams, fromState, fromParams, error ){
            $state.go('app.private',
            {
                callback: {
                    enter: function(){
                        AlertsManager.addError('Problema ao carregar os recursos da funcionalidade: '+ error.toString());
                    }
                }
            });
        }

        var originatorEv;

        this.openMenu = function($mdOpenMenu, ev) {
          originatorEv = ev;
          $mdOpenMenu(ev);
        };

        this.notificationsEnabled = true;
        this.toggleNotifications = function() {
          this.notificationsEnabled = !this.notificationsEnabled;
        };

        this.redial = function() {
          $mdDialog.show(
            $mdDialog.alert()
              .targetEvent(originatorEv)
              .clickOutsideToClose(true)
              .parent('body')
              .title('Suddenly, a redial')
              .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
              .ok('That was easy')
          );

          originatorEv = null;
        };

        this.checkVoicemail = function() {
          // This never happens.
        };


    }
})();
