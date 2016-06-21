// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in indexT.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var CapMission = angular.module('capMission', [
  'ionic',
  'ngCordova',
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
  'services',
  'ngStorage',
  'simplePagination'
]);


CapMission.filter('singleDecimal', function ($filter) {
  return function (input) {
    if (isNaN(input)) return input;
    return Math.round(input * 10) / 10;
  };
});

CapMission.filter('setDecimal', function ($filter) {
  return function (input, places) {
    if (isNaN(input)) return input;
    // If we want 1 decimal place, we want to mult/div by 10
    // If we want 2 decimal places, we want to mult/div by 100, etc
    // So use the following to create that factor
    var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
    return Math.round(input * factor) / factor;
  };
});


CapMission.controller('capController', function ($scope, $rootScope, $location, $auth, $http, $ionicLoading, $localStorage) {

  $scope.showLoading = function () {
    $ionicLoading.show({
      content: '<div class="icon ion-loading-c"></div>',
      animation: 'fade-in',
      duration: 1500
    });
  }
  $scope.hideLoading = function () {
    $ionicLoading.hide()
  }

  var currentDate,
    weekStart,
    weekEnd,
    shortWeekFormat = "dddd DD MMMM";

  function setCurrentDate(aMoment) {
    currentDate = aMoment,
      weekStart = currentDate.clone().startOf('week'),
      weekEnd = currentDate.clone().endOf('week')
  }
  setCurrentDate(moment());
  $scope.currentWeek = function () {
    return currentDate.format(shortWeekFormat);
  };
  $scope.currentWeekStart = function () {
    return weekStart.format(shortWeekFormat);
  };
  $scope.currentWeekEnd = function () {
    return weekEnd.format(shortWeekFormat);
  };
  $scope.nextWeek = function () {
    setCurrentDate(currentDate.add(7, 'days'));

  };
  $scope.prevWeek = function () {
    setCurrentDate(currentDate.subtract(7, 'days'));

  };
  $scope.week = function (item) {
    var eventTime = moment(item.start);

    return (eventTime >= weekStart && eventTime <= weekEnd);
  };
  $scope.checkStatus = window.localStorage.getItem('status')
  if ($scope.checkStatus === 'undefined') {
    window.localStorage.clear()
    $scope.checkStatus = false
    console.log('false checkbox : ' + $scope.checkStatus)

  }
  else if ($scope.checkStatus === 'true') {
    $scope.username = window.localStorage.getItem('login')
    $scope.password = window.localStorage.getItem('password')
    $scope.checkStatus = true
    window.localStorage.setItem('status', 'true');
    console.log('true checkbox : ' + $scope.checkStatus)
  }

  $rootScope.login = function (user) {
    console.log('status before : ' + $scope.checkStatus)
    window.localStorage.setItem('status', $scope.checkStatus);
    console.log('status  : ' + $scope.checkStatus)
    $ionicLoading.show({
      template: 'Chargement'
    });
    $http.post('http://81.192.194.109:8182/CapMissionApp/auth/login', user, {timeout: 30000}).success(function (data, status, headers, config) {
      $rootScope.resp = data
      $scope.test = data
      console.log('login before : ' + $scope.test.entity.login)

      window.localStorage.setItem('id', $scope.test.entity.id);
      window.localStorage.setItem('login', $scope.test.entity.login);
      window.localStorage.setItem('password', $scope.test.entity.password);

      console.log('value id : ' + window.localStorage.getItem('id'))
      console.log('value login : ' + window.localStorage.getItem('login'))
      console.log('value password : ' + window.localStorage.getItem('password'))
      $ionicLoading.hide();

      //console.log(JSON.stringify({data: data}))
      $location.path('/role');
    }).error(function (data, status) {
      if (status == 0) {
        toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
        navigator.app.exitApp();
      }
      else if (data.login != window.localStorage.getItem('login') || data.password != window.localStorage.getItem('password')) {
        $rootScope.errorMessageChang = "Votre login ou mot de passe a été changé ! Veuillez contacter Cap Mission pour plus d'informations";
      }
      else if (data.login != user.login || data.password != user.password) {
        $rootScope.errorMessage = 'Login/Mot de passe incorrect';
      }
      $ionicLoading.hide();
      $location.path('/login');

    });

  }

})

