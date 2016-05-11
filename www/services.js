angular.module('services', [])
  .factory('authService', authService);

authService.$inject = ['$q', '$http'];

/* @ngInject */
function authService($q, $http) {

  var service = {
    userLoggedIn: false,
    isUserLoggedIn: isUserLoggedIn,
    login: login,
    logout: logout
  };

  return (service);

  function isUserLoggedIn() {
    return this.userLoggedIn;
  }

  function login(username, password) {
    var deferred = $q.defer();

    this.userLoggedIn = true;

    deferred.resolve(true);

    return deferred.promise;
  }

  function logout() {
    var deferred = $q.defer();

    this.userLoggedIn = false;

    deferred.resolve(true);

    return deferred.promise;
  }

}


