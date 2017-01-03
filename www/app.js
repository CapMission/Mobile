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
  'capMission.administ',
  'satellizer',
  'ui.bootstrap',
  'ionicProcessSpinner',
  'services',
  'ngStorage',
  'simplePagination',
  'ngAnimate',
  'toaster',
  'ionic.wizard',
  "checklist-model"
  //'googleanalytics'
]);
/*CapMission.run(function($ionicPopup) {
  var deploy = new Ionic.Deploy();
  deploy.watch().then(function() {}, function() {}, function(updateAvailable) {
    if (updateAvailable) {
      deploy.download().then(function() {
        deploy.extract().then(function() {
          deploy.unwatch();
          $ionicPopup.show({
            title: 'Mise à jour disponible',
            subTitle: "Une nouvelle mise à jour est disponible ! Voulez-vous l'installer?",
            buttons: [
              { text: 'Pas maintenant' },
              {
                text: 'Redémarrer',
                onTap: function(e) {
                  deploy.load();
                }
              }
            ]
          });
        });
      });
    }
  });
});*/

CapMission.filter('joinBy', function () {
  return function (input,delimiter) {
    return (input || []).join(delimiter || ',');
  };
});

CapMission.filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null)
      input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});


CapMission.filter('utc', [function() {
  return function(date) {
    if(angular.isNumber(date)) {
      date = new Date(date);
    }
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  }
} ]);

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

CapMission.directive('ionSearch', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      getData: '&source',
      model: '=?',
      search: '=?filter'
    },
    link: function(scope, element, attrs) {
      attrs.minLength = attrs.minLength || 0;
      scope.placeholder = attrs.placeholder || '';
      scope.search = {value: ''};

      if (attrs.class)
        element.addClass(attrs.class);

      if (attrs.source) {
        scope.$watch('search.value', function (newValue, oldValue) {
          if (newValue.length > attrs.minLength) {
            scope.getData({str: newValue}).then(function (results) {
              scope.model = results;
            });
          } else {
            scope.model = [];
          }
        });
      }

      scope.clearSearch = function() {
        scope.search.value = '';
      };
    },
    template: '<div class="item-input-wrapper">' +
    '<i class="icon ion-android-search"></i>' +
    '<input type="search" placeholder="{{placeholder}}" ng-model="search.value">' +
    '<i ng-if="search.value.length > 0" ng-click="clearSearch()" class="icon ion-close"></i>' +
    '</div>'
  };
})

CapMission.controller('LocalNotif', function($scope, $rootScope, $cordovaLocalNotification, $ionicPlatform) {



  })

