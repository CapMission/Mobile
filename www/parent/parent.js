var parent = angular.module('capMission.parent', ['ngResource', 'ui.router', 'ui.bootstrap','ionicProcessSpinner']);

parent.filter('startFrom', function () {
  /*return function(input, start) {
   if (!input || !input.length) { return; }
   start = +start; //parse to int
   return input.slice(start);
   }*/
  return function (input, start) {
    if (input) {
      start = +start; //parse to int
      return input.slice(start);
    }
    return [];
  }
});
parent.controller('LogoutCtrl', function($location, $auth, $state,$ionicHistory,authService) {
  /*$scope.logout = function(){
   authService.logout()
   .then(function(result){
   $ionicHistory.clearHistory();
   $ionicHistory.clearCache();
   $ionicHistory.nextViewOptions({ disableBack: true, disableAnimate: true, historyRoot: true });

   $state.go('login', {}, {reload: true});
   });
   };*/
  //alert('exit !!')
  //navigator.app.exitApp();


});
parent.controller('ParentCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', function ($scope, $rootScope, $http, $location, $ionicPopover) {


  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });

}]);
parent.controller('ProposCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory) {

  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
parent.controller('BackCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory) {

  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);


parent.controller('EnfantCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory','$ionicLoading', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory,$ionicLoading) {
  //$id = $rootScope.parent.entity.students.id

  $scope.now = new Date() ;
  $scope.getd = function (id) {
    $ionicLoading.show({
      template: 'Chargement ...'
    });
    $http.get('http://81.192.194.109:8182/CapMissionApp/students/' + id).success(function (data, status, headers, config) {
      //$scope.items = []
      $rootScope.son = data
      $ionicLoading.hide();
     /* $rootScope.currentPage = 1;
      $scope.itemsPerPage = 2;
      $rootScope.pageSize = 10;*/
     /* $scope.pageChangeHandler = function(num) {
        console.log('meals page changed to ' + num);
      };*/

      $location.path('/parent/emploiEnfant');
    }).error(function (data) {
      toastr.error('Echec de connexion');

    })

  }

  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

parent.controller('PprofileCtrl', ['$scope', '$ionicPopover', '$ionicHistory', '$rootScope', '$http', function ($scope, $ionicPopover, $ionicHistory, $rootScope, $http) {
  //$rootScope.profil = $rootScope.parent.entity
  $id = $rootScope.resp.entity.id
  $http.get('http://81.192.194.109:8182/CapMissionApp/parents/' + $id).success(function (data, status, headers, config) {
    //$scope.test="safaa"
    $rootScope.profil = data
    console.log('parent data' + JSON.stringify({data: data}))
  }).error(function (data) {
    toastr.error('Echec de connexion');

  });


  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
parent.controller('PsoldeCtrl', ['$scope', '$ionicPopover', '$ionicHistory', function ($scope, $ionicPopover, $ionicHistory) {

  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
parent.controller('PtimeCtrl', ['$scope', '$ionicPopover', '$ionicHistory', function ($scope, $ionicPopover, $ionicHistory) {
  $scope.test = "emploi"
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
