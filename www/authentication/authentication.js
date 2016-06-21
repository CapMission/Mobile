var authentication = angular.module('capMission.authentication', ['ionic','ionicProcessSpinner']);
authentication.controller('RoleCtrl',['$scope','$ionicPopover','$ionicHistory',  function ($scope,$ionicPopover,$ionicHistory) {

  $ionicPopover.fromTemplateUrl('teacher/popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);


authentication.controller('ChoixCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading', function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading) {
  $scope.now = new Date();
  $rootScope.onTabSelected = function(){
    <!-- ionicToast.show(message, position, stick, time); -->
    // ionicToast.show('This is a toast at the top.', 'top', true, 2500);
    toastr.info('Fontionnalité non disponible pour le moment !');
    toastr.clear();

  };
  $scope.idParent = window.localStorage.getItem('id')
  //$ionicLoading.show();
  $scope.getd = function(){}
  // $id = $rootScope.resp.entity.id
  $scope.get = function (id) {

    $http.get('http://81.192.194.109:8182/CapMissionApp/parents/' + id).success(function (data, status, headers, config) {
      //$scope.test="safaa"
      $rootScope.parent = data
      console.log(data)
      if (data.entity == null) {
        toastr.warning("Désolés, vous n'êtes pas autorisés à accéder en tant que parent");
        $location.path('/role');
      }
      else {
        // Dans le cas où la personne n'a qu'un enfant
        if ($rootScope.parent.entity.students.length == '1') {

          console.log('Le nombre des enfants est :' + $rootScope.parent.entity.students.length)

          // On fait un for pour parcourir l'arrayList (car c'est une liste d'étudiants)
          for (index = 0; index < $rootScope.parent.entity.students.length; ++index) {
            if (index + 1 == $rootScope.parent.entity.students.length) {
              id = $rootScope.parent.entity.students[index].id
              console.log(id)
            }
          }

          // Connexion au serveur pour récupérer les données Etudiant
          $http.get('http://81.192.194.109:8182/CapMissionApp/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {

            $rootScope.son = data
            $ionicLoading.hide();
            console.log('value : ' + window.localStorage.getItem('login'))
            // Redirige vers la page de l'emploi directement
            $location.path('/parent/emploiEnfant2');

          }).error(function (data) {

            //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
            toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
            navigator.app.exitApp();
          })
        } else {
          // Dans le cas où l'étudiant est aussi parent
          if ($rootScope.parent.entity.students.length == '2') {

            console.log($rootScope.parent.entity.name)
            console.log('Le nombre des enfants est :' + $rootScope.parent.entity.students.length)
            // On fait un for pour parcourir l'arrayList (car c'est une liste d'étudiants)
            for (index = 0; index < 2; ++index) {
              name = $rootScope.parent.entity.students[index].name
            }
            console.log(name)

            if (name == $rootScope.parent.entity.name) {

              for (index = 0; index < 1; ++index) {
                id = $rootScope.parent.entity.students[index].id
                console.log(id)
              }

              $http.get('http://81.192.194.109:8182/CapMissionApp/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {

                $rootScope.son = data
                $ionicLoading.hide();
                console.log('value : ' + window.localStorage.getItem('login'))
                $location.path('/parent/emploiEnfant2');

              }).error(function (data) {

                //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
                toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
                navigator.app.exitApp();
              })
            } else {
              $location.path('/choix');
            }
          }
        }
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

