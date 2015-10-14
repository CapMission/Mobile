var tab = angular.module('capMission.tab', [
  'capMission.tab.follow',
  'capMission.tab.home',
  'capMission.tab.message',
  'capMission.tab.quiz',
  'capMission.tab.stat'
]);

tab.controller('TabsCtrl', ['$scope', function ($scope) {
  $scope.badgequiz = 1;
  $scope.badgeFollow = 0;
  $scope.badgeMessages = 0;
}]);

