(function(){

    angular
        .module('$alerts.services')
        .service('AlertsManager', AlertsManager);

    /* @ngInject */
    function AlertsManager($rootScope, $timeout, $mdToast, $animate) {
        var self = this;

        self.alerts = {};
        self.timeout = 2000;
        self.isShowing = false;

        self.add = add;
        self.addError = addError;
        self.addInfo = addInfo;
        self.addSuccess = addSuccess;
        self.addWarning = addWarning;
        self.checkForAlerts = checkForAlerts;
        self.closeAlert = closeAlert;
        self.closeById = closeById;
        self.getAll = getAll;
        self.show = show;


        if( !self.alerts ){
            self.alerts = {};
        }

        $rootScope.$on('responseErrorEvent', function(event, data) {
            self.add(data);
        });

        ////////////////////////////////////////////////
        function add(obj) {
            obj.id = String(new Date().getTime());
            obj.timeout = obj.timeout || self.timeout;

            self.alerts[obj.id] = obj;

            if( !self.isShowing ){
                self.show(obj.id);
            }
        }
        function addError(message){
            self.add( { type: 'danger', msg: message } );
        }
        function addWarning(message){
            self.add( { type: 'warning', msg: message } );
        }
        function addSuccess(message){
            self.add( { type: 'success', msg: message } );
        }
        function addInfo(message){
            self.add( { type: 'info', msg: message } );
        }
        function checkForAlerts(){
            if(Object.keys(self.alerts).length > 0 ){
                self.show(Object.keys(self.alerts)[0]);
            }
        }
        function closeAlert(id, response){
            self.isShowing = false;
            self.closeById(id);
            self.checkForAlerts();
        }
        function closeById(id){
            if( self.alerts[id] ){
                delete self.alerts[id];
            }
        }
        function getAll(){
            return self.alerts;
        }
        function show(id){
            self.isShowing = true;
            $mdToast.show({
                controller: 'AlertController',
                templateUrl: 'modules/alerts/views/alerts-view.html',
                hideDelay: self.alerts[id].timeout,
                position: 'top left right',
                locals: { alert: self.alerts[id] }
            }).then(
                function(response){
                    self.closeAlert(id, response);
                },
                function(response){
                    self.closeAlert(id, response);
                }
            );
        }

    }
})();
