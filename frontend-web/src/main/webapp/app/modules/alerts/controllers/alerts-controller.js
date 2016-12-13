(function(){
    angular
        .module('$alerts.controllers')
        .controller('AlertController', AlertController);

    /* @ngInject */
    function AlertController($scope, $mdToast, alert){
        $scope.closeAlert = function(){
            $mdToast.hide();
        };

        $scope.alert = alert;
    }
})();