CapMission.controller('capController', function ($scope, $rootScope, $location, $http, $ionicLoading, $cordovaOauth,$localStorage,URL_API) {



  var toUTCDate = function(date){
    var _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    return _utc;
  };

  var millisToUTCDate = function(millis){
    return toUTCDate(new Date(millis));
  };

  $rootScope.toUTCDate = toUTCDate;
  $rootScope.millisToUTCDate = millisToUTCDate;


  $rootScope.dateNow = new Date()
  /*if(window.localStorage.getItem('login') == null){
  console.log(window.localStorage.getItem('login'))}
*/
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
    shortWeekFormat = "ddd DD/MM";

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

  }
  else if ($scope.checkStatus === 'true') {
    $scope.username = window.localStorage.getItem('login')
    $scope.password = window.localStorage.getItem('password')
    $scope.checkStatus = true
    window.localStorage.setItem('status', 'true');
  }

  $rootScope.goAdmin = function(idAdmin){
    console.log('id admin : ' + idAdmin)
    $location.path('/home/message')
  }

  $rootScope.login = function (user) {
    $ionicLoading.show({
      template: 'Chargement'
    });

    if(user.login == "notif" && user.password == "capmission"){
      $ionicLoading.hide();
      $location.path('/home/message')
      window.localStorage.setItem('login', user.login);
      window.localStorage.setItem('password', user.password);

    }

    else if((window.localStorage.getItem('login') != user.login) || (window.localStorage.getItem('password') != user.password)){
      $http.post(URL_API+'/auth/login', user, {timeout: 40000}).success(function (data, status, headers, config) {
      /*$http.post('http://localhost:8182/CapMissionApp/auth/login', user, {timeout: 30000}).success(function (data, status, headers, config) {*/
        $rootScope.resp = data
        $scope.test = data


        /*$http.get(URL_API+'/users/'+ $rootScope.resp.entity.id, {timeout: 40000}).success(function (donnee) {
          $rootScope.userID = donnee
          var idUser = window.localStorage.getItem('droit')
          console.log('$scope type : '+  idUser)
          //console.log('$scope value : '+ typeof angular.fromJson($scope.userID.entity.droitAdmin) )
            //window.localStorage.setItem('droit', $rootScope.userID.entity.droitAdmin);
          //console.log('windows local storage http : '+ window.localStorage.getItem('right'))
          if(typeof $rootScope.userID.entity.droitAdmin == 'string' ){
           $location.path('/home/message')
           }
          /*else if(($rootScope.userID.entity.droitAdmin === "null" ) || ($rootScope.userID.entity.droitAdmin === null )
            || ($rootScope.userID.entity.droitAdmin = null ) || ($rootScope.userID.entity.droitAdmin == null ) ||
            ($rootScope.userID.entity.droitAdmin = "null" ) || ($rootScope.userID.entity.droitAdmin == "null" ) ||
            ($rootScope.userID.entity.droitAdmin = 'null' ) || ($rootScope.userID.entity.droitAdmin == 'null' )
            || ($rootScope.userID.entity.droitAdmin === 'null' )) {
          else{
            $location.path('/role');
          }

        }).error(function (donnee) {
          toastr.error('Erreur', {displayDuration: 1000});
          $location.path('/login')
        });*/

        //console.log("$scope.userID" + $scope.userID.entity.droit)
        //console.log("scope droit" + $scope.test.entity.droit)


        window.localStorage.setItem('id', $scope.test.entity.id);
        window.localStorage.setItem('login', $scope.test.entity.login);
        window.localStorage.setItem('password', $scope.test.entity.password);

        //console.log('rootscope id !!! ' + $rootScope.resp.entity.id)

        $location.path('/role');


        $ionicLoading.hide();

        /*if($rootScope.userID.entity.droitAdmin === 'true' ){
          $location.path('/home/message')
        }
        else
        { *///$location.path('/role');
      //}
        //console.log(JSON.stringify({data: data}))

      }).error(function (data, status) {
        if (status == 0) {
          toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
          navigator.app.exitApp();
        }
        else if (data.login != user.login || data.password != user.password) {
          $ionicLoading.hide()
          toastr.error('Identifiants incorrects ! ', {displayDuration: 1000});
          $location.path('/login')
          //$rootScope.errorMessage = 'Login/Mot de passe incorrect';
        }

      });
    }
    else {
      console.log('windows local storage else : '+ window.localStorage.getItem('right'))
      $ionicLoading.hide();
      //console.log("scope droit" + $rootScope.resp.entity.droit)
        //$ionicLoading.hide();
        $location.path('/role');
    }



  }

});


