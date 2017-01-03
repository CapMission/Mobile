var administ = angular.module('capMission.administ', ['ngResource', 'ui.router', 'ui.bootstrap', 'ionicProcessSpinner', 'ngCordova', 'ngStorage','checklist-model']);

administ.controller('adminCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory) {



  // we will store all of our form data in this object


  // function to process the form
  $scope.processForm = function() {
    alert('awesome!');
  };
  $scope.GoNotif = function(){
    $location.path('/home/message')
  }

  $ionicPopover.fromTemplateUrl('admin/admin-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });

}]);

administ.controller('historyCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory) {

  $ionicPopover.fromTemplateUrl('admin/admin-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });

}]);

administ.controller('segmentsCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory) {
  $ionicPopover.fromTemplateUrl('admin/admin-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });

}]);

administ.controller('userCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory','$ionicLoading', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory, $ionicLoading) {

  $scope.goRecapNotf = function(){
    $location.path('/home/recap')
  }

  $scope.msgError = function(){
    toastr.info('Fonctionnalité en cours de développement ! ', {displayDuration: 1000});
  }

  $scope.goMessage = function(objet,message){
    console.log('msg objet' + objet)
    console.log('msg msg' + message)
    $location.path('/home/message')
  }
  $http.get('http://test-mission.com/users.json').success(function (data) {
    $scope.users = data.users
  }).error(function (data) {
    $ionicLoading.hide()
    toastr.error('ECHEC', {displayDuration: 1000});
  });

  $http.get('http://test-mission.com/segments.json').success(function (data) {
    $scope.segments = data.segments
  }).error(function (data) {
    $ionicLoading.hide()
    toastr.error('ECHEC', {displayDuration: 1000});
  });

  $rootScope.formData = {};

  $rootScope.formData.selectedUsers = {};

  $rootScope.formDataS = {};

  $rootScope.formDataS.selectedSegments = {}

  $scope.someSelected = function (object) {
    return Object.keys(object).some(function (key) {
      return object[key];
    });
  }

  $rootScope.value = [];
  $rootScope.valseg = [];

  $scope.updateUserValue = function(user){
    $rootScope.value = $rootScope.value || [];
    if(user.selected){
      $rootScope.value.push(user.nom);
      $rootScope.value = _.uniq($rootScope.value);
      //alert($scope.value)
    }else{
      $rootScope.value = _.without($rootScope.value, user.nom);
    }
  };
  $scope.updateSegmentValue = function(segment){
    $rootScope.valseg = $rootScope.valseg || [];
    if(segment.selected){
      $rootScope.valseg.push(segment.description);
      $rootScope.valseg = _.uniq($rootScope.valseg);
      //alert($rootScope.valseg)
    }else{
      $rootScope.valseg = _.without($rootScope.valseg, segment.description);
    }
  };
  $scope.goDate = function(){

    //console.log('Selected :  ' + $scope.parsedUsers);
   //console.log('selected ' + $scope.usersSelected)
    //alert($rootScope.value)
    //console.log('Segments selected : ' + JSON.stringify($scope.segmentsSelected));
    $location.path('/home/date')
  }
  $scope.user = {
    users: []
  };
  $scope.segment = {
    segments: []
  };

  $scope.options = [{
    name: 'Parent',
    selected: false
  }, {
    name: 'Enseignant',
    selected: false
  }, {
    name: 'Etudiant',
    selected: false
  }];

  $scope.num = function (arr) {
    return arr.length > 2 ? 2 : 3;
  }

  $scope.count = true;

  $scope.itemFilter = function (item) {
    var filters = $scope.options.filter(function (element, idx, array) {
        return element.selected;
      }) || [];

    var matched = true;
    filters.forEach(function (option) {
      matched = matched && item.role.indexOf(option.name) >= 0;

    })
    return matched;
  };

    $scope.saveU = function(){
      $rootScope.selectUs = [];
      angular.forEach($scope.users, function(user){
        if (user.selected) $rootScope.selectUs.push(user.login);
        //console.log($rootScope.selectUs)
      });
    }

  var result = []


  $scope.saveS = function(){
    $rootScope.selectS = [];
    angular.forEach($scope.segments, function(segment){
      if (segment.selected) $rootScope.selectS.push(segment.id);
      //console.log("seg logins : "+ $rootScope.loginSeg)
      //console.log($rootScope.selectUs)
       return $rootScope.selectS
    });
  }

  $scope.saveLogin = function(){
    getNames($rootScope.selectS, "login")
    $rootScope.loginSeg = result
    console.log("result: " + result );
  }

  function getNames(obj, login) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if ("object" == typeof(obj[key])) {
          getNames(obj[key], login);
        } else if (key == login) {
          result.push(obj[key]);
        }
      }
    }
      }


 // $rootScope.loginSeg = result




  $ionicPopover.fromTemplateUrl('admin/admin-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });

}]);

