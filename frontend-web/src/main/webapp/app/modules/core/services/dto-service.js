(function(){
    'use strict';

    angular
        .module('sisagmApp.core.services')
        .factory('DTO', DTO);

    function DTO(){
        return function(){
            var dto = {
                "currentPage": 1,
                "pageSize": 20,
                "order": "id",
                "orderDirection": "ASC",
                "filter": {},
                "list": [],
                "totalResults": 0
            };

            dto.update = update;

            return dto;
            //////////////
            function update(result){
                dto.totalResults = result.totalResults || 0;
            }
        };
    }
})();
