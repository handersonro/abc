(function(){
    angular
        .module('sisagmApp.core.directives')
        .controller('NotificacaoEmailController', NotificacaoEmailController );

    /* @ngInject */
    function NotificacaoEmailController($scope, $mdDialog){

        $scope.abrirMenuCaixa = abrirMenuCaixa;
        $scope.abrirMenuNotificacao = abrirMenuNotificacao;


        ////////////////////////////////

       function abrirMenuNotificacao($mdOpenMenu, ev){
            $mdOpenMenu(ev);
        }

        function abrirMenuCaixa($mdOpenMenu, ev){
            $mdOpenMenu(ev);
        }

    }
})();
