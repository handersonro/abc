(function(){
    angular
        .module('sisagmApp.autoridade.controllers')
        .controller('AutoridadeVincularAutoridadeController', AutoridadeVincularAutoridadeController);

    /* @ngInject */
    function AutoridadeVincularAutoridadeController($scope, $timeout,$log, $q,$http,$state, AlertsService,AutoridadeService){
        var vm = this;

        vm.listAutoridades = {};

        vm.title = "Vincular autoridade";
        vm.autoridade = {};
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvar = salvar;
        vm.limpar = limpar;
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
            angular.forEach(vm.listAutoridades, function(item, key) {

                if(item.id == usuario.autoridade.id){
                    console.log(item.id + '==' + usuario.autoridade.id);
                    item['selected'] = true;
                    console.log(item);
                }
            });

            vm.vincular.autoridade = usuario.autoridade;
        }
    }

})();
