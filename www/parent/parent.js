var parent = angular.module('capMission.parent', ['ngResource', 'ui.router', 'ui.bootstrap', 'ionicProcessSpinner', 'ngCordova', 'ngStorage']);

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

parent.controller('EnfantCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', '$ionicLoading', '$ionicPopup', '$q', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory, $ionicLoading, $ionicPopup, $q) {

  $scope.now = new Date()
  $scope.getd = function (id) {
    $ionicLoading.show({
      template: 'Chargement'
    });
    $http.get('http://81.192.194.109:8182/CapMissionApp/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {
      //$scope.items = []
      $rootScope.son = data

      $ionicLoading.hide();
      console.log('value : ' + window.localStorage.getItem('login'))
     /* $rootScope.currentPage = 1;
      $scope.itemsPerPage = 2;
      $rootScope.pageSize = 10;*/
     /* $scope.pageChangeHandler = function(num) {
        console.log('meals page changed to ' + num);
      };*/

      $location.path('/parent/emploiEnfant');
    }).error(function (data) {
      //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
      toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
      navigator.app.exitApp();

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
    $http.post('http://81.192.194.109:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
      $ionicLoading.hide()
      toastr.success('Votre demande a été envoyée avec succès')
      $ionicLoading.hide();
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
    $http.post('http://81.192.194.109:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
      $ionicLoading.hide();
      toastr.success('Votre demande a été envoyée avec succès')
      $ionicLoading.hide();
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
    $http.post('http://81.192.194.109:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
      $ionicLoading.hide();
      toastr.success('Votre demande a été envoyée avec succès')
      //$ionicLoading.hide();
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
    $http.post('http://81.192.194.109:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
      $ionicLoading.hide();
      toastr.success('Votre demande a été envoyée avec succès')
      $ionicLoading.hide();
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

  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

parent.controller('PsoldeCtrl', ['$scope', '$rootScope', '$ionicModal', '$http', '$ionicPopover', '$ionicHistory', '$location', '$ionicLoading', '$ionicPopup', function ($scope, $rootScope, $ionicModal, $http, $ionicPopover, $ionicHistory, $location, $ionicLoading, $ionicPopup) {
  $scope.getd = function (id) {
    console.log("id function getd : " + id)
    $ionicLoading.show({
      template: 'Chargement'
    });
    $http.get('http://81.192.194.109:8182/CapMissionApp/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {
      //$scope.items = []
      $rootScope.sonSolde = data
      $ionicLoading.hide();
      $location.path('/parent/solde');
    }).error(function (data) {
      //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
      toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
      navigator.app.exitApp();

    })

  }
  $ionicModal.fromTemplateUrl('templates/modalSoldeEnfant.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.getRecap = function (name, date, solde, tarifHour, tarifPeriod, nbreHeures, absence) {
    $scope.name = name
    $scope.solde = solde
    $scope.nbreHeures = nbreHeures
    $scope.tarifHour = tarifHour
    $scope.tarifPeriod = tarifPeriod
    $scope.absence = absence
    $scope.date = date
    debutDate = new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).split(' ').join(' ');
    console.log('nameN: ' + name)
    console.log('tarif hour: ' + tarifHour)
    console.log('solde: ' + solde)
    console.log('nbreHeures: ' + nbreHeures)
    console.log('tarif period: ' + tarifPeriod)
    console.log('date: ' + debutDate)
    console.log('absence: ' + absence)
  }
  $scope.sendRecap = function (mail, solde, nbreHeures, tarifHour, tarifPeriod, absence, name, date) {

    mail.to = 'info@capmission.com'
    mail.from = 'capmission.com@gmail.com'
    name = $scope.name
    solde = $scope.solde
    nbreHeures = $scope.nbreHeures
    tarifHour = $scope.tarifHour
    tarifPeriod = $scope.tarifPeriod
    absence = $scope.absence
    date = $scope.date
    debutDate = new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).split(' ').join(' ');
    mail.subject = ' Message de ' + $rootScope.parent.entity.name + ' à propos du solde de son enfant : ' + $rootScope.sonSolde.entity.name + ' par rapport à la matière : ' + name + ' le : ' + debutDate

    console.log('name: ' + name)
    console.log('solde: ' + solde)
    console.log('heures: ' + nbreHeures)
    console.log('tarif hour: ' + tarifHour)
    console.log('tarif period: ' + tarifPeriod)
    console.log('absence : ' + absence)
    console.log('date: ' + debutDate)
    console.log('subject: ' + mail.subject)

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
  $scope.limit = 10;

  $scope.showMore = function () {
    $scope.limit += 3;
  }
  $scope.showLess = function () {
    $scope.limit -= 3;
  }
  $scope.showAlert = function () {

    absence = $scope.absence
    date = $scope.date
    debutDate = new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).split(' ').join(' ');
    var tarif = $scope.tarifHour.toFixed(2)
    var period = $scope.tarifPeriod.toFixed(2)
    if ($scope.absence = "null") {
      $scope.absence = "Présent"
    }

    var alertPopup = $ionicPopup.alert({
      title: 'Détails récapitulatif solde',
      template: '<ul>Tarif horaire : ' + tarif + ' MAD</ul><br> <ul>Tarif de la séance : ' + period + ' MAD</ul><br> <ul>Nombre heures : ' + $scope.nbreHeures + '</ul><br><ul> Date : ' + debutDate + '</ul><br>' + $scope.absence
    });

    alertPopup.then(function (res) {
      console.log('OK');
    });
  };


  $scope.goBack = function () {
    $ionicHistory.goBack();
  }

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function (popover) {
    $scope.popover = popover;
  });
  $ionicPopover.fromTemplateUrl('templates/popover2.html', {
    scope: $scope,
  }).then(function (popover) {
    $scope.popover2 = popover;
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

parent.controller('PContactCtrl', ['$scope', '$ionicPopover', '$ionicHistory', function ($scope, $ionicPopover, $ionicHistory) {
  $scope.contact = "contact parent"
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

parent.controller('RegParentCtrl', ['$scope', '$ionicPopover', '$ionicHistory', function ($scope, $ionicPopover, $ionicHistory) {
  $scope.regl = "reglement"
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

parent.controller('ChoixsoldeCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', '$ionicLoading', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory, $ionicLoading) {

  $scope.get = function () {
    if ($rootScope.parent.entity.students.length == '1') {

      console.log('Le nombre  :' + $rootScope.parent.entity.students.length)

      // On fait un for pour parcourir l'arrayList (car c'est une liste d'étudiants)
      for (index = 0; index < $rootScope.parent.entity.students.length; ++index) {
        if (index + 1 == $rootScope.parent.entity.students.length) {
          id = $rootScope.parent.entity.students[index].id
          console.log("id id" + id)
        }
      }

      // Connexion au serveur pour récupérer les données Etudiant
      $ionicLoading.show({
        template: "En cours d'envoi !"
      });
      $http.get('http://81.192.194.109:8182/CapMissionApp/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {

        $rootScope.sonSolde = data
        $ionicLoading.hide()
        // Redirige vers la page de l'emploi directement
        $location.path('/parent/solde');

      }).error(function (data) {

        //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
        toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
        navigator.app.exitApp();
      })
    } else if ($rootScope.parent.entity.students.length == '2') {

      console.log($rootScope.parent.entity.name)
      console.log('nbre students :' + $rootScope.parent.entity.students.length)
      // On fait un for pour parcourir l'arrayList (car c'est une liste d'étudiants)
      for (index = 0; index < 2; ++index) {
        name = $rootScope.parent.entity.students[index].name
      }
      console.log(name)

      if (name == $rootScope.parent.entity.name) {

        for (index = 0; index < 1; ++index) {
          id = $rootScope.parent.entity.students[index].id
          console.log("id student " + id)
        }
        $ionicLoading.show({
          template: "En cours d'envoi !"
        });
        $http.get('http://81.192.194.109:8182/CapMissionApp/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {

          $rootScope.sonSolde = data
          $ionicLoading.hide()
          $location.path('/parent/solde');

        }).error(function (data) {

          //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
          toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
          navigator.app.exitApp();
        })
      }
      else if (name != $rootScope.parent.entity.name) {
        $location.path('/parent/ChoixEnfantSolde');
      }
    }
    else if ($rootScope.parent.entity.students.length >= "2") {
      $location.path('/parent/ChoixEnfantSolde');
    }
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
