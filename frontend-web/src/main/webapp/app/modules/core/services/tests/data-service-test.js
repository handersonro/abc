describe('Data Service', function(){
    'use strict';


    var DataService;
    var $rootScope;
    var $mdDialog;
    var AlertsManager;
    var $filter;
    var mockTranslateFilter;
    var stateProvider;
    var $mdToast;
    var $scope;

    beforeEach(function(){
        module(function($provide) {
            $provide.value('translateFilter', mockTranslateFilter);
        });

        mockTranslateFilter = function(value) {
            return value;
        };
        module('ngMaterial');
        module('restangular');
        module('ui.router');
        module('oc.lazyLoad');
        module('$alerts');
        module('sisagmApp.core.services');

        module(function($stateProvider, $provide){
            stateProvider = $stateProvider;
        });

    });

    beforeEach(inject(function(_DataService_,_$mdDialog_,_$filter_, _AlertsManager_, _$mdToast_, _$rootScope_){
        DataService = _DataService_;
        $mdDialog = _$mdDialog_;
        $filter = _$filter_;
        AlertsManager = _AlertsManager_;
        $rootScope = _$rootScope_;
        $mdToast = _$mdToast_;
    }));

    beforeEach(function(){
        $scope = $rootScope.$new();
        var scopeDependencies = {
            '$mdDialog': $mdDialog,
            '$filter': $filter,
            'AlertsManager': AlertsManager,
            '$mdToast' : $mdToast,
        };
    });

    it('Que exista o serviço', function(){
        expect(DataService).toBeObject();
    });

    describe('Função validaPeriodoData',function(){

      it('Que Função retorne undefined para data inicial null',function(){
        var datainicial = null;
        var dataFinal = new Date().getTime();
        expect(DataService.validaPeriodoData(datainicial, dataFinal)).toBe(undefined);
      });
      it('Que Função retorne undefined para data final null',function(){
        var datainicial =  new Date().getTime();
        var dataFinal = null;
        expect(DataService.validaPeriodoData(datainicial, dataFinal)).toBe(undefined);
      });
      it('Que Função retorne undefined para data inicial vazia',function(){
        var datainicial = '';
        var dataFinal = new Date().getTime();
        expect(DataService.validaPeriodoData(datainicial, dataFinal)).toBe(undefined);
      });
      it('Que Função retorne undefined para data final vazia',function(){
        var datainicial = new Date().getTime();
        var dataFinal = '';
        expect(DataService.validaPeriodoData(datainicial, dataFinal)).toBe(undefined);
      });
      it('Que Função retorne falso para data inicial maior que data atual',function(){
        var dataInicialMaiorAtual = new Date(2050,1).getTime();
        var dataFinal = new Date().getTime();

        expect(DataService.validaPeriodoData(dataInicialMaiorAtual, dataFinal)).toBeFalse();
      });
      it('Que Função retorne falso para data inicial maior que data final',function(){
        var dataInicialMaiorDataFinal = new Date(2016,2).getTime();
        var dataFinal = new Date(2016,1).getTime();
        expect(DataService.validaPeriodoData(dataInicialMaiorDataFinal, dataFinal)).toBeFalse();
      });
      it('Que Função retorne verdadeiro para datas validas com new date',function(){
        var dataInicial = new Date(2016,2).getTime();
        var dataFinal = new Date(2016,3).getTime();
        expect(DataService.validaPeriodoData(dataInicial, dataFinal)).toBeTruthy();
      });
      it('Que Função retorne verdadeiro para datas validas do tipo string',function(){
        var dataInicialString = '26/04/2016';
        var dataFinalString = '27/04/2016';
        expect(DataService.validaPeriodoData(dataInicialString, dataFinalString)).toBeTruthy();
      });
    });
});
