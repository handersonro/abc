(function(){
    'use strict';

DTOService.$inject = ["$filter"];
    angular
        .module('sisagmApp.core.services')
        .service('DTOService', DTOService);

    /* @ngInject */
function DTOService($filter){
    var service = this;

    service.copyTableParamsToDTO = copyTableParamsToDTO;
    service.convertObjectToDTO = convertObjectToDTO;

    /////////////
    function copyTableParamsToDTO(tableParams){
        var _sortingField = Object.keys(tableParams.sorting()).join('');

        var dto = {
            pageSize: tableParams.count(),
            currentPage: tableParams.page(),
            sortFields: _sortingField ? _sortingField : 'id',
            sortDirections: _sortingField ? tableParams.sorting()[_sortingField] : 'asc',
            list: null,
            totalResults: 0,
            filtros : {}
        };
        return dto;
    }

    function convertObjectToDTO(object){
        if ((typeof(object) !== 'object') || (object === null)) {
            return null;
        }
        var dto = {
            pageSize: object.pageSize ? object.pageSize : 0,
            currentPage: object.currentPage ? object.currentPage : 0,
            sortFields: object.sortFields ? object.sortFields : "id",
            sortDirections: object.sortDirections ? object.sortDirections : "asc",
            list: null,
            totalResults: 0,
            filtros : object.filtros ? object.filtros : {}
        };
        return dto;
    }
}

})();
