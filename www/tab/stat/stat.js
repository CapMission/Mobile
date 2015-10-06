var stat = angular.module('capMission.tab.stat', []);

stat.controller('StatCtrl', ['$scope', function ($scope) {
  $scope.settings = {
    enableFriends: true
  };
}]);