administ.controller('messageCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', '$ionicPopup', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory, $ionicPopup) {

  $scope.goUser = function(nobjet,nmessage){
    $rootScope.objet = nobjet
    $rootScope.message = nmessage
    console.log(nobjet)
    console.log(nmessage)
    $location.path('/home/user')
  }

  /*$scope.startCondition = function() {
    return angular.isDefined($scope.step3.something);
  };*/

  $ionicPopover.fromTemplateUrl('admin/admin-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });

}]);

administ.controller('dateCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory) {

  $rootScope.goUserBack =function (value, valseg){
    console.log('value ' + value)
    console.log(' segment' + valseg)

  }



  $scope.goRecapNotf = function(ndate){
    $rootScope.ndate = ndate
    console.log('ndate :'+ $rootScope.ndate)
    //$rootScope.date = moment(ndate + ' ' + ntime, "MM-DD-YYYY HH:mm");
    $location.path('/home/recap')
  }
  $scope.goRecapNotfNow = function(conten, dateEnvoi){
    $rootScope.conten = conten
    dateEnvoi = new Date()
    $rootScope.dateEnvoi = dateEnvoi
    console.log("date envoi : " + $rootScope.dateEnvoi)

    $location.path('/home/recap')
  }

  $ionicPopover.fromTemplateUrl('admin/admin-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });

}]);

administ.controller('recapCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory','$ionicPopup','$ionicLoading','URL_API', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory, $ionicPopup, $ionicLoading, URL_API) {

  $scope.yourName = function(){

    var myPopup = $ionicPopup.show({
      template: '<form name="MyForm" >' +
      '<input type="text" name = "name" ng-model="name" required>',
      title: 'Vérification',
      subTitle: 'Veuillez saisir votre nom complet afin de continuer',
      scope: $scope,
      buttons: [
        {
          text: '<b>Confirmer</b>',
          type: 'buttonEmp2',
          onTap: function(e) {
          }
        }
      ]
    });

    myPopup.then(function(res) {

    });

  }

  $scope.goHome = function(){
    $rootScope.conten = undefined
    $rootScope.ndate = undefined
    $rootScope.ntime = undefined
    $rootScope.dateEnvoi = undefined
    $rootScope.objet = undefined
    $rootScope.message = undefined
    $rootScope.value = undefined
    $rootScope.valseg = undefined

    $location.path('/home/message')
  }

  $scope.Send = function(objet, message, value, valseg, ndate){
    //value = $rootScope.selectUs
    //var fiveMinutesLater = new Date()
    console.log("objet send : "+ objet)
    console.log("message send : "+ message)
    console.log("value send : "+ value)
    console.log("valseg send : "+ valseg)
    //console.log("date send : "+ $rootScope.ndate)
    /*if((ndate != $rootScope.ndate) || (ndate === undefined) || (ndate == " ") ){
       ndate = $rootScope.dateEnvoi
      $rootScope.dateEnvoi.setMinutes($rootScope.dateEnvoi.getMinutes() + 5);
      console.log("date send now : "+ ndate)

    }
    else {
      console.log("date send prog : "+ ndate)
    }*/

    $scope.notification = {
    "group_id": "CapMission",
      "recipients": {
        "custom_ids": $rootScope.selectUs
    },
    "message": {
      "title": "Cap Mission - " + objet,
        "body": message
    }
  }

    console.log('corps de notification : ' + JSON.stringify($scope.notification))

    $ionicLoading.show({
      template: "En cours d'envoi !",
      duration: 1500
    });

    $http.post(URL_API+'/notifs/send', $scope.notification, {timeout: 120000}).success(function (data, status, headers, config) {

      $ionicLoading.hide();
      toastr.success('Votre demande a été envoyée avec succès')

      $rootScope.conten = undefined
      $rootScope.ndate = undefined
      $rootScope.ntime = undefined
      $rootScope.dateEnvoi = undefined
      $rootScope.objet = undefined
      $rootScope.message = undefined
      $rootScope.value = undefined
      $rootScope.valseg = undefined
      $rootScope.selectUs = undefined
      $scope.notification = undefined
      $location.path('/home/message')
      //$ionicHistory.goBack();
    }).error(function (data, status) {
      if (status == 0) {
        toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});

        $rootScope.conten = undefined
        $rootScope.ndate = undefined
        $rootScope.ntime = undefined
        $rootScope.dateEnvoi = undefined
        $rootScope.objet = undefined
        $rootScope.message = undefined
        $rootScope.value = undefined
        $rootScope.valseg = undefined
        $rootScope.selectUs = undefined
        $scope.notification = undefined
        $location.path('/home/message')
        //navigator.app.exitApp();
      }
      else {
        $ionicLoading.hide();
        toastr.error("Echec envoi de notifications ! Réessayez plus tart !")

        $rootScope.conten = undefined
        $rootScope.ndate = undefined
        $rootScope.ntime = undefined
        $rootScope.dateEnvoi = undefined
        $rootScope.objet = undefined
        $rootScope.message = undefined
        $rootScope.value = undefined
        $rootScope.valseg = undefined
        $rootScope.selectUs = undefined
        $scope.notification = undefined
        $location.path('/home/message')
      }
    });

  }

  $ionicPopover.fromTemplateUrl('admin/admin-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });

}]);
