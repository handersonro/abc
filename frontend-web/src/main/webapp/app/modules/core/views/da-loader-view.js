var myApp = angular.module('sisagmApp.core');
myApp.run(function($templateCache) {
  $templateCache.put('da-loader/loader.html', '<div class="da-loader" ng-show="display"></div>');
});
