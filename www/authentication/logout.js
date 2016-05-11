var dec = angular.module('capMission.authentication', ['services']);

dec.controller('LogoutCtrl', function($location, $auth, $state,$ionicHistory,authService) {
  /*$scope.logout = function(){
    authService.logout()
      .then(function(result){
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
        $ionicHistory.nextViewOptions({ disableBack: true, disableAnimate: true, historyRoot: true });

        $state.go('login', {}, {reload: true});
      });
  };*/
  alert('exit !!')
  navigator.app.exitApp();


});

