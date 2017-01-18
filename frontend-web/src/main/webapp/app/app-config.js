(function(){
    angular
        .module('sisagmApp')
        .config(configApp);

    /* @ngInject */
    function configApp($ocLazyLoadProvider, $translateProvider, $mdThemingProvider, RestangularProvider, $httpProvider, $breadcrumbProvider,$mdDateLocaleProvider, $provide, mdcDatetimePickerDefaultLocaleProvider){
        $ocLazyLoadProvider.config({
            debug: false,
            events: false
        });

        $translateProvider.useLoader('$translatePartialLoader', {
      		  urlTemplate: 'modules/{part}/language/{lang}.json'
      	});
      	$translateProvider.preferredLanguage('pt-BR');

        $mdThemingProvider.theme('default')
            .primaryPalette('light-green', {
                'default': '500', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
            })
            // If you specify less than all of the keys, it will inherit from the
            // default shades
            .accentPalette('green', {
                'default': '200' // use shade 200 for default, and keep all other shades the same
            });

        $httpProvider.interceptors.push('errorHandlerInterceptor');
        $httpProvider.interceptors.push('authExpiredInterceptor');
        $httpProvider.interceptors.push('authInterceptor');
        $httpProvider.interceptors.push('httpMessageHandleInterceptor');

        //$httpProvider.interceptors.push('daLoaderHttpInterceptor');

        $httpProvider.defaults.useXDomain = true;
        //$cookiesProvider.defaults.path = '/';
        RestangularProvider.setDefaultHttpFields({
            //withCredentials: true
        });

        $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format('DD/MM/YYYY');
        };
        $mdDateLocaleProvider.parseDate = function(dateString) {
            var m = moment(dateString, 'DD/MM/YYYY', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };



        $breadcrumbProvider.setOptions({
            prefixStateName: 'app.private',
           	template: '<div disable-animate style="box-sizing: border-box; margin: 8px" class="breadcrumb md-primmary md-whiteframe-z2"><a ng-repeat="step in steps" class="btn btn-flat" data-ng-class="{active: $last}" href="{{step.ncyBreadcrumbLink}}" ng-disabled="$last">{{step.ncyBreadcrumbLabel}}</a></div>'
        });


        $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions){
            // $delegate is the taOptions we are decorating
            // register the tool with textAngular



            taRegisterTool('fontColor', {
                display: "<button colorpicker type='button' class='btn btn-default ng-scope'  title='Font Color'  colorpicker-close-on-select colorpicker-position='bottom' ng-model='fontColor' style='color: {{fontColor}}'><i class='fa fa-font '></i></button>",
                action: function (deferred) {
                    var self = this;
                    if (typeof self.listener == 'undefined') {
                        self.listener = self.$watch('fontColor', function (newValue) {
                            self.$editor().wrapSelection('foreColor', newValue);
                        });
                    }
                    self.$on('colorpicker-selected', function () {
                        deferred.resolve();
                    });
                    self.$on('colorpicker-closed', function () {
                        deferred.resolve();
                    });
                    return false;
                }
            });
            taOptions.toolbar[1].unshift('fontColor');

            taOptions.setup.textEditorSetup=function($element) {
                $element.attr('ui-codemirror', '');
            };
            return taOptions;
        }]);

        moment.defineLocale('pt-br', {
            months : 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
            monthsShort : 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
            weekdays : 'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split('_'),
            weekdaysShort : 'dom_seg_ter_qua_qui_sex_sáb'.split('_'),
            weekdaysMin : 'dom_2ª_3ª_4ª_5ª_6ª_sáb'.split('_'),
            longDateFormat : {
                LT : 'HH:mm',
                L : 'DD/MM/YYYY',
                LL : 'D [de] MMMM [de] YYYY',
                LLL : 'D [de] MMMM [de] YYYY [às] LT',
                LLLL : 'dddd, D [de] MMMM [de] YYYY [às] LT'
            },
            calendar : {
                sameDay: '[Hoje às] LT',
                nextDay: '[Amanhã às] LT',
                nextWeek: 'dddd [às] LT',
                lastDay: '[Ontem às] LT',
                lastWeek: function () {
                    return (this.day() === 0 || this.day() === 6) ?
                        '[Último] dddd [às] LT' : // Saturday + Sunday
                        '[Última] dddd [às] LT'; // Monday - Friday
                },
                sameElse: 'L'
            },
            relativeTime : {
                future : 'em %s',
                past : '%s atrás',
                s : 'segundos',
                m : 'um minuto',
                mm : '%d minutos',
                h : 'uma hora',
                hh : '%d horas',
                d : 'um dia',
                dd : '%d dias',
                M : 'um mês',
                MM : '%d meses',
                y : 'um ano',
                yy : '%d anos'
            },
            ordinal : '%dº'
        });

        mdcDatetimePickerDefaultLocaleProvider.setDefaultLocale('pt-br');
    }
})();
