angular.module('sisagmApp.core.filters').filter('mask', ['MaskService', function(MaskService) {
    return function (text, mask) { var maskService = MaskService.create(); maskService.generateRegex({ mask: mask }); return maskService.getViewValue(text).withDivisors(); };
}])