var authentication = angular.module('capMission.authentication', ['ionic','ionicProcessSpinner']);
authentication.controller('RoleCtrl',['$scope','$ionicPopover','$ionicHistory',  function ($scope,$ionicPopover,$ionicHistory) {

}]);


authentication.controller('ChoixCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading', function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading) {
  $scope.now = new Date();
  $rootScope.onTabSelected = function(){
    <!-- ionicToast.show(message, position, stick, time); -->
   // ionicToast.show('This is a toast at the top.', 'top', true, 2500);
    toastr.info('Fontionnalité non disponible pour le moment !');
    toastr.clear();

  };
  //$ionicLoading.show();
  $scope.getd = function(){}
 // $id = $rootScope.resp.entity.id
  $scope.get = function (id) {
    $http.get('http://81.192.194.109:8182/CapMissionApp/parents/' + id).success(function (data, status, headers, config) {
      //$scope.test="safaa"
      $rootScope.parent = data
      console.log(data)
     if(data.entity == null){
        toastr.warning("Désolés, vous n'êtes pas autorisés à accéder en tant que parent");
        $location.path('/role');
      }
      else{

        $location.path('/choix');

      }

      $ionicLoading.hide();
      //console.log('Data choix'+JSON.stringify({data: data}))
      //$location.path('/choix');
    }).error(function (data) {
      toastr.error('Echec de connexion');

    });
  }
  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });

}]);

authentication.controller('LoginCtrl',function($scope, $location, $auth, $http){
 /* $scope.login = function(user) {
   $http.post('http://localhost:8182/auth/login', user).success(function(data, status, headers, config){
     $scope.resp = "test"
     //$scope.login = UserService.login;

     alert(JSON.stringify({data: data}))
     toastr.success('Bienvenu à votre espace personnel!');
     $location.path('/tab/home');
   }).error(function(data){
     toastr.error('Login/Password incorrect !');
     $location.path('/login');
   });
   /!* $auth.login($scope.user)
      .then(function() {
        toastr.success('You have successfully signed in!');
        $location.path('/tab/home');
      })
      .catch(function(error) {
        toastr.error(error.data.message, error.status);
      });*!/
  };*/
  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        toastr.success('You have successfully signed in with ' + provider + '!');
        $location.path('/tab/home');
      })
      .catch(function(error) {
        if (error.error) {
          // Popup error - invalid redirect_uri, pressed cancel button, etc.
          toastr.error(error.error);
        } else if (error.data) {
          // HTTP response error from server
          toastr.error(error.data.message, error.status);
        } else {
          toastr.error(error);

        }
      });
  };
  $scope.logout = function() {
    $auth.logout();
  };

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };
});

