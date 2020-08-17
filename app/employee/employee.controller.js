angular.module('app').controller('Employee.Controller', employeeController);

function employeeController($scope, $state, ApiService) {
    
    var vm = this;
    loadTable();

    function loadTable() {
        ApiService.readEmployee().then(function(res) {
            if(res.status == 200) {
                $scope.employees = res.data;
            }
        });
    }

    $scope.newEmployee = function(row_id) {
        if(row_id) {
            $state.go('newEmployee', {id: row_id});
        } else {
            $state.go('newEmployee');
        }
    }

    $scope.delete = function(id) { 
        ApiService.removeEmployee(id).then(function(res) {
            if(res.status == 200) {
                loadTable();
            }
        });
    }
}
