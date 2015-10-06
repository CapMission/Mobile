// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var CapMission = angular.module('capMission', [
  'ionic',
  'ngCordova',
  'ngCordovaOauth',
  'ngCordovaOauth.canvas',
  'capMission.authentication',
  'capMission.tab',
  'capMission.services'
]);

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
  });
}]);

CapMission.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

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
    .state('tab.quizz', {
      url: '/quizz',
      views: {
        'tab-quizz': {
          templateUrl: 'tab/quiz/index.html',
          controller: 'QuizzCtrl'
        }
      }
    })
    .state('tab.quizz-questions', {
      url: '/quizz/:id',
      views: {
        'tab-quizz': {
          templateUrl: 'tab/quizz/questions.html',
          controller: 'QuizzQuestionsCtrl'
        }
      }
    })
    .state('tab.quizz-end', {
      url: '/quizz/:id/end',
      views: {
        'tab-quizz': {
          templateUrl: 'tab/quizz/end.html',
          controller: 'QuizzEndCtrl'
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
  $urlRouterProvider.otherwise('/tab/home');

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
      $scope.$on("$ionicView.leave", function () {
        $rootScope.hideTabs = false;
      });
    }
  };
}]);



CapMission.directive('navLogo', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'A',
    link: function ($scope, $el, attrs) {
      $scope.$on("$ionicView.enter", function () {
        $rootScope.logoState = attrs.navLogo;
      });
      $scope.$on("$ionicView.beforeLeave", function () {
        $rootScope.logoState = null;
      });
    }
  };
}]);
