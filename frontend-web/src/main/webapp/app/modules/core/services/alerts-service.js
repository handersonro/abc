(function(){
  angular
    .module('sisagmApp.core.services')
    .service('AlertsService', AlertsService);


  function AlertsService($mdToast){
    var service = this;

    service.success = success;
    service.error = error;
    service.warning = warning;

    ////////////////////
    function success(msg){
      $mdToast.show(
         $mdToast.simple()
           .textContent(msg)
           .theme('md-success-theme')
           .position('top left right')
       );
    }
    function error(msg){
        $mdToast.show(
            $mdToast.simple()
                .textContent(msg)
                .position('top left right')
                .hideDelay(false)
                .action('Fechar')
                .theme('md-danger-theme')
                .highlightAction(true)
        );
    }
    function warning(msg){
        $mdToast.show(
            $mdToast.simple()
                .textContent(msg)
                .position('top left right')
                .hideDelay(false)
                .action('Fechar')
                .theme('md-warning-theme')
                .highlightAction(true)
        );
    }
  }

})();
