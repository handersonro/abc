(function(){
    angular
        .module('sisagmApp')
        .config(configApp);

    /* @ngInject */
    function configApp($ocLazyLoadProvider, $translateProvider, $mdThemingProvider, RestangularProvider, $httpProvider, $breadcrumbProvider,$mdDateLocaleProvider){
        $ocLazyLoadProvider.config({
            debug: false,
            events: false
        });

        $translateProvider.useLoader('$translatePartialLoader', {
      		  urlTemplate: 'modules/{part}/language/{lang}.json'
      	});
      	$translateProvider.preferredLanguage('pt-BR');

        $mdThemingProvider.theme('default')
            .primaryPalette('indigo', {
                'default': '400',
                'hue-1': '100',
                'hue-2': '600',
                'hue-3': 'A100'
            })
            .accentPalette('orange', {
                'default': '600'
            });

        $httpProvider.interceptors.push('httpMessageHandleInterceptor');
        $httpProvider.interceptors.push('daLoaderHttpInterceptor');

        $httpProvider.defaults.useXDomain = true;
        //$cookiesProvider.defaults.path = '/';
        RestangularProvider.setDefaultHttpFields({
            //withCredentials: true
        });

        $mdDateLocaleProvider.parseDate = function(dateString) {
            var regex_data = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/.exec(dateString);
            if(regex_data){
                var dia = regex_data[1];
                var mes = regex_data[2] - 1;
                var ano = regex_data[3];
                var montaData = new Date(ano, mes, dia);

                var isDataValida = (montaData.getDate() == dia &&
                montaData.getMonth() == mes &&
                montaData.getFullYear() == ano);

                if(isDataValida){
                    return montaData;
                }

            }
            return undefined;
        };


        $breadcrumbProvider.setOptions({
            prefixStateName: 'app.private',
           	template: '<div disable-animate style="box-sizing: border-box; margin: 8px" class="breadcrumb md-primmary md-whiteframe-z2"><a ng-repeat="step in steps" class="btn btn-flat" data-ng-class="{active: $last}" href="{{step.ncyBreadcrumbLink}}" ng-disabled="$last">{{step.ncyBreadcrumbLabel}}</a></div>'
        });
    }
})();
