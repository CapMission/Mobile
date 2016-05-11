var tab = angular.module('capMission.tab', [
  'capMission.tab.follow',
  'capMission.tab.home',
  'capMission.tab.message',
  'capMission.tab.quiz',
  'capMission.tab.stat',
  'capMission.teacher'

]);

tab.controller('TabsCtrl', ['$scope', '$ionicPopover', function ($scope, $ionicPopover) {
  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
  $scope.badgequiz = 1;
  $scope.badgeFollow = 0;
  $scope.badgeMessages = 0;
}]);

