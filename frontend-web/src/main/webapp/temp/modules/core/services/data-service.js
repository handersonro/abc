(function(){
    'use strict';

DataService.$inject = ["$filter", "AlertsManager"];
    angular
        .module('sisagmApp.core.services')
        .service('DataService', DataService);

    /* @ngInject */
function DataService($filter, AlertsManager){
    var service = this;

    service.converterDateToString = converterDateToString;
    service.montaData = montaData;
    service.validaPeriodoData = validaPeriodoData;
    service.zerarHorario = zerarHorario;
    service.criarDataHojeSemHoras = criarDataHojeSemHoras;
    service.getDataSemHora = getDataSemHora;

    /////////////
    function converterDateToString(data) {
        return $filter('date')(data,'dd/MM/yyyy');
    }

    function montaData(stringData){
      var dataHora = converterDateToString(stringData);
      var regex_data = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/.exec(dataHora[0]);

      if(regex_data){

          var dia = regex_data[1];
          var mes = regex_data[2];
          var ano = regex_data[3];
          var data = new Date(ano+"/"+mes+"/"+dia +(dataHora.length > 1 ? ' ' + dataHora[1] : ''));
          return data;
      }
      return new Date(NaN);
    }

    function validaPeriodoData(dataInicial, dataFinal){
        if(dataInicial && dataFinal){
            if (dataInicial > new Date().getTime()){
                AlertsManager.addSuccess($filter('translate')('msg.data.final.maior.atual'));
                return false;
            }
            if(dataInicial > dataFinal){
                AlertsManager.addSuccess($filter('translate')('msg.data.inicial.maior.final'));
                return false;
            }
            return true;
        }
    }

    function getDataSemHora(data){
      var dataConvertida = new Date(data.getTime());
      zerarHorario(dataConvertida);
      return dataConvertida;
    }

    function criarDataHojeSemHoras(){
      var data = new Date();
      zerarHorario(data);
      return data;
    }

    function zerarHorario(data){
      data.setHours(0);
      data.setMilliseconds(0);
      data.setMinutes(0);
      data.setSeconds(0);
    }
}

})();