CapMission.controller("EmailController",function($scope,$ionicPopup,$rootScope,$ionicModal,$http,$ionicLoading,$ionicHistory,URL_API){
  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $rootScope.getEmailInfo = function(id,enfant,period,debut,end,prof){
    $rootScope.idF = id
    $rootScope.child = enfant
    $rootScope.period = period
    $rootScope.debut = debut
    $rootScope.fin = end
    $rootScope.prof = prof
    debutDate = new Date(debut).toLocaleDateString('fr-FR', {
      day : 'numeric',
      month : 'short',
      year : 'numeric',
      hour : 'numeric',
      minute : 'numeric'
    }).split(' ').join(' ');
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
    /*debut = $rootScope.debut*/
    debutDate = new Date(debut).toLocaleDateString('fr', {
      day: 'numeric',
      month : 'short',
      year : 'numeric',
      hour : 'numeric',
      minute : 'numeric'
    }).split(' ').join(' ');
    console.log('avant : ' + debutDate)
    mail.subject = 'MOB - ' + $rootScope.parent.entity.name + ' - Modification TimeTable'
    mail.body = 'Message :' + mail.body + '\n Détails \n Etudiant :' + enfant + '\n Séance : ' + period + '\n Date : ' + debutDate

    console.log('subject: '+mail.subject)
    //console.log('body: ' + body)
    console.log('mail: ' + mail.body)
    $ionicLoading.show({
      template: "En cours d'envoi !",
      duration: 1500
    });
    $http.post(URL_API+'/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
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

CapMission.constant('URL_API', 'http://51.255.195.19:8182/CapMissionApp');
CapMission.constant('DateNotif_Student', '');

/*CapMission.filter('offset', function() {
  return function(input, start) {
    if (!input || !input.length) { return; }
    start = +start; //parse to int
    return input.slice(start);
  }
});*/

//51.255.195.19

CapMission.run(['$ionicPlatform', '$ionicPopup','$rootScope','$state','$location', function ($ionicPlatform, $ionicPopup, $rootScope,$state,$location) {
  $ionicPlatform.ready(function () {
    // TODO switch to live api key before store release
    //batch.setConfig({"androidAPIKey":"DEV582AE36F59249F4C6CFAB6FC812"}); // dev
    batch.setConfig({"androidAPIKey":"582AE36F58FC6F8F82974A791E3E92"}); // live
    batch.push.setGCMSenderID("44134246491").setup();
    batch.start();
    batch.push.registerForRemoteNotifications();

    if(window.localStorage.getItem('login') != "undefined"){
      batch.user.getEditor()
        .setIdentifier(window.localStorage.getItem('login')) // Set to `null` if you want to remove the identifier.
        .save();
      alert("storage : "+ window.localStorage.getItem('login'))
    }
    else {
      batch.user.getEditor()
        .setIdentifier($rootScope.resp.entity.login) // Set to `null` if you want to remove the identifier.
        .save();
      alert("scope : "+ $rootScope.resp.entity.login)
    }


    $rootScope.$on('$stateChangeSuccess', function () {
      if(typeof analytics !== undefined) {
        analytics.startTrackerWithId("UA-84205623-1");
        analytics.trackView($state.current.name);
      } else {
        console.log("Google Analytics Unavailable");
      }
    });
    var notificationOpenedCallback = function(jsonData) {
     console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
     };

    window.plugins.OneSignal
     .startInit("a01a2291-c1f8-40e9-978b-b1dc66d04538", "44134246491")
     .handleNotificationOpened(notificationOpenedCallback)
     //.registerForPushNotifications()
     //.enableInAppAlertNotification(true)
     .endInit();

    window.plugins.OneSignal.getIds(function(ids) {
     did = ids.userId;
     window.localStorage.setItem("did",ids.userId);
     //alert(window.localStorage.getItem("did"))
     });
    //alert(window.localStorage.getItem('login'))


    /*$rootScope.$on('$stateChangeSuccess', function () {
      if(typeof analytics !== undefined) {
        analytics.startTrackerWithId("UA-84205623-1");
        analytics.trackView($state.current.name);
      } else {
        console.log("Google Analytics Unavailable");
      }
    });
    var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window.plugins.OneSignal
      .startInit("a01a2291-c1f8-40e9-978b-b1dc66d04538", "44134246491")
      .handleNotificationOpened(notificationOpenedCallback)
      //.registerForPushNotifications()
      //.enableInAppAlertNotification(true)
      .endInit();

    /*window.plugins.OneSignal.getIds(function(ids) {
      did = ids.userId;
      window.localStorage.setItem("did",ids.userId);
      alert(window.localStorage.getItem("did"))
    });*/

   /* window.plugins.OneSignal.getIds(function(ids) {
      $("#ids").val(ids.userId);
      alert(ids.userId);
    });*/
  });
}]);

CapMission.run(['$ionicPlatform', '$ionicPopup','$location', function ($ionicPlatform, $ionicPopup, $location) {
  $ionicPlatform.ready(function () {
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {

        var alertPopup = $ionicPopup.alert({
          title: 'Pas de connexion Internet',
          content: "Pour accéder à l'application, veuillez activer votre connexion Internet !",
          buttons: [{
            text: "J'ai compris !",
            type: 'button-clear button-assertive',

          }]

        });

        alertPopup.then(function (res) {
          $location.path("/login")
          //navigator.app.exitApp();
        });
      /*  $ionicPopup.confirm({
          title: 'Pas de connexion Internet',
          content: "Pour une meilleure navigation, veuillez activer votre connexion Internet !",
          buttons: [{
            text: 'Continuer quand même',
            type: 'button-clear button-assertive',
            onTap: function(e) {
              // e.preventDefault() will stop the popup from closing when tapped.
              e.preventDefault();
              $location.path('/login')
            }
          }, {
            text: 'Activer Internet',
            type: 'button-clear button-stable',
            onTap: function(e) {
              // Returning a value will cause the promise to resolve with the given value.
              alert('Activer')
            }
          }]
        })
          .then(function(result) {
            if(result) {
              $location.path('/login')
            } else {
              console.log('You are not sure');
            }
          });*/
      }
    }
    /*if(window.localStorage.getItem('login') != null) {
      document.addEventListener('deviceready', function () {
        // Schedule notification for tomorrow to remember about the meeting
        cordova.plugins.notification.local.schedule({
          id: 1,
          text: 'login : ' + window.localStorage.getItem('login'),
          title: 'Rappel Cap Mission',
          icon: 'parent/icon.png',
          firstAt: new Date(),
          every: "day" // "minute", "hour", "week", "month", "year"
        });

      }, false);
    }
    else {
      document.addEventListener('deviceready', function () {
        // Schedule notification for tomorrow to remember about the meeting
        cordova.plugins.notification.local.schedule({
          id: 1,
          text: 'Pensez à vous connecter !',
          title: 'Rappel Cap Mission',
          icon: 'parent/icon.png',
          firstAt: new Date(),
          every: "day" // "minute", "hour", "week", "month", "year"
        });

      }, false);
    }*/
    /*cordova.plugins.notification.local.schedule({
      id: 1,
      text: 'login : ' + window.localStorage.getItem('login') ,
      title: 'Rappel Cap Mission',
      icon : 'parent/icon.png',
      firstAt: new Date() ,
      every: "day" // "minute", "hour", "week", "month", "year"
    });*/
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

    /*cordova.getAppVersion(function(version) {
      $rootScope.appVersion = version;
    });*/


    /*if(typeof analytics !== "undefined") {
      analytics.startTrackerWithId("UA-84205623-1");
    } else {
      console.log("Google Analytics Unavailable");
    }*/
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
    /*batch.user.getEditor()
      .setIdentifier('null') // Set to `null` if you want to remove the identifier.
      .save();*/
    navigator.app.exitApp();
  };

});

CapMission.config(function($authProvider) {
  $authProvider.facebook({
    clientId: '561387454023937',
    //redirectUri : 'http://localhost:8100/'
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

   /* if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
   //$authProvider.Platform ='mobile';
   //commonConfig.redirectUri = 'http://localhost:8100/';
   $authProvider.cordova = true;
   commonConfig.redirectUri = 'http://localhost:8100/';
   }*/

  //$authProvider.redirectUri = 'http://localhost:8100/';

  /* $authProvider.facebook(angular.extend({}, commonConfig, {
   clientId: '561387454023937',
   responseType : 'token',
   //url: 'http://localhost:8182/auth/facebook'
   //redirectUri : 'http://localhost:8100/'
   }));*/


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


    /* Début Interface d'dministration */
    .state('wizard', {
      url: '/wizard',
      abstract: true,
      template: '<ion-nav-view></ion-nav-view>'
    })

    .state('home', {
      url: '/home',
      controller: 'adminCtrl',
      templateUrl: 'admin/home.html',

    })
    .state('history', {
      url: '/history',
      controller: 'historyCtrl',
      templateUrl: 'admin/history.html',

    })
    .state('home.segments', {
      url: '/segments',
      controller: 'segmentsCtrl',
      templateUrl: 'admin/segments.html',

    })
    .state('home.user', {
      url: '/user',
      controller: 'userCtrl',
      templateUrl: 'admin/user.html',

    })
    .state('home.message', {
      url: '/message',
      controller: 'messageCtrl',
      templateUrl: 'admin/message.html',

    })
    .state('home.date', {
      url: '/date',
      controller: 'dateCtrl',
      templateUrl: 'admin/date.html',

    })
    .state('home.recap', {
      url: '/recap',
      controller: 'recapCtrl',
      templateUrl: 'admin/recap.html',

    })


    /* Fin Interface d'dministration */

    .state('login', {
      url: '/login',
      controller: 'capController',
      templateUrl: 'authentication/login.html',

    })
    .state('profile', {
      url: '/profile',
      controller: 'ProfileController',
      templateUrl: 'authentication/profile.html',

    })
    .state('feed', {
      url: '/feed',
      controller: 'FeedController',
      templateUrl: 'authentication/feed.html',

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
    //state pour remarque
    .state('remarque', {
      url: '/parent/remarque',
      templateUrl: 'parent/remarque.html',
      controller: 'PRemarqueCtrl'
    })
    //state pour l'envoi d'Email - PArent
    .state('remarqueE', {
      url: '/parent/remarque',
      templateUrl: 'parent/remarque.html',
      controller: 'PEmailController'
    })

    //state pour l'envoi d'Email - Etudiant
    .state('remarqueES', {
      url: '/student/remarque',
      templateUrl: 'student/remarque.html',
      controller: 'SEmailController'
    })

    //state pour l'envoi d'Email - Teacher
    .state('remarqueET', {
      url: '/teacher/remarque',
      templateUrl: 'teacher/remarque.html',
      controller: 'TEmailController'
    })

    //state pour demande d'info
    .state('information', {
      url: '/parent/demandeInfo',
      templateUrl: 'parent/demandeInfo.html',
      controller: 'PDemandeInfoController'
    })
    //state pour demande d'info envoi Email - Parent
    .state('informationE', {
      url: '/parent/demandeInfoE',
      templateUrl: 'parent/demandeInfo.html',
      controller: 'PDemandeInfoEmailController'
    })

    //state pour demande d'info envoi Email - Etudiant
    .state('informationS', {
      url: '/student/demandeInfoE',
      templateUrl: 'student/demandeInfo.html',
      controller: 'SDemandeInfoEmailController'
    })

    //state pour demande d'info envoi Email - Teacher
    .state('informationT', {
      url: '/teacher/demandeInfoE',
      templateUrl: 'teacher/demandeInfo.html',
      controller: 'TDemandeInfoEmailController'
    })


    //state pour choix matière
    .state('choixMatiere', {
      url: '/parent/choixMatiere',
      controller: 'PAjoutCoursChoixCtrl',
      templateUrl: 'parent/choixMatiere.html'
    })
    //state pour choix enfant ajout cours
    .state('choixAjoutCours', {
      url: '/parent/choixAjoutCours',
      controller: 'ChoixAjoutCoursCtrl',
      templateUrl: 'parent/choixEnfantAjoutCours.html'
    })
    //state pour choix matiere
    .state('choixM', {
      url: '/parent/choixM',
      controller: 'PChoixMatiereCtrl',
      templateUrl: 'parent/choixMatiere.html'
    })
    //state pour choix type de cours
    .state('choixTypeCours', {
      url: '/parent/choixTypeCours',
      controller: 'PChoixTypeCours',
      templateUrl: 'parent/choixTypeCours.html'
    })
    //state pour email cours particulier
    .state('coursParticulier', {
      url: '/parent/coursParticulier',
      controller: 'PCoursParticulierCtrl',
      templateUrl: 'parent/coursParticulier.html'
    })
    //state pour choix cours de groupe
    .state('coursGroup', {
      url: '/parent/coursGroup',
      controller: 'PCoursGroupCtrl',
      templateUrl: 'parent/coursGroup.html'
    })
    //state pour envoie mail groupe Autre
    .state('coursGroupAutre', {
      url: '/parent/coursGroupAutre',
      controller: 'PCoursGroupAutreCtrl',
      templateUrl: 'parent/groupeAutre.html'
    })
    //state pour la créer ton groupe nb étudiants
    .state('nbEtudiantsGroupe', {
      url: '/parent/nbEtudiantsGroupe',
      controller: 'PNbEtudiantsGroupeCtrl',
      templateUrl: 'parent/nbEtudiantsGroupe.html'
    })
    //state pour les cours en groupe horaire et date
    .state('dateHoraireGroupe', {
      url: '/parent/dateHoraireGroupe',
      controller: 'PDateHoraireGroupeCtrl',
      templateUrl: 'parent/dateHoraireGroupe.html'
    })
    //state pour le recap de cours groupe
    .state('recapCoursGroupe', {
      url: '/parent/recapCoursGroupe',
      controller: 'PRecapCoursGroupeCtrl',
      templateUrl: 'parent/recapCoursGroupe.html'
    })
    //state pour choix cours occ ou multiple
    .state('coursChoix', {
      url: '/parent/coursChoix',
      controller: 'PCoursChoixCtrl',
      templateUrl: 'parent/coursChoix.html'
    })
    //state pour date/h occasionnel
    .state('dateHoraireOcc', {
      url: '/parent/dateHoraireOcc',
      controller: 'PDateHoraireOccCtrl',
      templateUrl: 'parent/dateHoraireOcc.html'
    })
    //state pour test
    .state('test', {
      url: '/parent/test',
      controller: 'PTestCtrl',
      templateUrl: 'parent/test.html'
    })
    //state pour identifiant oublié
    .state('identifiantOublie', {
      url: '/identifiantOublie',
      controller: 'IdentifiantOublieCtrl',
      templateUrl: 'authentication/identifiantOublie.html'
    })
    //state pour inscription
    .state('inscription', {
      url: '/inscription',
      controller: 'InscriptionCtrl',
      templateUrl: 'authentication/inscriptionCapMission.html'
    })
    //state pour infos élève (inscription)
    .state('infoEleve', {
      url: '/infoEleve',
      controller: 'InfoEleveCtrl',
      templateUrl: 'authentication/infoEleve.html'
    })
    // state pour le catalogue
    .state('catalogue', {
      url: '/catalogue',
      controller: 'CatalogueCtrl',
      templateUrl: 'authentication/catalogue.html'
    })
    //state pour choix matiere non inscrit
    .state('choixMatiereNonInscrit', {
      url: '/choixMatiereNonInscrit',
      controller: 'ChoixMatiereNonInscritCtrl',
      templateUrl: 'authentication/choixMatiereNonInscrit.html'
    })

    //state pour nombre de jours pour non inscrit
    .state('nbJoursNnInscrit', {
      url: '/nbJoursNnInscrit',
      controller: 'NbJoursNnInscritCtrl',
      templateUrl: 'authentication/nbJoursNnInscrit.html'
    })
    //state pour récapitulatif de la commande de cours pour non inscrit
    .state('recapitulatifNonInscrit', {
      url: '/recapitulatifNonInscrit',
      controller: 'RecapitulatifNonInscritCtrl',
      templateUrl: 'authentication/recapitulatifNonInscrit.html'
    })
    //state pour disponibilite pour les non inscrits
    .state('disponibilite', {
      url: '/disponibilite',
      controller: 'DisponibiliteCtrl',
      templateUrl: 'authentication/disponibilite.html'
    })
                                                                //state pour les parametres
    .state('parametres', {
      url: '/parent/parametres',
      controller: 'ParametresCtrl',
      templateUrl: 'parent/parametres.html'
    })
    .state('Sparametres', {
      url: '/student/parametres',
      controller: 'SParametresCtrl',
      templateUrl: 'student/parametres.html'
    })
    .state('Tparametres', {
      url: '/teacher/parametres',
      controller: 'TParametresCtrl',
      templateUrl: 'teacher/parametres.html'
    })
    .state('ajoutCours', {
      url: '/student/ajoutCours',
      templateUrl: 'student/choixMatiere.html',
      controller: 'SAjoutCoursCtrl'
    })
    //state pour choix matiere ajout cours student
    .state('choixMatiereS', {
      url: '/student/choixMatiereS',
      templateUrl: 'student/choixMatiere.html',
      controller: 'SChoixMatiereCtrl'
    })
    .state('recapAidesDevoirs', {
      url: '/student/recapAidesDevoirs',
      templateUrl: 'student/recapAidesDevoirs.html',
      controller: 'SRecapAidesDevoirsCtrl'
    })
    //state pour récapitulatif cours réguliers student
    .state('recapCoursReguliers', {
      url: '/student/recapCoursReguliers',
      templateUrl: 'student/recapCoursReguliers.html',
      controller: 'SRecapCoursReguliersCtrl'
    })
    //state stage intensif student
    .state('recapStageIntensif1', {
      url: '/student/recapStageIntensif1',
      templateUrl: 'student/recapStageIntensif.html',
      controller: 'SRecapStageIntensifCtrl'
    })
    //state pour choix type cours student
    .state('choixTypeCoursS', {
      url: '/student/choixTypeCoursS',
      templateUrl: 'student/choixTypeCoursS.html',
      controller: 'SChoixTypeCoursCtrl'
    })
    //state pour cours particulier student
    .state('coursParticulierS', {
      url: '/student/coursParticulierS',
      templateUrl: 'student/coursParticulierS.html',
      controller: 'SCoursParticulierCtrl'
    })
    //state pour nb de personne student
    .state('nbPersonneS', {
      url: '/student/nbPersonneS',
      templateUrl: 'student/nbPersonneS.html',
      controller: 'SNbPersonneCtrl'
    })
    //state choix d'un cours multiple ou occasionnel student
    .state('choixFrequenceCours', {
      url: '/student/choixFrequenceCours',
      templateUrl: 'student/choixFrequenceCours.html',
      controller: 'SFrequenceCoursCtrl'
    })
    //state pour cours occasionnel student
    .state('coursOccasionnelS', {
      url: '/student/coursOccasionnelS',
      templateUrl: 'student/coursOccasionnelS.html',
      controller: 'SCoursOccasionnelCtrl'
    })
    //state pour recap cours occasionnel student
    .state('recapOcc', {
      url: '/student/recapOcc',
      templateUrl: 'student/recapOcc.html',
      controller: 'SRecapOccCtrl'
    })
    //state cours Multiple student
    .state('coursMultiple', {
      url: '/student/coursMultiple',
      templateUrl: 'student/coursMultiple.html',
      controller: 'SCoursMultipleCtrl'
    })
    //state cours particulier
    .state('dispoCoursPart', {
      url: '/dispoCoursPart',
      templateUrl: 'authentication/dispoCoursPart.html',
      controller: 'SDispoCoursPartCtrl'
    })
    //state choix matiere cours groupe
    .state('choixMatiereCoursGroupe', {
      url: '/choixMatiereCoursGroupe',
      templateUrl: 'authentication/choixMatiereCoursGroupe.html',
      controller: 'SChoixMatiereCoursGroupeCtrl'
    })
    //state home
    .state('homePage', {
      url: '/homePage',
      templateUrl: 'authentication/home.html',
      controller: 'HomePageCtrl'
    })
    //state pour tarication authentification
    .state('tarifCours', {
      url: '/tarifCours',
      templateUrl: 'authentication/tarifCours.html',
      controller: 'TarifCoursCtrl'
    })
    //state pour frequence cours authentification
    .state('frequenceCours', {
      url: '/frequenceCours',
      templateUrl: 'authentication/frequenceCours.html',
      controller: 'FrequenceCoursCtrl'
    })
    //state pour stage intensif
    .state('stageIntensif', {
      url: '/parent/stageIntensif',
      templateUrl: 'parent/stageIntensif.html',
      controller: 'StageIntensifCtrl'
    })
    //state recapitulatif de stage intensif
    .state('recapStageIntensif', {
      url: '/parent/recapStageIntensif',
      templateUrl: 'parent/recapStageIntensif.html',
      controller: 'RecapStageIntensifCtrl'
    })
    //state racapitulatif cours occasionnels
    .state('recapCoursOcc', {
      url: '/parent/recapCoursOcc',
      templateUrl: 'parent/recapCoursOcc.html',
      controller: 'RecapCoursOccCtrl'
    })
    .state('emploiEnfant2', {
      url: '/parent/emploiEnfant2',
      controller: 'ChoixCtrl',
      templateUrl: 'parent/emploiEnfant.html'
    })
    .state('emploiEnfant', {
      url: '/parent/emploiEnfant',
      controller: 'EnfantCtrl',
      templateUrl: 'parent/emploiEnfant.html'
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
    .state('choixEtudiant', {                             //state pour le choix des étudiants pour un prof
      url: '/teacher/choixEtudiant',
      templateUrl: 'teacher/choixEtudiant.html',
      controller: 'ChoixEtudiantCtrl'

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

          String.prototype.replaceAll = function(tet, replacement) {
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
