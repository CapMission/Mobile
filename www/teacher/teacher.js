/**
 * Created by MSIKA.SAFAA on 25/04/2016.
 */
var teacher = angular.module('capMission.teacher', ['ngResource', 'ui.router', 'ui.bootstrap', 'simplePagination']);


teacher.controller("TEmailController",function($scope,$ionicPopup,$rootScope,$ionicModal,$http,$ionicLoading,$ionicHistory){
  $ionicModal.fromTemplateUrl('templates/modalT.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $rootScope.getT = function(id,period,debut){
    $rootScope.idF = id
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
    console.log('period: '+period)
    console.log('debut: '+debutDate)
  }
  $rootScope.sendT = function(mail,id,period,debut) {

    //$test = $rootScope.parent.entity.mail

    mail.to='info@capmission.com'
    mail.from='capmission.com@gmail.com'
    //mail.subject='Modification séance de : '+ enfant + 'le : ' + debutDate
    id = $rootScope.idF
    period = $rootScope.period
    debut = $rootScope.debut
    debutDate = new Date(debut).toLocaleDateString('fr-FR', {
      day : 'numeric',
      month : 'short',
      year : 'numeric',
      hour : 'numeric',
      minute : 'numeric'
    }).split(' ').join('-');
    mail.subject='Modification de la séance ' + period  + ' de : '+ $rootScope.teacher.entity.name + ' le : ' + debutDate

    console.log('idHF: '+id)
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


});
teacher.controller('TeacherCtrl', ['$scope','$location','$rootScope','$http','$ionicPopover','$ionicLoading', function ($scope,$location,$rootScope,$http,$ionicPopover,$ionicLoading) {

  $scope.idTeacher = window.localStorage.getItem('id')
  $scope.now = new Date()
  $scope.get = function (id) {
    $ionicLoading.show({
      template: 'Chargement'
    });
    $http.get('http://81.192.194.109:8182/CapMissionApp/teachers/' + id, {timeout: 35000}).success(function (data, status, headers, config) {

      $rootScope.teacher = data
      $scope.limit = 10;

      $scope.showMore = function () {
        $scope.limit += 3;
      }
      $scope.showLess = function () {
        $scope.limit -= 3;
      }
      $ionicLoading.hide();
      //console.log('Data teacher'+JSON.stringify({data: data}))
      if(data.entity == null){
        toastr.warning("Désolés, vous n'êtes pas autorisés à accéder en tant qu'enseignant");
        $location.path('/role');
      }
      else{
        $location.path('/teacher');

      }
    }).error(function (data) {
      toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
      navigator.app.exitApp();
    });

  }
  $ionicPopover.fromTemplateUrl('teacher/teacher-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
teacher.controller('TProposCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory) {

  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('teacher/teacher-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
teacher.controller('TprofileCtrl', ['$scope','$rootScope','$ionicPopover','$ionicHistory','$ionicModal','$http','$ionicLoading', function ($scope,$rootScope, $ionicPopover,$ionicHistory,$ionicModal,$http,$ionicLoading) {

  $ionicModal.fromTemplateUrl('templates/modal-1.html', {
    id: '1', // We need to use and ID to identify the modal that is firing the event!
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModal1 = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modal-2.html', {
    id: '2', // We need to use and ID to identify the modal that is firing the event!
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModal2 = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modal-3.html', {
    id: '3', // We need to use and ID to identify the modal that is firing the event!
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModal3 = modal;
  });
  $scope.openModal = function(index) {
    if (index == 1) $scope.oModal1.show();
    else if (index == 2) $scope.oModal2.show();
    else $scope.oModal3.show();
  };

  $scope.closeModal = function(index) {
    if (index == 1) $scope.oModal1.hide();
    else if(index == 2 ) $scope.oModal2.hide();
    else $scope.oModal3.hide();
  };
  $ionicPopover.fromTemplateUrl('teacher/teacher-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });

   // Fonctions envoi demandes modification
  // 1- Modifier name
  $scope.sendTN = function(mail){
    mail.to='info@capmission.com'
    mail.from= 'capmission.com@gmail.com'
    console.log('body: '+mail.body)
    $scope.body = "Prière de modifier le nom dans le système.\nAncienne valeur " +
      ": " + $rootScope.teacher.entity.name + "\nNouvelle valeur : " + mail.body
    //mail.subject='Modification séance de : '+ enfant + 'le : ' + debutDate

    mail.subject='Modification nom de ' + $rootScope.teacher.entity.name
    mail.body = $scope.body

    console.log('to: '+mail.to)
    console.log('from: '+mail.from)
    console.log('subject: '+mail.subject)
    console.log('body: '+mail.body)
    console.log('body to send: '+ $scope.body)

    $ionicLoading.show({
      template: "En cours d'envoi !"
    });
    $http.post('http://81.192.194.109:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
      $ionicLoading.hide();
      toastr.success('Votre demande a été envoyée avec succès')
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
  $scope.sendTT = function(mail){
    mail.to='info@capmission.com'
    mail.from= 'capmission.com@gmail.com'
    console.log('body: '+mail.body)
    $scope.body = "Prière de modifier le téléphone de "+ $rootScope.teacher.entity.name +" dans le système.\nAncienne valeur " +
      ": " + $rootScope.teacher.entity.phone + "\nNouvelle valeur : " + mail.body
    //mail.subject='Modification séance de : '+ enfant + 'le : ' + debutDate

    mail.subject='Modification téléphone de ' + $rootScope.teacher.entity.name
    mail.body = $scope.body

    console.log('to: '+mail.to)
    console.log('from: '+mail.from)
    console.log('subject: '+mail.subject)
    console.log('body: '+mail.body)
    console.log('body to send: '+ $scope.body)

    $ionicLoading.show({
      template: "En cours d'envoi !"
    });
    $http.post('http://81.192.194.109:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
      $ionicLoading.hide();
      toastr.success('Votre demande a été envoyée avec succès')
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
  $scope.sendTE = function(mail){
    mail.to='info@capmission.com'
    mail.from= 'capmission.com@gmail.com'
    console.log('body: '+mail.body)
    $scope.body = "Prière de modifier l'email de "+ $rootScope.teacher.entity.name +" dans le système.\nAncienne valeur " +
      ": " + $rootScope.teacher.entity.mail + "\nNouvelle valeur : " + mail.body
    //mail.subject='Modification séance de : '+ enfant + 'le : ' + debutDate

    mail.subject='Modification email de ' + $rootScope.teacher.entity.name
    mail.body = $scope.body

    console.log('to: '+mail.to)
    console.log('from: '+mail.from)
    console.log('subject: '+mail.subject)
    console.log('body: '+mail.body)
    console.log('body to send: '+ $scope.body)

    $ionicLoading.show({
      template: "En cours d'envoi !"
    });
    $http.post('http://81.192.194.109:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
      $ionicLoading.hide();
      toastr.success('Votre demande a été envoyée avec succès')
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
}]);
teacher.controller('TsoldeCtrl', ['$scope', '$rootScope', '$http', '$ionicPopup', '$ionicLoading', '$ionicPopover', '$ionicHistory', function ($scope, $rootScope, $http, $ionicPopup, $ionicLoading, $ionicPopover, $ionicHistory) {
  /*$scope.lastKey;
   for($scope.key in $rootScope.teacher.entity.payments){
   if($rootScope.teacher.entity.payments.hasOwnProperty($scope.key)){
   $scope.lastKey = $scope.key;
   }
   }
   alert($scope.lastKey + ': ' + $rootScope.teacher.entity.payments[$scope.lastKey]);*/
  $scope.limit = 10;

  $scope.showMore = function () {
    $scope.limit += 3;
  }
  $scope.showLess = function () {
    $scope.limit -= 3;
  }
  $scope.showAlert = function (id, solde, nbreHeures, nbreStudents, coutHoraire, date) {
    console.log("id recap : " + id)
    date = new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric'
    }).split(' ').join(' ');
    var alertPopup = $ionicPopup.alert({
      title: 'Détails récapitulatif solde',
      template: '<ul>Solde : ' + solde + ' MAD</ul><br> <ul>Nombre heures : ' + nbreHeures + '</ul><br> <ul>Nombre étudiants : ' + nbreStudents + '</ul><br> <ul>Coût horaire : ' + coutHoraire + ' MAD</ul>'
    });

    alertPopup.then(function (res) {
      console.log('OK');
    });

  };
  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('teacher/teacher-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
teacher.controller('TtimeCtrl', ['$scope','$ionicPopover','$rootScope','$http','$location', function ($scope, $ionicPopover,$rootScope,$http,$location) {
  $id = resp.entity.id
  $http.get('http://81.192.194.109:8182/CapMissionApp/teachers/' + $id, {timeout: 35000}).success(function (data, status, headers, config) {
    //$scope.test="safaa"

    $rootScope.teach = data
    console.log('Data emploi'+JSON.stringify({data: data}))
    $location.path('teacher/indexT.html');
  }).error(function (data) {
    toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
    navigator.app.exitApp();

  });
  $ionicPopover.fromTemplateUrl('teacher/teacher-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
teacher.filter('startFrom', function () {
  return function (input, start) {
    start = +start; //parse to int
    return input.slice(start);
  }
});
