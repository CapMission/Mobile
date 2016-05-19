var parent = angular.module('capMission.parent', ['ngResource', 'ui.router', 'ui.bootstrap','ionicProcessSpinner','ngCordova']);

parent.filter('startFrom', function () {
  /*return function(input, start) {
   if (!input || !input.length) { return; }
   start = +start; //parse to int
   return input.slice(start);
   }*/
  return function (input, start) {
    if (input) {
      start = +start; //parse to int
      return input.slice(start);
    }
    return [];
  }
});
parent.controller('LogoutCtrl', function($location, $auth, $state,$ionicHistory,authService) {
  /*$scope.logout = function(){
   authService.logout()
   .then(function(result){
   $ionicHistory.clearHistory();
   $ionicHistory.clearCache();
   $ionicHistory.nextViewOptions({ disableBack: true, disableAnimate: true, historyRoot: true });

   $state.go('login', {}, {reload: true});
   });
   };*/
  //alert('exit !!')
  //navigator.app.exitApp();


});
parent.controller('ParentCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', function ($scope, $rootScope, $http, $location, $ionicPopover) {


  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });

}]);
parent.controller('ProposCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory) {

  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
parent.controller('BackCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory) {

  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);


parent.controller('EnfantCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory','$ionicLoading','$ionicPopup', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory,$ionicLoading,$ionicPopup) {


  $scope.now = new Date()
  $scope.getd = function (id) {
    $ionicLoading.show({
      template: 'Chargement'
    });
    $http.get('http://81.192.194.109:8182/CapMissionApp/students/' + id).success(function (data, status, headers, config) {
      //$scope.items = []
      $rootScope.son = data
      $ionicLoading.hide();
     /* $rootScope.currentPage = 1;
      $scope.itemsPerPage = 2;
      $rootScope.pageSize = 10;*/
     /* $scope.pageChangeHandler = function(num) {
        console.log('meals page changed to ' + num);
      };*/

      $location.path('/parent/emploiEnfant');
    }).error(function (data) {
      toastr.error('Echec de connexion');

    })

  }

  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

parent.controller('PprofileCtrl', ['$scope', '$ionicPopover', '$ionicHistory', '$rootScope', '$http','$ionicModal','$ionicLoading', function ($scope, $ionicPopover, $ionicHistory, $rootScope, $http,$ionicModal,$ionicLoading) {
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
  $scope.sendPN = function(mail){
    mail.to='info@capmission.com'
    mail.from= 'capmission.com@gmail.com'
    console.log('body: '+mail.body)
    $scope.body = "Prière de modifier le nom dans le système.\nAncienne valeur " +
      ": " + $rootScope.parent.entity.name + "\nNouvelle valeur : " + mail.body
    //mail.subject='Modification séance de : '+ enfant + 'le : ' + debutDate

    mail.subject='Modification nom de ' + $rootScope.parent.entity.name
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
      $ionicLoading.hide()
      toastr.success('Votre demande a été envoyée avec succès')
      $ionicLoading.hide();
    }).error(function(data){
      $ionicLoading.hide();
      toastr.error("Echec envoi de message ! Réessayez plus tart !")
    });

  }
  $scope.sendPT = function(mail){
    mail.to='info@capmission.com'
    mail.from= 'capmission.com@gmail.com'
    console.log('body: '+mail.body)
    $scope.body = "Prière de modifier le téléphone de "+ $rootScope.parent.entity.name +" dans le système.\nAncienne valeur " +
      ": " + $rootScope.parent.entity.phone + "\nNouvelle valeur : " + mail.body
    //mail.subject='Modification séance de : '+ enfant + 'le : ' + debutDate

    mail.subject='Modification téléphone de ' + $rootScope.parent.entity.name
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
  $scope.sendPE = function(mail){
    mail.to='info@capmission.com'
    mail.from= 'capmission.com@gmail.com'
    console.log('body: '+mail.body)
    $scope.body = "Prière de modifier l'email de "+ $rootScope.parent.entity.name +" dans le système.\nAncienne valeur " +
      ": " + $rootScope.parent.entity.mail + "\nNouvelle valeur : " + mail.body
    //mail.subject='Modification séance de : '+ enfant + 'le : ' + debutDate

    mail.subject='Modification email de ' + $rootScope.parent.entity.name
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
      //$ionicLoading.hide();
    }).error(function(data){
      $ionicLoading.hide();
      toastr.error("Echec envoi de message ! Réessayez plus tart !")
    });

  }
  $scope.sendPJ = function(mail){
    mail.to='info@capmission.com'
    mail.from= 'capmission.com@gmail.com'
    console.log('body: '+mail.body)
    $scope.body = "Prière de modifier la fonction de "+ $rootScope.parent.entity.name +" dans le système.\nAncienne valeur " +
      ": " + $rootScope.parent.entity.job + "\nNouvelle valeur : " + mail.body
    //mail.subject='Modification séance de : '+ enfant + 'le : ' + debutDate

    mail.subject='Modification fonction de ' + $rootScope.parent.entity.name
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
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
parent.controller('PsoldeCtrl', ['$scope', '$ionicPopover', '$ionicHistory', function ($scope, $ionicPopover, $ionicHistory) {

  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
parent.controller('PtimeCtrl', ['$scope', '$ionicPopover', '$ionicHistory', function ($scope, $ionicPopover, $ionicHistory) {
  $scope.test = "emploi"
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
