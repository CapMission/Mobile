angular.module('capMission.authentication')
  .controller('LogoutCtrl', function($location, $auth, $ionicHistory,$state) {
    if (!$auth.isAuthenticated()) { return; }
    $auth.logout()
      .then(function() {
        ionic.Platform.exitApp();


      });
  });
