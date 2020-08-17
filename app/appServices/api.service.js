angular.module('app').factory('ApiService', apiService);

function apiService($http, $q, $window) {
		
  var apiService = {};

  apiService.readLoginUser = readLoginUser;

  apiService.readState = readState;
  apiService.saveState = saveState;
  apiService.editState = editState;
  apiService.removeState = removeState;

  apiService.readEmployee = readEmployee;
  apiService.saveEmployee = saveEmployee;
  apiService.editEmployee = editEmployee;
  apiService.removeEmployee = removeEmployee;

  return apiService;

  function readLoginUser() {
    return $http.get('/api/user/loginUser').then(handleSuccess, handleError);
  }

  function readState() {
    return $http.get('/api/state').then(handleSuccess, handleError);
  }
  function saveState(obj) {
    return $http.post('/api/state', obj).then(handleSuccess, handleError);
  }
  function editState(obj) {
    return $http.put('/api/state/' + obj._id, obj).then(handleSuccess, handleError);
  }
  function removeState(id) {
    return $http.delete('/api/state/' + id).then(handleSuccess, handleError);
  }

  function readEmployee(id) {
    if(id) {
      return $http.get('/api/employee/' + id).then(handleSuccess, handleError);
    } else {
      return $http.get('/api/employee').then(handleSuccess, handleError);
    }
  }
  function saveEmployee(obj) {
    return $http.post('/api/employee', obj).then(handleSuccess, handleError);
  }
  function editEmployee(obj) {
    return $http.put('/api/employee/' + obj._id, obj).then(handleSuccess, handleError);
  }
  function removeEmployee(id) {
    return $http.delete('/api/employee/' + id).then(handleSuccess, handleError);
  }

  // private functions
  function handleSuccess(res) {
    return res;
  }

  function handleError(res) {
    console.log(res);
    if(!res.data.redirect) {
      return $q.reject(res);
    } else {
      console.log('INFO: Explicit redirection from server to: ' + res.data.redirect);
      $window.location = res.data.redirect;
    }
  }	
}