/**
 * Created by MSIKA.SAFAA on 25/04/2016.
 */
var student = angular.module('capMission.student', ['ngResource','ui.router','ui.bootstrap']);

student.controller('StudentCtrl', ['$scope','$http','$rootScope','$location','$ionicPopover','$ionicLoading', function ($scope, $http, $rootScope,$location,$ionicPopover,$ionicLoading) {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  $scope.now = new Date()
  $scope.get = function (id) {
    $ionicLoading.show({
      template: 'Chargement'
    });
    $http.get('http://81.192.194.109:8182/CapMissionApp/students/auth/' + id).success(function (data, status, headers, config) {
      //$scope.test="safaa"

      $rootScope.student = data
      //console.log('Data choix'+JSON.stringify({data: data}))
      $ionicLoading.hide();
      if(data.entity == null){
        toastr.warning("Désolés, vous n'êtes pas autorisés à accéder en tant qu'étudiant");
        $location.path('/role');
      }
      else{
        $location.path('/student');
        //console.log('Data choix'+JSON.stringify({data: data}))

      }
    }).error(function (data) {
      toastr.error('Echec de connexion');

    });
  }
  $ionicPopover.fromTemplateUrl('student/student-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

student.controller('SprofileCtrl', ['$scope','$rootScope','$ionicPopover','$http','$ionicHistory','$ionicModal','$ionicLoading', function ($scope,$rootScope,$ionicPopover, $http,$ionicHistory,$ionicModal,$ionicLoading) {

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
  $ionicModal.fromTemplateUrl('templates/modal-4.html', {
    id: '4', // We need to use and ID to identify the modal that is firing the event!
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModal4 = modal;
  });
  $scope.openModal = function(index) {
    if (index == 1) $scope.oModal1.show();
    else if (index == 2) $scope.oModal2.show();
    else if (index == 3) $scope.oModal3.show();
    else $scope.oModal4.show();
  };

  $scope.closeModal = function(index) {
    if (index == 1) $scope.oModal1.hide();
    else if(index == 2 ) $scope.oModal2.hide();
    else if (index == 3 ) $scope.oModal3.hide();
    else $scope.oModal4.hide();
  };

  // Fonctions envoi demandes modification
  // 1- Modifier name
  $scope.sendSN = function(mail){
    mail.to='info@capmission.com'
    mail.from= 'capmission.com@gmail.com'
    console.log('body: '+mail.body)
    $scope.body = "Prière de modifier le nom dans le système.\nAncienne valeur " +
      ": " + $rootScope.student.entity.name + "\nNouvelle valeur : " + mail.body
    //mail.subject='Modification séance de : '+ enfant + 'le : ' + debutDate

    mail.subject='Modification nom de ' + $rootScope.student.entity.name
    mail.body = $scope.body

    console.log('to: '+mail.to)
    console.log('from: '+mail.from)
    console.log('subject: '+mail.subject)
    console.log('body: '+mail.body)
    console.log('body to send: '+ $scope.body)

    $ionicLoading.show({
      template: "En cours d'envoi !"
    });
    $http.post('http://81.192.194.109:8182/CapMissionApp/send-mail', mail).success(function(data, status, headers, config){
      $ionicLoading.hide();
      toastr.success('Votre demande a été envoyée avec succès')
      $ionicLoading.hide();
    }).error(function(data){
      $ionicLoading.hide();
      toastr.error("Echec envoi de message ! Réessayez plus tart !")
    });

  }
  $scope.sendST = function(mail){
    mail.to='info@capmission.com'
    mail.from= 'capmission.com@gmail.com'
    console.log('body: '+mail.body)
    $scope.body = "Prière de modifier le téléphone de "+ $rootScope.student.entity.name +" dans le système.\nAncienne valeur " +
      ": " + $rootScope.student.entity.phone + "\nNouvelle valeur : " + mail.body
    //mail.subject='Modification séance de : '+ enfant + 'le : ' + debutDate

    mail.subject='Modification téléphone de ' + $rootScope.student.entity.name
    mail.body = $scope.body

    console.log('to: '+mail.to)
    console.log('from: '+mail.from)
    console.log('subject: '+mail.subject)
    console.log('body: '+mail.body)
    console.log('body to send: '+ $scope.body)

    $ionicLoading.show({
      template: "En cours d'envoi !"
    });
    $http.post('http://81.192.194.109:8182/CapMissionApp/send-mail', mail).success(function(data, status, headers, config){
      $ionicLoading.hide();
      toastr.success('Votre demande a été envoyée avec succès')
      $ionicLoading.hide();
    }).error(function(data){
      $ionicLoading.hide();
      toastr.error("Echec envoi de message ! Réessayez plus tart !")
    });

  }
  $scope.sendSE = function(mail){

    mail.to='info@capmission.com'
    mail.from= 'capmission.com@gmail.com'
    console.log('body: '+mail.body)
    $scope.body = "Prière de modifier l'email de "+ $rootScope.student.entity.name +" dans le système.\nAncienne valeur " +
      ": " + $rootScope.student.entity.mail + "\nNouvelle valeur : " + mail.body
    //mail.subject='Modification séance de : '+ enfant + 'le : ' + debutDate

    mail.subject='Modification email de ' + $rootScope.student.entity.name
    mail.body = $scope.body

    console.log('to: '+mail.to)
    console.log('from: '+mail.from)
    console.log('subject: '+mail.subject)
    console.log('body: '+mail.body)
    console.log('body to send: '+ $scope.body)

    $ionicLoading.show({
      template: "En cours d'envoi !"
    });
    $http.post('http://81.192.194.109:8182/CapMissionApp/send-mail', mail).success(function(data, status, headers, config){
      $ionicLoading.hide();
      toastr.success('Votre demande a été envoyée avec succès')
      $ionicLoading.hide();
    }).error(function(data){
      $ionicLoading.hide();
      toastr.error("Echec envoi de message ! Réessayez plus tart !")
    });

  }
  $scope.sendSB = function(mail){
    $date =  new Date(mail.body).toLocaleDateString('fr-FR', {
      month : 'numeric',
      day : 'numeric',
      year : 'numeric',

    }).split(' ').join('-');
    mail.to='info@capmission.com'
    mail.from= 'capmission.com@gmail.com'
    console.log('body: '+$date)
    $scope.body = "Prière de modifier la date de naissance de "+ $rootScope.student.entity.name +" dans le système.\nAncienne valeur " +
      ": " + $rootScope.student.entity.birthDateString + "\nNouvelle valeur : " + $date
    //mail.subject='Modification séance de : '+ enfant + 'le : ' + debutDate

    mail.subject='Modification date de naissance de ' + $rootScope.student.entity.name
    mail.body = $scope.body

    console.log('to: '+mail.to)
    console.log('from: '+mail.from)
    console.log('subject: '+mail.subject)
    console.log('body: '+mail.body)
    console.log('body to send: '+ $scope.body)

    $ionicLoading.show({
      template: "En cours d'envoi !"
    });
    $http.post('http://81.192.194.109:8182/CapMissionApp/send-mail', mail).success(function(data, status, headers, config){
      $ionicLoading.hide();
      toastr.success('Votre demande a été envoyée avec succès')
      $ionicLoading.hide();
    }).error(function(data){
      $ionicLoading.hide();
      toastr.error("Echec envoi de message ! Réessayez plus tart !")
    });

  }
  $ionicPopover.fromTemplateUrl('student/student-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
student.controller('SsoldeCtrl', ['$scope','$ionicPopover','$http','$ionicHistory', function ($scope,$ionicPopover, $http,$ionicHistory) {

  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('student/student-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
student.controller('StimeCtrl', ['$scope','$ionicPopover','$http','$ionicHistory', function ($scope,$ionicPopover, $http,$ionicHistory) {

  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('student/student-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
student.controller("SEmailController",function($scope,$ionicPopup,$rootScope,$ionicModal,$http,$ionicLoading,$ionicHistory){
  $ionicModal.fromTemplateUrl('templates/modalS.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $rootScope.getS = function(id,period,debut){
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
  $rootScope.sendS = function(mail,id,period,debut) {

    //$test = $rootScope.parent.entity.mail

    mail.to='info@capmission.com'
    mail.from= 'capmission.com@gmail.com'
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
    mail.subject='Modification de la séance ' + period  + ' de : '+ $rootScope.student.entity.name + ' le : ' + debutDate

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
    $http.post('http://81.192.194.109:8182/CapMissionApp/send-mail', mail).success(function(data, status, headers, config){
      $ionicLoading.hide();
      toastr.success('Votre demande a été envoyée avec succès')
      //$ionicHistory.goBack();
    }).error(function(data){
      $ionicLoading.hide();
      toastr.error("Echec envoi de message ! Réessayez plus tart !")
    });

  }


});

