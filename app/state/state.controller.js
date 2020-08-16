angular.module('app').controller('State.Controller', stateController);

function stateController($scope, ApiService) {
    
    var vm = this, btnObj=[{method:'create', title:'Create'}, {method:'update', title:'Update'}];
    initController();

    function initController() {
        $scope.stateObj = {};
        $scope.states = [];
        $scope.buttons = btnObj[0];

        loadTable();
    }

    function loadTable() {
        ApiService.readState().then(function(res) {
            if(res.status == 200) {
                $scope.states = res.data;
            }
        });
    }

    $scope.edit = function(ste) { 
        $scope.stateObj = angular.copy(ste);
        $scope.buttons = btnObj[1];
    }

    $scope.reset = function() {
        vm.submitted = false;
        $scope.stateObj = {};
        $scope.buttons = btnObj[0];
    }

    $scope.create = function(id) { 
        ApiService.saveState($scope.stateObj).then(function(res) {
            if(res.status == 200) {
                loadTable();
                $scope.reset();
            }
        });
    }

    $scope.update = function(id) { 
        ApiService.editState($scope.stateObj).then(function(res) {
            if(res.status == 200) {
                loadTable();
                $scope.reset();
            }
        });
    }

    $scope.delete = function(id) { 
        ApiService.removeState(id).then(function(res) {
            if(res.status == 200) {
                loadTable();
            }
        });
    }
}
