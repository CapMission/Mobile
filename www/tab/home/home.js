var home = angular.module('capMission.tab.home', []);

home.controller('HomeCtrl', ['$scope','$ionicPopover', function ($scope, $ionicPopover) {

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });

}]);


home.controller('OffersCtrl', ['$scope', function ($scope) {
}]);

home.controller('ProfileCtrl', ['$scope', function ($scope) {
}]);
