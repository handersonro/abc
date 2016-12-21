(function(){
  angular
    .module('sisagmApp.core.services')
    .service('AlertsService', AlertsService);


  function AlertsService($mdToast){
    var service = this;

    service.success = success;

    ////////////////////
    function success(msg){
      $mdToast.show(
         $mdToast.simple()
           .textContent(msg)
           .position('top left right')
       );
    }
  }

})();
