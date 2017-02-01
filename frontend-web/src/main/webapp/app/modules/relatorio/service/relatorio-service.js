/**
 * Created by john.clemente on 13/01/2017.
 */
(function(){
    'use strict';
    /**
     * @ngdoc function
     * @name sisagmApp.reuniao.services:ReuniaoService
     * @description # ReuniaoService Serviço para Reunião
     */
    angular
        .module('sisagmApp.relatorio.services')
        .factory('RelatorioService', RelatorioService);


    /* @ngInject */
    function RelatorioService(Restangular,$http,baseURL) {

        function getQueryParam(name) {
            name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
            var regexS = "[\\?&]"+name+"=([^&#]*)";
            var regex = new RegExp( regexS );
            var results = regex.exec( window.location.href );
            if( results == null )
                return "";
            else
                return results[1];
        }

        function base64_decode(encodedData) {
            if (typeof window !== 'undefined') {
                if (typeof window.atob !== 'undefined') {
                    return decodeURIComponent(escape(window.atob(encodedData)))
                }
            } else {
                return new Buffer(encodedData, 'base64').toString('utf-8')
            }

            var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
            var o1
            var o2
            var o3
            var h1
            var h2
            var h3
            var h4
            var bits
            var i = 0
            var ac = 0
            var dec = ''
            var tmpArr = []

            if (!encodedData) {
                return encodedData
            }

            encodedData += ''

            do {
                // unpack four hexets into three octets using index points in b64
                h1 = b64.indexOf(encodedData.charAt(i++))
                h2 = b64.indexOf(encodedData.charAt(i++))
                h3 = b64.indexOf(encodedData.charAt(i++))
                h4 = b64.indexOf(encodedData.charAt(i++))

                bits = h1 << 18 | h2 << 12 | h3 << 6 | h4

                o1 = bits >> 16 & 0xff
                o2 = bits >> 8 & 0xff
                o3 = bits & 0xff

                if (h3 === 64) {
                    tmpArr[ac++] = String.fromCharCode(o1)
                } else if (h4 === 64) {
                    tmpArr[ac++] = String.fromCharCode(o1, o2)
                } else {
                    tmpArr[ac++] = String.fromCharCode(o1, o2, o3)
                }
            } while (i < encodedData.length)

            dec = tmpArr.join('')

            return decodeURIComponent(escape(dec.replace(/\0+$/, '')))
        }

        return {
            obterDadosAudiencia: Restangular.one('relatorios/', 'pesquisar-audiencia').customPOST,
            obterDadosConvite: Restangular.one('relatorios/', 'pesquisar-convite').customPOST,
            obterRemetentes: Restangular.one('relatorios/', 'pesquisar-remetente').customPOST,
            obterDadosReuniao: Restangular.one('relatorios/', 'pesquisar-reuniao').customPOST,
            base64_decode : base64_decode,
            getQueryParam :getQueryParam
        };




    }
})();
