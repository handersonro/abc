(function(){
    angular
        .module('sisagmApp.audiencia.controllers')
        .controller('AudienciaInserirAudienciaController', AudienciaInserirAudienciaController);

    /* @ngInject */
    function AudienciaInserirAudienciaController($scope, $mdDialog, $timeout, AlertsService, ConviteRestService, $filter, $q, UsuarioRestService){
        var vm = this;
        vm.readonly = false;
        vm.selectedItem = null;
        vm.searchText = null;
        vm.querySearch = querySearch;
        vm.vegetables = loadVegetables();
        vm.usuarios = [];
        vm.numberChips = [];
        vm.numberChips2 = [];
        vm.listSistemas = [];
        vm.numberBuffer = '';
        vm.autocompleteDemoRequireMatch = true;
        vm.transformChip = transformChip;

        vm.procurarLocal = ConviteRestService.obterLocais;
        vm.procurarUsuario = UsuarioRestService.obterUsuarios;

        vm.title = "Incluir audiência";
        vm.autoridade = {noAutoridade : 'Ministro'};
        vm.showBtnSalvar = showBtnSalvar;
        vm.salvar = salvar;
        vm.listaAutoridades = {};
        vm.audiencia = {};
        inicializar();
        function inicializar(){
            vm.audiencia = {
                dtCadastro: new Date()
            };
            if(vm.dataInicio > vm.dataFim){
                return AlertsService.success($filter('translate')('A13.4'));
            }
        }
        ///////////////////////////////////

        vm.limpar = function(){
            vm.audiencia = {};
        }

        function showBtnSalvar(){
            return $scope.formAudiencia.$invalid;
        }
        function salvar(audiencia){

            if(vm.audiencia.dataInicio > vm.audiencia.dataFim){
                return AlertsService.success($filter('translate')('A13.4'));
            }

            audiencia.tipoEvento = {id: 1,noTipoEvento: 'AUDIENCIA'};
            audiencia.idLocalidade = audiencia.idLocalidade.id;
            audiencia.flEventoAtivo = true;
            audiencia.flEventoInternacional = 1;
            audiencia.idPais = 1;

            audiencia.remetente = {id:'42',noRemetente:'John McQueide',noCargo:'Desenv',noEmail:'john@turismo.gov.br',nuTelefone:'16514654954',pessoa:{id:'213',flPessoaAtivo:'true'}}

            console.log(audiencia);

            ConviteRestService.salvar(audiencia).then(
                function (retorno) {
                    console.log(audiencia + 'No salvar');
                    AlertsService.success('Registro incluído com sucesso.');
                    $state.go('app.private.audiencia.inserir-audiencia', {}, {reload: true});
                }
            );

        }

        vm.carregarListConvite = function(){

            ConviteRestService
                .obterListaConvite({})
                .then(
                    function(data){
                        $scope.listaConvites = data;
                    },
                    function(error){

                    }
                );
        };
        //vm.carregarListConvite();
        function debounce(func, wait, context) {
            var timer;

            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }
        /*DIALOG*/
        vm.showConfirm = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Atenção')
                .textContent('Tem certeza que deseja remover esse registro?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Sim')
                .cancel('Não');

            $mdDialog.show(confirm).then(function() {
                $scope.status = 'You decided to get rid of your debt.';
            }, function() {
                $scope.status = 'You decided to keep your debt.';
            });
        };
        /*DIALOG*/
        /*CHIP*/
        function transformChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }

            // Otherwise, create a new one
            return { name: chip, type: 'new' }
        }
        function querySearch (query) {
            var resolve = $q.defer();
            resolve.resolve(query ? vm.vegetables.filter(createFilterFor(query)) : []);
            return resolve.promise;
        }
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);


            return function filterFn(vegetable) {
                return (vegetable._lowername.indexOf(lowercaseQuery) === 0);
            };

        }
        function loadVegetables() {
            var veggies = [
                {
                    'name': 'Paulo Júnior de Jesus Peres'
                },
                {
                    'name': 'Júlio Nascimento'
                },
                {
                    'name': 'Amanda Amorim Neto'
                },
                {
                    'name': 'Bruno Azevedo Amaral'
                },
                {
                    'name': 'Camila Ribeiro'
                },
                {
                    'name': 'Danilo Cabaré'
                }

            ];

            return veggies.map(function (veg) {
                veg._lowername = veg.name.toLowerCase();
                return veg;
            });
        }
        /*CHIPS*/
    }
})();
