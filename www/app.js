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
  'capMission.parent',
  'capMission.student',
  'capMission.teacher',
  'capMission.services',
  'satellizer',
  'ui.bootstrap',
  'ionicProcessSpinner',
  'services'
]);
CapMission.controller('capController',function($scope,$rootScope, $location, $auth, $http,$ionicLoading,$ionicHistory){

  $rootScope.login = function(user) {

    $ionicLoading.show({
      template: 'Chargement...'
    });
    $http.post('http://81.192.194.109:8182/CapMissionApp/auth/login', user).success(function(data, status, headers, config){
      $rootScope.resp = data

      $ionicLoading.hide();

      console.log(JSON.stringify({data: data}))
      $ionicHistory.clearHistory();
      $ionicHistory.clearCache();
      $ionicHistory.nextViewOptions({ disableBack: true, disableAnimate: true, historyRoot: true });
      $location.path('/role');
    }).error(function(data){
      $rootScope.errorMessage = 'Login/Mot de passe incorrect';

      $ionicLoading.hide();
      $location.path('/login');
    });

  }

  //console.log(data)
})
/*
CapMission.directive('uiShowPassword', [
  function () {
    return {
      restrict: 'A',
      scope: true,
      link: function (scope, elem, attrs) {
        var btnShowPass = angular.element('<button class="button button-clear"><i class="ion-eye"></i></button>'),
          elemType = elem.attr('type');

        // this hack is needed because Ionic prevents browser click event
        // from elements inside label with input
        btnShowPass.on('mousedown', function (evt) {
          (elem.attr('type') === elemType) ?
            elem.attr('type', 'text') : elem.attr('type', elemType);
          btnShowPass.toggleClass('button-positive');
          //prevent input field focus
          evt.stopPropagation();
        });

        btnShowPass.on('touchend', function (evt) {
          var syntheticClick = new Event('mousedown');
          evt.currentTarget.dispatchEvent(syntheticClick);

          //stop to block ionic default event
          evt.stopPropagation();
        });

        if (elem.attr('type') === 'password') {
          elem.after(btnShowPass);
        }
      }
    };
  }]);
*/

CapMission.constant("Constants", {
  "URL_API": "http://localhost:8182/CapMissionApp"
  //"URL_CANVAS": "http://192.168.1.9/"
});
/*CapMission.filter('offset', function() {
  return function(input, start) {
    if (!input || !input.length) { return; }
    start = +start; //parse to int
    return input.slice(start);
  }
});*/


