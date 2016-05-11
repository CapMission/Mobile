/**
 * Created by MSIKA.SAFAA on 25/04/2016.
 */
var student = angular.module('capMission.student', ['ngResource','ui.router','ui.bootstrap']);

student.controller('StudentCtrl', ['$scope','$http','$rootScope','$location','$ionicPopover', function ($scope, $http, $rootScope,$location,$ionicPopover) {
  $scope.now = new Date()
  $scope.get = function (id) {
    $http.get('http://81.192.194.109:8182/CapMissionApp/students/auth/' + id).success(function (data, status, headers, config) {
      //$scope.test="safaa"

      $rootScope.student = data
      //console.log('Data choix'+JSON.stringify({data: data}))

      if(data.entity == null){
        toastr.warning("Désolés, vous n'êtes pas autorisés à accéder en tant qu'étudiant");
        $location.path('/role');
      }
      else{
        $location.path('/student');

      }
    }).error(function (data) {
      toastr.error('Echec de connexion');

    });
  }
  $ionicPopover.fromTemplateUrl('student/student-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

student.controller('SprofileCtrl', ['$scope','$ionicPopover','$http','$ionicHistory', function ($scope,$ionicPopover, $http,$ionicHistory) {


  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('student/student-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
student.controller('SsoldeCtrl', ['$scope','$ionicPopover','$http','$ionicHistory', function ($scope,$ionicPopover, $http,$ionicHistory) {

  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('student/student-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
student.controller('StimeCtrl', ['$scope','$ionicPopover','$http','$ionicHistory', function ($scope,$ionicPopover, $http,$ionicHistory) {

  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('student/student-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
