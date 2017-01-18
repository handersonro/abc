(function(){
    angular
        .module('sisagmApp.autoridade.controllers')
        .controller('AutoridadeVincularAutoridadeController', AutoridadeVincularAutoridadeController);

    /* @ngInject */
    function AutoridadeVincularAutoridadeController($scope, $timeout,$log, $mdDialog, $q,$http,$state, AlertsService,AutoridadeService){
        var vm = this;

        vm.listAutoridades = {};

        vm.title = "Vincular autoridade";
        vm.autoridade = {};
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvar = salvar;
        vm.limpar = limpar;
        vm.help = help;
        vm.noRemetente = '';
        vm.procurarUsuario = buscarRemetentePeloNome;
        vm.vincularAutoridade = vincularAutoridade;

        inicializar();
        ///////////////////////////////////
        function inicializar(){
            vm.listAutoridades = [];
            AutoridadeService.obterTodasAutoridades.then(
                function (resultados) {
                    resultados.forEach(function (item, index) {
                        item['selected'] = false;
                        vm.listAutoridades.push(item);
                    });
                }
            );
        }

        function showBtnSalvar(){
            return $scope.formVincularAutoridade.$invalid;
        }
        function salvar(){
            var autoridadeSelect = angular.fromJson(vm.vincular.autoridade);
            var autoridade = {id:'',noAutoridade:'',noEmail:''};

            autoridade.id = autoridadeSelect.id;
            autoridade.noAutoridade = autoridadeSelect.noAutoridade;
            autoridade.noEmail = autoridadeSelect.noEmail;
            vm.usuario.autoridade = autoridade;

            AutoridadeService.vincularUsuarioAutoridade(vm.usuario).then(
                function (retorno) {
                    AlertsService.success('Registro incluído com sucesso.');
                    $state.go('app.private.autoridade.vincular-autoridade', {}, {reload: true});
                }
            );

        }
        function limpar(){
            $state.go('app.private.autoridade.vincular-autoridade', {}, {reload: true});
        }
        function buscarRemetentePeloNome(noUsuario) {
            var retorno = $q.defer();
            AutoridadeService.obterRemetentesPeloNome(noUsuario)
                .success(function (data) {
                    retorno.resolve(data);
                })
                .error(function () {
                    retorno.reject(alert('Não foi possivel carregar os dados'));
                });
            return retorno.promise;
        }

        function vincularAutoridade(usuario) {
            angular.forEach(vm.listAutoridades, function(autoridade, key) {
                if( (validarAutoridade(usuario.autoridade)) && autoridade.id == usuario.autoridade.id){
                    autoridade['selected'] = true;
                }
            });

            if (vm.vincular != null && validarAutoridade(vm.vincular.autoridade)){
                vm.vincular.autoridade = usuario.autoridade;
            }

        }

        function validarAutoridade(autoridade){
            return  undefined !=autoridade && null != autoridade.id ;
        }

        /*MODAL*/
        function help(ev) {
            $mdDialog.show({
                controller: AutoridadeVincularAutoridadeController,
                templateUrl: '/modules/autoridade/help/modal-help.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        };
        $scope.close = function() {
            $mdDialog.cancel();
        };
        /*MODAL*/
    }

})();
