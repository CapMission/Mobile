var stat = angular.module('capMission.tab.stat', []);

stat.controller('StatCtrl', function ($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
