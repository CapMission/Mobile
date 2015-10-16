var authentication = angular.module('capMission.authentication', []);

  authentication.controller('LoginCtrl', function ($scope, $state, $cordovaOauth, $ionicPlatform, $cookieStore) {
    $scope.login = function () {
      $ionicPlatform.ready(function () {
        $cordovaOauth.canvas(3, 'xswEOyMJuRW6CJYOFRftp0u3oRes7T78Cw22IDyOxxzAWZccNlriMhZY3n7hXEnL', '192.168.1.9')
          .then(function (result) {
            console.warn(result);
            $cookieStore.put('_normandy_session', result);
            $state.go('tab.home');
          }, function (error) {
            console.warn(error);
          });
      });
    };

    $scope.login();

$scope.go = function (state) {
      $state.go(state);

}
  
  });


authentication.controller('EcoleCtrl', ['$scope', function ($scope) {
  $scope.data = {};
  $scope.ecoles = [
    {id: 0, name: "Massignon"},
    {id: 1, name: "Lyautey"},
    {id: 2, name: "Al jabr"}
  ];

}]);

authentication.controller('NiveauCtrl', ['$scope', function ($scope) {
  $scope.data = {};
  $scope.niveaux = [
    {id: 0, name: "Terminale"},
    {id: 1, name: "1 ère"},
    {id: 2, name: "Seconde"}
  ];

}]);

authentication.controller('FiliereCtrl', ['$scope', function ($scope) {
  $scope.data = {};
  $scope.filieres = [
    {id: 0, name: "S"},
    {id: 1, name: "ES"},
    {id: 2, name: "L"}
  ];

}]);