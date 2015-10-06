var quiz = angular.module('capMission.tab.quiz', []);

quiz.controller('QuizzCtrl', ['$scope', function ($scope) {
  $scope.data = {};
  $scope.courses = [
    {id: 0, name: "Mathématiques"},
    {id: 1, name: "Physique"},
    {id: 2, name: "Économie"}
  ];

  $scope.courseSelected = function () {
    $scope.quizzes = [{id: 1, name: 'Quizz1'}, {id: 2, name: 'Quizz2'}, {id: 3, name: 'Quizz3'}];
  };

  $scope.quizzes = [];
}]);

quiz.controller('QuizzQuestionsCtrl', ['$scope', '$location', '$state', '$stateParams', function ($scope, $location, $state, $stateParams) {
  $scope.validateDisabled = true;

  $scope.unselectOthers = function (index) {
    $scope.validateDisabled = true;

    for (var i = $scope.answers.length - 1; i >= 0; i--) {
      if (i !== index) {
        $scope.answers[i].Selected = false;
      }

      if ($scope.validateDisabled === true) {
        $scope.validateDisabled = $scope.answers[i].Selected == false;
      }
    }
  };

  $scope.validateQuestion = function () {
    $state.go("tab.quizz-end", {id: $stateParams.id});
  };


  $scope.answers = [{id: 1, name: 2}, {id: 0, name: 4}, {id: 2, name: 3}, {id: 3, name: 1}];

}]);

quiz.controller('QuizzEndCtrl', ['$scope', function ($scope) {
}]);
