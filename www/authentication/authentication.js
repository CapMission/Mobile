angular.module('capMission.authentication', [])

  .controller('LoginCtrl', function ($scope, $state, $cordovaOauth, $ionicPlatform, $cookieStore) {
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
    }
  });
