angular.module('app').controller('NewEmployee.Controller', newEmployeeController);

function newEmployeeController($scope, $state, ApiService) {
    
    var vm = this, btnObj=[{method:'create', title:'Create'}, {method:'update', title:'Update'}];
    initController();

    function initController() {
        if($state.params.id) {
            ApiService.readEmployee($state.params.id).then(function(res) {
                if(res.status == 200) {
                    $scope.empObj = angular.copy(res.data);
                    $scope.empObj.state = res.data.state._id;
                    $scope.buttons = btnObj[1];
                }
            });
        } else {
            $scope.empObj = {};
            $scope.buttons = btnObj[0];
        }
        loadTable();
    }

    function loadTable() {
        ApiService.readState().then(function(res) {
            if(res.status == 200) {
                $scope.states = res.data;
            }
        });
    }

    $scope.back = function() {
        $state.go('employee');
    }

    $scope.reset = function() {
        vm.submitted = false;
        initController();
    }

    $scope.create = function(id) { 
        ApiService.saveEmployee($scope.empObj).then(function(res) {
            if(res.status == 200) {
                $scope.back();
            }
        });
    }

    $scope.update = function(id) { 
        ApiService.editEmployee($scope.empObj).then(function(res) {
            if(res.status == 200) {
                $scope.back();
            }
        });
    }
}