CapMission.controller("EmailController",function($scope,$ionicPopup,$rootScope,$ionicModal,$http,$ionicLoading,$ionicHistory){
  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $rootScope.get = function(id,enfant,period,debut){
    $rootScope.idF = id
    $rootScope.child = enfant
    $rootScope.period = period
    $rootScope.debut = debut
    debutDate = new Date(debut).toLocaleDateString('fr-FR', {
      day : 'numeric',
      month : 'short',
      year : 'numeric',
      hour : 'numeric',
      minute : 'numeric'
    }).split(' ').join('-');
    console.log('idF: '+id)
    console.log('enfant: '+enfant)
    console.log('period: '+period)
    console.log('debut: '+debutDate)
  }
  $rootScope.send = function(mail,id,enfant,period,debut) {

    //$test = $rootScope.parent.entity.mail

    mail.to='info@capmission.com'
    mail.from= 'capmission.com@gmail.com'
    //mail.subject='Modification séance de : '+ enfant + 'le : ' + debutDate
    id = $rootScope.idF
    enfant = $rootScope.child
    period = $rootScope.period
    debut = $rootScope.debut
    debutDate = new Date(debut).toLocaleDateString('fr', {
      weekday : 'long',
      month : 'short',
      year : 'numeric',
      hour : 'numeric',
      minute : 'numeric'
    }).split(' ').join('-');
    mail.subject='Modification de la séance ' + period  + ' de : '+ enfant + ' le : ' + debutDate

    console.log('idHF: '+id)
    console.log('child: '+enfant)
    console.log('period: '+period)
    console.log('debut: '+debutDate)
    console.log('to: '+mail.to)
    console.log('from: '+mail.from)
    console.log('subject: '+mail.subject)
    console.log('body: '+mail.body)

    $ionicLoading.show({
      template: "En cours d'envoi !"
    });
    $http.post('http://81.192.194.109:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
      $ionicLoading.hide();
      toastr.success('Votre demande a été envoyée avec succès')
      //$ionicHistory.goBack();
    }).error(function (data, status) {
      if (status == 0) {
        toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
        navigator.app.exitApp();
      }
      else {
        $ionicLoading.hide();
        toastr.error("Echec envoi de message ! Réessayez plus tart !")
      }
    });

  }

  /*$scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
   title: 'Attention',
   template: 'Etes-vous sûrs de vouloir modifier cette séance?',
   cancelText: 'Annuler',
   cancelType: 'button-assertive',
   okText: 'Continuer',
   okType: 'button-balanced'
   /!*buttons: [
   { text: 'Annuler',
   type: 'button-assertive',
   onTap: function(e) {
   alert('not suuuure')
   }
   },
   {
   text: '<b>Continuer</b>',
   type: 'button-balanced',
   onTap: function(e){
   }
   }
   ]*!/
   });
   confirmPopup.then(function(res) {
   if(res) {
   console.log('You are sure');
   } else {
   console.log('You are not sure');
   }
   });
   };*/

});
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
  "URL_API": "http://81.192.194.109:8182/CapMissionApp"
  //"URL_CANVAS": "http://192.168.1.9/"
});

/*CapMission.filter('offset', function() {
  return function(input, start) {
    if (!input || !input.length) { return; }
    start = +start; //parse to int
    return input.slice(start);
  }
});*/

CapMission.run(['$ionicPlatform', '$rootScope','$state','authService','$ionicHistory', function ($ionicPlatform, $rootScope,$state,authService,$ionicHistory) {
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

CapMission.controller('LogoutCtrl', function ($location, $auth, $state, $ionicHistory, authService, $scope, $ionicPopup) {

  $scope.logout = function () {

    var alertPopup = $ionicPopup.alert({
      title: 'A bientôt',
      template: null
    });

    alertPopup.then(function (res) {
      navigator.app.exitApp();
    });
  };

});


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

  $ionicConfigProvider.tabs.position('top');
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
      //template: 'authentication/logout.html',
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
    .state('parent_reglement', {
      url: '/parent/reglement',
      templateUrl: 'parent/reglement.html',
      controller: 'RegParentCtrl'

    })
    .state('student_reglement', {
      url: '/student/reglement',
      templateUrl: 'student/reglement.html',
      controller: 'RegStudentCtrl'

    })
    .state('contact', {
      url: '/parent/contact',
      templateUrl: 'parent/Contact.html',
      controller: 'PContactCtrl'

    })
    .state('scontact', {
      url: '/student/scontact',
      templateUrl: 'student/SContact.html',
      controller: 'SContactCtrl'

    })
    .state('tcontact', {
      url: '/teacher/tcontact',
      templateUrl: 'teacher/TContact.html',
      controller: 'TContactCtrl'

    })
    .state('apropos', {
      url: '/parent/apropos',
      templateUrl: 'parent/apropos.html',
      controller: 'ProposCtrl'

    })
    .state('aproposS', {
      url: '/student/apropos',
      templateUrl: 'student/apropos.html',
      controller: 'SProposCtrl'

    })
    .state('aproposT', {
      url: '/teacher/apropos',
      templateUrl: 'teacher/apropos.html',
      controller: 'TProposCtrl'

    })
    .state('feedback', {
      url: '/parent/feedback',
      templateUrl: 'parent/feedback.html',
      controller: 'BackCtrl'

    })
    .state('emploiEnfant2', {
      url: '/parent/emploiEnfant2',
      controller: 'ChoixCtrl',
      templateUrl: 'parent/empoiEnfant.html'
    })
    .state('emploiEnfant', {
      url: '/parent/emploiEnfant',
      controller: 'EnfantCtrl',
      templateUrl: 'parent/empoiEnfant.html'
    })
    .state('ChoixEnfantSolde', {
      url: '/parent/ChoixEnfantSolde',
      controller: 'ChoixsoldeCtrl',
      templateUrl: 'parent/ChoixEnfantSolde.html'
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
    /*.state('parent_solde2', {
     url: '/parent/solde2',
     controller: 'PsoldeCtrl',
     templateUrl: 'parent/solde.html'
     })*/
    .state('student', {
      url: '/student',
      templateUrl: 'student/indexS.html',
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
      templateUrl: 'teacher/indexT.html',
      controller: 'TeacherCtrl'

    })
    .state('ChoixSolde', {
      url: '/teacher/ChoixSolde',
      templateUrl: 'teacher/ChoixSolde.html',
      controller: 'ChoixSoldeCtrl'


    })
    .state('amont', {
      url: '/teacher/amont',
      templateUrl: 'teacher/amont.html',
      controller: 'AmontSoldeCtrl'


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
     templateUrl: 'tab/quiz/indexT.html',
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
     templateUrl: 'tab/follow/indexT.html',
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

/**
 * extends string prototype object to get a string with a number of characters from a string.
 *
 * @type {Function|*}
 */
String.prototype.trunc = String.prototype.trunc ||
  function (n) {

    // this will return a substring and
    // if its larger than 'n' then truncate and append '...' to the string and return it.
    // if its less than 'n' then return the 'string'
    return this.length > n ? this.substr(0, n - 1) + '...' : this.toString();
  };
