// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var CapMission = angular.module('capMission', [
  'ionic',
  'ngCordova',
  'ngCookies',
  'ngCordovaOauth',
  'ngCordovaOauth.canvas',
  'hmTouchEvents',
  'capMission.authentication',
  'capMission.tab',
  'capMission.services'
]);

CapMission.constant("Constants", {
  "URL_API": "http://localhost:8081/CapMission",
  "URL_CANVAS": "http://192.168.1.9/"
});

CapMission.run(['$ionicPlatform', '$rootScope', function ($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      console.warn(error);
    });
  });
}]);

CapMission.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

  $ionicConfigProvider.backButton.previousTitleText(false).text('');


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


    .state('login', {
      url: '/login',
      controller: 'LoginCtrl',
      templateUrl: 'authentication/login.html'
    })

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      controller: 'TabsCtrl',
      templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'tab/home/index.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('tab.home-offers', {
      url: '/offers/:id',
      views: {
        'tab-home': {
          templateUrl: 'tab/home/offers.html',
          controller: 'OffersCtrl'
        }
      }
    })
    .state('tab.home-profile', {
      url: '/profile',
      views: {
        'tab-home': {
          templateUrl: 'tab/home/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })
    .state('tab.quiz', {
      url: '/quiz',
      views: {
        'tab-quiz': {
          templateUrl: 'tab/quiz/index.html',
          controller: 'quizCtrl',
          resolve: {
            courses: ['$http', 'Constants', '$q', function ($http, Constants, $q) {
              var deferred = $q.defer();
              $http.get(Constants.URL_API + '/courses').then(function (response) {
                deferred.resolve(response.data);
              });
              return deferred.promise;
            }]
          }
        }
      }
    })
    .state('tab.quiz-questions', {
      cache: false,
      url: '/quiz/:idCourse/quizzes/:idQuiz',
      views: {
        'tab-quiz': {
          templateUrl: 'tab/quiz/questions.html',
          controller: 'quizQuestionsCtrl',
          resolve: {
            questions: ['$http', 'Constants', '$q', '$stateParams', function ($http, Constants, $q, $stateParams) {
              console.warn($stateParams);
              var deferred = $q.defer();
              $http.get(Constants.URL_API + '/courses/' + $stateParams.idCourse + '/quizzes/' + $stateParams.idQuiz + '/questions').then(function (response) {
                deferred.resolve(response.data);
              });
              return deferred.promise;
            }]
          }
        }
      }
    })
    .state('tab.quiz-list', {
      url: '/quiz/:idCourse/list',
      views: {
        'tab-quiz': {
          templateUrl: 'tab/quiz/quiz-list.html',
          controller: 'quizListCtrl',
          resolve: {
            quizzes: ['$http', 'Constants', '$q', '$stateParams', function ($http, Constants, $q, $stateParams) {
              var deferred = $q.defer();
              $http.get(Constants.URL_API + '/courses/' + $stateParams.idCourse + '/quizzes').then(function (response) {
                deferred.resolve(response.data);
              });
              return deferred.promise;
            }]
          }
        }
      }
    })
    .state('tab.quiz-end', {
      url: '/quiz/:id/end',
      views: {
        'tab-quiz': {
          templateUrl: 'tab/quiz/end.html',
          controller: 'quizEndCtrl'
        }
      }
    })
    .state('tab.follow', {
      url: '/follow',
      views: {
        'tab-follow': {
          templateUrl: 'tab/follow/index.html',
          controller: 'FollowCtrl'
        }
      }
    })
    .state('tab.stats', {
      url: '/stats',
      views: {
        'tab-stats': {
          templateUrl: 'tab/stat/index.html',
          controller: 'StatCtrl'
        }
      }
    })
    .state('tab.message', {
      url: '/message',
      views: {
        'tab-messages': {
          templateUrl: 'tab/message/index.html',
          controller: 'MessageCtrl'
        }
      }
    })
    .state('tab.message-detail', {
      url: '/message/:messageId',
      views: {
        'tab-messages': {
          templateUrl: 'tab/message/details.html',
          controller: 'MessageDetailsCtrl'
        }
      }
    })
    .state('tab.message-new', {
      url: '/message/new',
      views: {
        'tab-messages': {
          templateUrl: 'tab/message/new.html',
          controller: 'MessageNewCtrl'
        }
      }
    });

// if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

  $httpProvider.interceptors.push(['$q', 'Constants', function ($q, Constants) {
    return {

      request: function (config) {
       /* console.warn(config.url);
        if (config.url.indexOf(Constants.URL_CANVAS) !== -1) {
          config.headers.Authorization = "Bearer fgnxtyZlcqMsMOT6GGpUfeBtlstr0JjuOBh0mPE1peOwj7jJzsOTTAm483Ykai1i";
        }*/
        return config || $q.when(config);
      },
      response: function (response) {
        if (response.config.url.indexOf(Constants.URL_API) > -1) {
          var find = '<img src=\\"';
          var re = new RegExp(find, 'g');

          String.prototype.replaceAll = function(target, replacement) {
            return this.split(target).join(replacement);
          };


          var string = angular.toJson(response.data);
          console.warn(string);
          string = string.replaceAll(find, '<img src=\\"'+Constants.URL_CANVAS);
          //string = string.replace(re, '<img src=\"http://192.168.1.9/courses');
          console.warn(string);
         // response.data = angular.toJson(response.data).replace(/<img src="courses/g, '<img src="http://192.168.1.9/courses');
          response.data = angular.fromJson(string);
        }
        return response
      }
    };
  }]);

}]);

CapMission.factory('Data', function () {
  var data =
  {
    stateName: ''
  };

  return {
    getStateName: function () {
      return data.stateName;
    },
    setStateName: function (stateName) {
      data.stateName = stateName;
    }
  };
});

CapMission.directive('hideTabs', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'A',
    link: function ($scope, $el) {
      $scope.$on("$ionicView.enter", function () {
        $rootScope.hideTabs = true;
      });
      $scope.$on("$ionicView.beforeLeave", function () {
        $rootScope.hideTabs = false;
      });

      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        $rootScope.hideTabs = false;
      });

    }
  };
}]);
