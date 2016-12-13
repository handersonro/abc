angular.module('sisagmApp.core.filters').filter('humanizeDoc', function () {
    //replace uppercase to regular case
    return function (doc) {
        if (!doc)
            return;
        if (doc.type === 'directive') {
            return doc.name.replace(/([A-Z])/g, function ($1) {
                return '-' + $1.toLowerCase();
            });
        }
        return doc.label || doc.name;
    };
})
