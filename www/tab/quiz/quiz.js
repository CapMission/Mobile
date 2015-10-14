var quiz = angular.module('capMission.tab.quiz', []);

quiz.controller('quizCtrl', ['$scope', '$state','courses', function ($scope, $state, courses) {
  $scope.data = {};
  $scope.courses = courses;


  $scope.classes = ["positive-bg", "energized-bg", "assertive-bg", "calm-bg", "balanced-bg", "royal-bg", "dark-bg"];

  $scope.courseSelected = function () {
    $scope.quizzes = [{id: 1, name: 'quiz1'}, {id: 2, name: 'quiz2'}, {id: 3, name: 'quiz3'}];
  };

  $scope.go = function (state, params) {
    $state.go(state, params);
  };

  $scope.quizzes = [];
}]);

quiz.controller('quizListCtrl', ['$scope', '$state', '$stateParams','quizzes', function ($scope, $state, $stateParams, quizzes) {
  $scope.quizzes = quizzes;
  $scope.idCourse = $stateParams.idCourse;

  $scope.classes = ["calm-bg", "balanced-bg", "royal-bg", "dark-bg", "positive-bg", "energized-bg", "assertive-bg"];

  $scope.go = function (state, params) {
    $state.go(state, params);
  };

}]);

quiz.controller('quizQuestionsCtrl', ['$scope', '$location', '$state', '$stateParams', '$cordovaDialogs', '$timeout', 'questions', function ($scope, $location, $state, $stateParams, $cordovaDialogs, $timeout, questions) {
  $scope.validateDisabled = true;

  $scope.answers = {quiz_questions: []};

  $scope.questionNumber = 0;

  $scope.questions = [{
    id: 1,
    title: "Voici une question",
    answers: [{id: 1, name: 2, weight: 100}, {id: 0, name: 4, weight: 0}, {id: 2, name: 3, weight: 0}, {
      id: 3,
      name: 1,
      weight: 0
    }]
  }, {
    id: 2,
    title: "Voici une deuxième question",
    answers: [{id: 1, name: "Réponse", weight: 0}, {id: 0, name: "Réponse 2", weight: 100}, {
      id: 2,
      name: "Réponse 3",
      weight: 0
    }]
  }, {
    id: 3,
    title: "Voici une troisième question",
    answers: [{id: 1, name: "Réponse", weight: 0}, {id: 0, name: "Réponse 2", weight: 100}, {
      id: 2,
      name: "Réponse 3",
      weight: 0
    }]
  },{
    id: 4,
    title: "Voici une quatrième question",
    answers: [{id: 1, name: "Réponse", weight: 0}, {id: 0, name: "Réponse 2", weight: 100}, {
      id: 2,
      name: "Réponse 3",
      weight: 0
    }]
  },{
    id: 4,
    title: "Voici une quatrième question",
    answers: [{id: 1, name: "Réponse", weight: 0}, {id: 0, name: "Réponse 2", weight: 100}, {
      id: 2,
      name: "Réponse 3",
      weight: 0
    }]
  }];

  $scope.questions = questions;

  var elt = angular.element('#point-questions');

  $scope.deltaClick = function(index) {
    $scope.delta = $scope.delta+index;
    elt.css("transform", 'translate3d(' + $scope.delta + 'px,0,0)');
  };

  $scope.delta = 0;
  $scope.pan = function (event) {
    $scope.delta = event.deltaX;
    elt.css("transform", 'translate3d(' + $scope.delta + 'px,0,0)');
  };

  var clicked = false;
  $scope.nextQuestion = function (answer, event) {
    if (!clicked) {
      clicked = true;
      var elt = angular.element(event.target);
      if (answer.weight === 100) {
        elt.css("background-color", "#dff0d8");
        $scope.questions[$scope.questionNumber].correct = true;
      } else {
        elt.css("background-color", "#f2dede");
        $scope.questions[$scope.questionNumber].correct = false;
      }
      $timeout(function () {
        if ($scope.questionNumber + 1 < $scope.questions.length) {
          $scope.questionNumber++;
          $scope.answers.quiz_questions.push({id:$scope.questions[$scope.questionNumber].id , answer:answer.id});
        } else {
          $state.go('tab.quiz-end');
        }
        clicked = false;
      }, 200);
    }
  };

  $scope.quitQuiz = function () {
    $cordovaDialogs.confirm('Voulez vous vraiment quitter le quizz ?', 'Confirmation')
      .then(function (buttonIndex) {
        // no button = 0, 'OK' = 1, 'Cancel' = 2
        if (buttonIndex == 1) {
          $state.go('tab.home');
        }
      });
  };


}]);

quiz.controller('quizEndCtrl', ['$scope', function ($scope) {
}]);
