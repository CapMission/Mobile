var home = angular.module('capMission.tab.home', ['ngResource','ui.router','ui.bootstrap']);
/*home.filter('startFrom', function () {
  return function (input, start) {
    if (angular.isArray(input)) {
      var st = parseInt(start, 10);
      if (isNaN(st)) st = 0;
      return input.slice(st);
    }
    return input;
  };
});*/
home.controller('HomeCtrl', ['$scope','$rootScope','$ionicPopover','$http','$ionicHistory', function ($scope,$rootScope, $ionicPopover, $http,$ionicHistory) {
  //alert($scope.resp.entity.id)
  //$rootScope.resp
  //$scope.now = new Date();
  //$id = $rootScope.resp.entity.id
  //console.log('id:'+$id)
  //$http.get('http://localhost:8182/students/'+$id).success(function(data, status, headers, config){
  //
  //  $scope.time = data
  //  console.log(JSON.stringify({data: data}))
  //  console.log($scope.time.toString().length);
  //
  //
  //}).error(function(data){
  //  toastr.error('KO');
  //
  //});
  $scope.goBack = function(){
    $ionicHistory.goBack();
  }

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });

}]);


home.controller('OffersCtrl', ['$scope', function ($scope) {
}]);

home.controller('SoldeCtrl', ['$scope','$ionicPopover','$http','$ionicHistory', function ($scope, $ionicPopover, $http,$ionicHistory) {
  $http.get('http://localhost:8182/students/25').success(function(data, status, headers, config){
    $scope.pay = data
    console.log(JSON.stringify({data: data}))
    //toastr.success('OK');

  }).error(function(data){
    toastr.error('KO');

  });
  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

home.controller('ProfileCtrl',['$scope','$ionicPopover','$http','$ionicHistory', function ($scope, $ionicPopover, $http,$ionicHistory)  {
 // alert(JSON.stringify({data: data}))

  //alert($scope.resp)
    $http.get('http://localhost:8182/students/25').success(function(data, status, headers, config){
      $scope.us = data
      console.log(JSON.stringify({data: data}))
      //toastr.success('OK');

    }).error(function(data){
      toastr.error('KO');

    });
 /* $http.get('http://localhost:8182/payments/29').success(function (data, status, headers, config) {
    $scope.solde = data;
    alert(JSON.stringify({data: data}))

  });*/
  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });


}]);