CapMission.run(['$ionicPlatform', '$rootScope','$state','authService', function ($ionicPlatform, $rootScope,$state,authService) {
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
/*CapMission.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.onHardwareBackButton(function () {
    if(true) { // your check here
      $ionicPopup.confirm({
        title: 'Avertissement',
        template: 'Etes-vous sûrs de vouloir quitter?'
      }).then(function(res){
        if( res ){
          navigator.app.exitApp();
        }
      })
    }
  })
});*/
CapMission.config(function($authProvider) {
  $authProvider.facebook({
    clientId: '561387454023937',
    redirectUri : 'http://localhost:8100/'
  });

  $authProvider.google({
    clientId: '44134246491-n2ehu6gvrjvcti4jap05kkig4adsgtr9.apps.googleusercontent.com'
  });

  /*$authProvider.baseUrl = 'http://localhost:8100/';
    var commonConfig = {
      popupOptions: {
        location: 'no',
        toolbar: 'yes',
        width: window.screen.width,
        height: window.screen.height
      }
    };

    if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
      //$authProvider.Platform ='mobile';
      //commonConfig.redirectUri = 'http://localhost:8100/';
      $authProvider.cordova = true;
      commonConfig.redirectUri = 'http://localhost:8100/';
    }

    //$authProvider.redirectUri = 'http://localhost:8100/';

    $authProvider.facebook(angular.extend({}, commonConfig, {
      clientId: '561387454023937',
      //responseType : 'token'
      url: 'http://localhost:8182/auth/facebook'
      //redirectUri : 'http://localhost:8100/'
    }));


   /* $authProvider.twitter(angular.extend({}, commonConfig, {
      url: 'http://localhost:3000/auth/twitter'
    }));

    $authProvider.google(angular.extend({}, commonConfig, {
      clientId: '44134246491-n2ehu6gvrjvcti4jap05kkig4adsgtr9.apps.googleusercontent.com'
      //redirectUri : 'http://localhost:8100/home/'
    }));*/
  });

CapMission.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

  $ionicConfigProvider.backButton.previousTitleText(false).text('');


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in 'nom de la partie'.js par exemple: authentication.js, follow.js, home.js etc etc
  $stateProvider


    .state('login', {
      url: '/login',
      controller: 'capController',
      templateUrl: 'authentication/login.html',

    })
    .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
      })

   /* .state('ecole', {
      url: '/ecole',
      controller: 'EcoleCtrl',
      templateUrl: 'authentication/ecole.html'
    })

    .state('niveau', {
      url: '/niveau',
      controller: 'NiveauCtrl',
      templateUrl: 'authentication/niveau.html'
    })
*/
    .state('role', {
      url: '/role',
      controller: 'RoleCtrl',
      templateUrl: 'authentication/role.html'
    })

    .state('choix', {
      url: '/choix',
      controller: 'ChoixCtrl',
      templateUrl: 'authentication/choix.html'
    })

    .state('parent', {
      url: '/parent/index',
      templateUrl: 'parent/index.html',
      controller: 'ParentCtrl'

    })
    .state('apropos', {
      url: '/parent/apropos',
      templateUrl: 'parent/apropos.html',
      controller: 'ProposCtrl'

    })
    .state('feedback', {
      url: '/parent/feedback',
      templateUrl: 'parent/feedback.html',
      controller: 'BackCtrl'

    })
    .state('emploiEnfant', {
      url: '/parent/emploiEnfant',
      controller: 'EnfantCtrl',
      templateUrl: 'parent/empoiEnfant.html'
    })
    .state('parent_profil', {
     // parent: parent,
      url: '/parent/profil',
      templateUrl: 'parent/profil.html',
      controller: 'PprofileCtrl'

    })
    .state('parent_solde', {
     // parent : parent,
      url: '/parent/solde',
      templateUrl: 'parent/solde.html',
      controller: 'PsoldeCtrl'

    })
    .state('student', {
      url: '/student',
      templateUrl: 'student/index.html',
      controller: 'StudentCtrl'

    })
    .state('student_profil', {
      // parent: parent,
      url: '/student/profil',
      templateUrl: 'student/profil.html',
      controller: 'SprofileCtrl'

    })
    .state('student_solde', {
      // parent : parent,
      url: '/student/solde',
      templateUrl: 'student/solde.html',
      controller: 'SsoldeCtrl'

    })
    .state('teacher', {
      url: '/teacher',
      templateUrl: 'teacher/index.html',
      controller: 'TeacherCtrl'

    })
    .state('teacher_profil', {
      // parent: parent,
      url: '/teacher/profil',
      templateUrl: 'teacher/profil.html',
      controller: 'TprofileCtrl'

    })
    .state('teacher_solde', {
      // parent : parent,
      url: '/teacher/solde',
      templateUrl: 'teacher/solde.html',
      controller: 'TsoldeCtrl'

    })


    // setup an abstract state for the tabs directive

    .state('tab', {
      url: '/tab',
      abstract: true,//Si je tape l'url avec /tab rien ne va se produire, c'est juste pour l'organisation du code
      controller: 'TabsCtrl', //Ce controller est défini au niveau de tab.js dans le dossier tab de la repository www
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
          controller: 'ProfileCtrl',
        }
      }
    })
    .state('tab.home-solde', {
      url: '/solde',
      views: {
        'tab-home': {
          templateUrl: 'tab/home/solde.html',
          controller: 'SoldeCtrl',
        }
      }
    })

   .state('tab.test', {
      url: '/test',
      views:{
          'test':{
                templateUrl: 'tab/test/test.html',
                controller: ''
                 }
      }
    })
    /*.state('tab.quiz', {
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
    })*/
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
  function skipIfLoggedIn($q, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.reject();
    } else {
      deferred.resolve();
    }
    return deferred.promise;
  }

  /*$httpProvider.interceptors.push(['$q', 'Constants', function ($q, Constants) {
    return {

      request: function (config) {
       /* console.warn(config.url);
        if (config.url.indexOf(Constants.URL_CANVAS) !== -1) {
          config.headers.Authorization = "Bearer fgnxtyZlcqMsMOT6GGpUfeBtlstr0JjuOBh0mPE1peOwj7jJzsOTTAm483Ykai1i";
        }
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
  }]);*/

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
/*CapMission.factory('UserService', [function(user) {
  return {
    login : user.login
  };
}])*/

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
