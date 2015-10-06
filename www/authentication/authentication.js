angular.module('capMission.authentication', [])

  .controller('LoginCtrl', function ($scope, $state, $cordovaOauth) {

    $scope.go = function (state) {
      $cordovaOauth.canvas(3, 'xswEOyMJuRW6CJYOFRftp0u3oRes7T78Cw22IDyOxxzAWZccNlriMhZY3n7hXEnL', '192.168.1.9')
        .then(function(result) {
          console.warn(result);
        }, function(error) {
          console.warn(error);
        });
    }
  });
