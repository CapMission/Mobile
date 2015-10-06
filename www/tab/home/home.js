var home = angular.module('capMission.tab.home', []);

home.controller('HomeCtrl', function ($scope, $ionicPopover) {

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });

});


home.controller('OffersCtrl', function ($scope) {
});

home.controller('ProfileCtrl', function ($scope) {
});
