/**
 * Created by MSIKA.SAFAA on 25/04/2016.
 */
var teacher = angular.module('capMission.teacher', ['ngResource','ui.router','ui.bootstrap']);

teacher.controller('TeacherCtrl', ['$scope','$location','$rootScope','$http','$ionicPopover', function ($scope,$location,$rootScope,$http,$ionicPopover) {
 $scope.now = new Date()
  $scope.get = function(id) {
    $http.get('http://81.192.194.109:8182/CapMissionApp/teachers/' + id).success(function (data, status, headers, config) {
      //$scope.test="safaa"

      $rootScope.teacher = data
      console.log('Data teacher'+JSON.stringify({data: data}))

      if(data.entity == null){
        toastr.warning("Désolés, vous n'êtes pas autorisés à accéder en tant qu'enseignant");
        $location.path('/role');
      }
      else{
        $location.path('/teacher');

      }
    }).error(function (data) {
      toastr.error('Echec de connexion');

    });

  }
  $ionicPopover.fromTemplateUrl('teacher/teacher-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
teacher.controller('TprofileCtrl', ['$scope','$ionicPopover','$ionicHistory', function ($scope, $ionicPopover,$ionicHistory) {

  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('teacher/teacher-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
teacher.controller('TsoldeCtrl', ['$scope','$ionicPopover','$ionicHistory', function ($scope, $ionicPopover,$ionicHistory) {

  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('teacher/teacher-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
teacher.controller('TtimeCtrl', ['$scope','$ionicPopover','$rootScope','$http','$location', function ($scope, $ionicPopover,$rootScope,$http,$location) {
  $id = resp.entity.id
  $http.get('http://81.192.194.109:8182/CapMissionApp/teachers/' + $id).success(function (data, status, headers, config) {
    //$scope.test="safaa"

    $rootScope.teach = data
    console.log('Data emploi'+JSON.stringify({data: data}))
    $location.path('teacher/index.html');
  }).error(function (data) {
    toastr.error('Echec de connexion');

  });
  $ionicPopover.fromTemplateUrl('teacher/teacher-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
