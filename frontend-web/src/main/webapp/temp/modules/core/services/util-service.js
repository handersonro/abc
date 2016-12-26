(function() {
    'use strict';

    UtilsService.$inject = ["DataService", "$q", "$mdDialog", "$filter", "AlertsManager"];
    angular
        .module('sisagmApp.core.services')
        .service('UtilsService', UtilsService);

    /* @ngInject */
    function UtilsService(DataService, $q, $mdDialog, $filter, AlertsManager) {
        var service = this;

        service.abrirDialogAlterarStatus = abrirDialogAlterarStatus;
        service.carregarMaisObjects = carregarMaisObjects;
        service.downloadArquivo = downloadArquivo;
        service.isObjectDesabilitado = isObjectDesabilitado;
        service.montaDataInativacao = montaDataInativacao;
        service.objectBuilder = objectBuilder;
        service.verificaChipJaExiste = verificaChipJaExiste;
        service.converterImagem = converterImagem;

        service.listaStatus = [{
            id: '1',
            nome: $filter('translate')('label.status.ativo'),
            radioId: 'statusAtivoId',
            radioName: 'statusAtivo'
        }, {
            id: '2',
            nome: $filter('translate')('label.status.inativo'),
            radioId: 'statusInativoId',
            radioName: 'statusInativo'
        }, {
            id: '',
            nome: $filter('translate')('label.status.todos'),
            radioId: 'statusTodosId',
            radioName: 'statusTodos'
        }];

        service.tiposRepresentacao = [
            {
                idTipo: 1,
                nomeTipo:$filter('translate')('label.tipoRepresentacao.institucional'),
                radioIdTipo :'statusInstitucionalId',
                radioNameTipo: 'statusInstitucional',
                ordemApresentacao : 0
            },
            {
                idTipo: 2,
                nomeTipo:$filter('translate')('label.tipoRepresentacao.deAplicacao'),
                radioIdTipo :'statusDeAplicacaoId',
                radioNameTipo: 'statusDeAplicacao',
                ordemApresentacao : 1
            },
            {
                idTipo: 0,
                nomeTipo:$filter('translate')('label.tipoRepresentacao.todos'),
                radioIdTipo :'statusTodosId',
                radioNameTipo: 'statusTodos',
                ordemApresentacao : 2
            }
        ];

        /////////////////////
        function abrirDialogAlterarStatus(object, statusAlterado) {
            var confirm = $q.defer();

            confirm = $mdDialog.confirm({
                    onComplete: function afterShow() {
                        var $dialog = angular.element(document.querySelector('md-dialog'));
                        var $actionsSection = $dialog.find('md-dialog-actions');
                        var $cancelButton = $actionsSection.children()[0];
                        var $confirmButton = $actionsSection.children()[1];
                        angular.element($confirmButton).addClass('md-raised md-warn');
                        angular.element($cancelButton).addClass('md-raised');
                    }
                })
                .title($filter('translate')('label.alterar.status', {
                    acaostatus: statusAlterado.acao
                }))
                .textContent($filter('translate')('label.acao.status', {
                    acaostatus: statusAlterado.acao.toLowerCase(),
                    nome: object.nome
                }))
                .cancel($filter('translate')('label.alterar.status', {
                    acaostatus: statusAlterado.acao
                }))
                .ok($filter('translate')('botao.cancelar'))
                .theme('default');

            return $mdDialog.show(confirm);
        }

        function carregarMaisObjects(params, listaObject) {
            if (listaObject.length < params.total()) {
                params.page((params.page() + 1));
            }
        }

        function downloadArquivo(nome, base64, tipo){
            var byteCharacters = atob(base64);

            var ie = navigator.userAgent.match(/MSIE\s([\d.]+)/);
            var ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/);
            var ieEDGE = navigator.userAgent.match(/Edge/g);
            var ieVer=(ie ? ie[1] : (ie11 ? 11 : (ieEDGE ? 12 : -1)));

            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);
            var file = new Blob([byteArray], {type: tipo});

            if(ieVer>-1){
                window.navigator.msSaveBlob(file,nome);
            }else {
                var elem = window.document.createElement('a');
                elem.href = window.URL.createObjectURL(file);
                elem.download = nome;
                document.body.appendChild(elem);
                elem.click();
                document.body.removeChild(elem);
            }
        }

        function isDataValida(object) {
            return object &&
                object.dataInativacao &&
                typeof object.dataInativacao === 'number' &&
                DataService.montaData(object.dataInativacao) !== 'NaN';
        }

        function isObjectDesabilitado(object) {
            return object &&
                object.dataInativacao !== null &&
                object.dataInativacao !== undefined &&
                object.dataInativacao < new Date().getTime();
        }

        function montaDataInativacao(object) {
            object.dataInativacao = isObjectDesabilitado(object) ? null : new Date().getTime();
            return object.dataInativacao;
        }


        function objectBuilder(object, listaAcoes, funcaoDeAlterarObject) {
            if (!isDataValida(object) && (!object.dataInativacao) || object.dataInativacao > new Date().getTime()) {
                object.status = service.listaStatus[0];
            } else {
                object.status = service.listaStatus[1];
            }

            object.listaAcoes = angular.copy(listaAcoes);
            object.listaAcoes.push({
                id: 'mudarStatus',
                nome: $filter('translate')(isObjectDesabilitado(object) ? 'label.acao.ativar' : 'label.acao.inativar'),
                callback: function(ev, object) {
                    return funcaoDeAlterarObject === null ? null : funcaoDeAlterarObject(object);
                }
            });
            return object;
        }

        function verificaChipJaExiste(listaObjetos, idNovoObjeto) {
            for (var i in listaObjetos) {
                if (listaObjetos[i].id == idNovoObjeto) {
                    return true;
                }
            }
            return false;
        }

        function converterImagem(arquivo) {
            var fileReader = new FileReader();
            var deferred = $q.defer();
            if (arquivo) {
                fileReader.onloadend = function(event) {
                    deferred.resolve(event.target.result);
                };
                fileReader.readAsDataURL(arquivo.lfFile);
            } else {
                deferred.resolve(null);
            }
            return deferred.promise;
        }


    }

})();
