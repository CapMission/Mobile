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

  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });

}]);

parent.controller('ProposCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory) {
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }

}]);

parent.controller('BackCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory) {
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }

}]);

parent.controller('EnfantCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', '$ionicLoading', '$ionicPopup', '$q', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory, $ionicLoading, $ionicPopup, $q) {
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
  $scope.now = new Date()
  $scope.getd = function (id) {
    $ionicLoading.show({
      template: 'Chargement'
    });
    $http.get('http://51.255.195.19:8182/CapMissionApp/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {
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

}]);

parent.controller('PprofileCtrl', ['$scope', '$ionicPopover', '$ionicHistory', '$rootScope', '$http','$ionicModal','$ionicLoading', function ($scope, $ionicPopover, $ionicHistory, $rootScope, $http,$ionicModal,$ionicLoading) {
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
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

    mail.subject = 'MOB - ' + $rootScope.parent.entity.name + ' - Modification Nom'
    mail.body = $scope.body

    console.log('to: '+mail.to)
    console.log('from: '+mail.from)
    console.log('subject: '+mail.subject)
    console.log('body: '+mail.body)
    console.log('body to send: '+ $scope.body)

    $ionicLoading.show({
      template: "En cours d'envoi !",
      duration: 1500
    });
    $http.post('http://51.255.195.19:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
      toastr.success('Votre demande a été envoyée avec succès')
    }).error(function (data, status) {
      if (status == 0) {
        toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
        navigator.app.exitApp();
      }
      else {
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

    mail.subject = 'MOB - ' + $rootScope.parent.entity.name + ' - Modification Téléphone'
    mail.body = $scope.body

    console.log('to: '+mail.to)
    console.log('from: '+mail.from)
    console.log('subject: '+mail.subject)
    console.log('body: '+mail.body)
    console.log('body to send: '+ $scope.body)

    $ionicLoading.show({
      template: "En cours d'envoi !",
      duration: 1500
    });
    $http.post('http://51.255.195.19:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
      toastr.success('Votre demande a été envoyée avec succès')
    }).error(function (data, status) {
      if (status == 0) {
        toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
        navigator.app.exitApp();
      }
      else {
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

    mail.subject = 'MOB - ' + $rootScope.parent.entity.name + ' - Modification Email'
    mail.body = $scope.body

    console.log('to: '+mail.to)
    console.log('from: '+mail.from)
    console.log('subject: '+mail.subject)
    console.log('body: '+mail.body)
    console.log('body to send: '+ $scope.body)

    $ionicLoading.show({
      template: "En cours d'envoi !",
      duration: 1500
    });
    $http.post('http://51.255.195.19:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
      toastr.success('Votre demande a été envoyée avec succès')
      //$ionicLoading.hide();
    }).error(function (data, status) {
      if (status == 0) {
        toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
        navigator.app.exitApp();
      }
      else {
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

    mail.subject = 'MOB - ' + $rootScope.parent.entity.name + ' - Modification Fonction'
    mail.body = $scope.body

    console.log('to: '+mail.to)
    console.log('from: '+mail.from)
    console.log('subject: '+mail.subject)
    console.log('body: '+mail.body)
    console.log('body to send: '+ $scope.body)

    $ionicLoading.show({
      template: "En cours d'envoi !",
      duration: 1500
    });
    $http.post('http://51.255.195.19:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
      toastr.success('Votre demande a été envoyée avec succès')
    }).error(function (data, status) {
      if (status == 0) {
        toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
        navigator.app.exitApp();
      }
      else {
        toastr.error("Echec envoi de message ! Réessayez plus tart !")
      }
    });

  }

}]);

parent.controller('PsoldeCtrl', ['$scope', '$rootScope', '$ionicModal', '$http', '$ionicPopover', '$ionicHistory', '$location', '$ionicLoading', '$ionicPopup', function ($scope, $rootScope, $ionicModal, $http, $ionicPopover, $ionicHistory, $location, $ionicLoading, $ionicPopup) {
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
  $scope.getd = function (id) {
    console.log("id function getd : " + id)
    $ionicLoading.show({
      template: 'Chargement'
    });
    $http.get('http://51.255.195.19:8182/CapMissionApp/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {
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
    tarifHour = $scope.tarifHour.toFixed(2)
    tarifPeriod = $scope.tarifPeriod.toFixed(2)
    absence = $scope.absence
    if (absence = "null") {
      absence = "Présent"
    }
    date = $scope.date
    debutDate = new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).split(' ').join(' ');
    mail.subject = 'MOB - ' + $rootScope.parent.entity.name + ' - Solde'
    $scope.body = 'Message :' + mail.body + '\n Détails \n Etudiant : ' + $rootScope.sonSolde.entity.name +
      '\n Tarif horaire : ' + tarifHour + '\n Tarif de la séance : ' + tarifPeriod +
      '\n Nombre heures : ' + nbreHeures + '\n Matière : ' + name + '\n Date : ' + debutDate + '\n' + absence
    mail.body = $scope.body
    console.log('name: ' + name)
    console.log('solde: ' + solde)
    console.log('heures: ' + nbreHeures)
    console.log('tarif hour: ' + tarifHour)
    console.log('tarif period: ' + tarifPeriod)
    console.log('absence : ' + absence)
    console.log('date: ' + debutDate)
    console.log('subject: ' + mail.subject)
    console.log('scope body: ' + $scope.body)
    console.log('mail body: ' + mail.body)

    $ionicLoading.show({
      template: "En cours d'envoi !",
      duration: 1500
    });
    $http.post('http://51.255.195.19:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
      //$ionicLoading.hide();
      toastr.success('Votre demande a été envoyée avec succès')
      //$ionicHistory.goBack();
    }).error(function (data, status) {
      if (status == 0) {
        toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
        navigator.app.exitApp();
      }
      else {
        //$ionicLoading.hide();
        toastr.error("Echec envoi de message ! Réessayez plus tart !")
      }
    });

  }
  $scope.limit = 10;

  $scope.showMore = function () {
    $ionicLoading.show({
      template: 'Chargement',
      duration: 1500
    })
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



}]);

parent.controller('PtimeCtrl', ['$scope', '$ionicPopover', '$ionicHistory', function ($scope, $ionicPopover, $ionicHistory) {
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
  $scope.test = "emploi"
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }

}]);



parent.controller('RegParentCtrl', ['$scope', '$ionicPopover', '$ionicHistory', function ($scope, $ionicPopover, $ionicHistory) {
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
  $scope.regl = "reglement"
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }

}]);

parent.controller('ChoixsoldeCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', '$ionicLoading', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory, $ionicLoading) {
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
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
        template: "Chargement..."
      });
      $http.get('http://51.255.195.19:8182/CapMissionApp/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {

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
          template: "Chargement..."
        });
        $http.get('http://51.255.195.19:8182/CapMissionApp/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {

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

}]);

// Controller pour Contact.html
parent.controller('PContactCtrl', ['$scope', '$ionicPopover', '$location', '$ionicHistory', function ($scope, $ionicPopover, $location, $ionicHistory) {
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
  $scope.goCritique = function () {
    $location.path('/parent/remarque')
  }
  $scope.goDemandeInfo = function () {
    $location.path('/parent/demandeInfo')
  }
  $scope.goAjout = function () {
    $location.path('/parent/choixMatiere')
  }
  $scope.goModif = function () {
    $location.path('/parent/modifCours')
  }
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }

}]);


// Controller Remarque pour pouvoir accéder au popover et retourner à la page précédente
parent.controller('PRemarqueCtrl', ['$scope', '$ionicPopover', function ($scope, $ionicPopover) {
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
}]);

// Controller Remarque pour l'envoie de mail
parent.controller("PEmailController", ['$scope', '$ionicPopup', '$rootScope', '$ionicModal', '$http', '$ionicLoading',
  function ($scope, $ionicPopup, $rootScope, $ionicModal, $http, $ionicLoading) {
    // Fonction qui envoie le mail
    $rootScope.sendR = function (mail) {

      // Email to and from
      mail.to = 'info@capmission.com'
      mail.from = 'capmission.com@gmail.com'

      // Envoie de l'objet du mail et de son contenu
      mail.subject = 'MOB - ' + $rootScope.parent.entity.name + ' - ' + mail.subject

      console.log('to: ' + mail.to)
      console.log('from: ' + mail.from)
      console.log('subject: ' + mail.subject)
      console.log('body: ' + mail.body)
      console.log('body to send: ' + $scope.body)

      $ionicLoading.show({
        template: "En cours d'envoi !",
        duration: 1500
      });
      $http.post('http://51.255.195.19:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {

        toastr.success('Votre remarque a été envoyée avec succès')
        //$ionicHistory.goBack();
      }).error(function (data, status) {
        if (status == 0) {
          toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Veuillez nous excuser !', {displayDuration: 1000});
          navigator.app.exitApp();
        }
        else {

          toastr.error("Echec envoi de message ! Réessayez plus tart !")
        }
      });

    }
  }]);

// Controller pour demande d'informations popover  et back
parent.controller('PDemandeInfoController', ['$scope', '$ionicPopover', function ($scope, $ionicPopover) {
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }

}]);

// Controller pour demande d'informations envoie Email
parent.controller("PDemandeInfoEmailController", ['$scope', '$ionicPopup', '$rootScope', '$ionicModal', '$http', '$ionicLoading', '$location', '$ionicPopover',
  function ($scope, $ionicPopup, $rootScope, $ionicModal, $http, $ionicLoading, $location, $ionicPopover) {
    $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
    // Fonction qui envoie le mail
    $rootScope.sendI = function (mail) {

      // Email to and from
      mail.to = 'info@capmission.com'
      mail.from = 'capmission.com@gmail.com'

      // Envoie de l'objet du mail et de son contenu
      mail.subject = 'MOB - ' + $rootScope.parent.entity.name + ' - ' + mail.subject

      console.log('to: ' + mail.to)
      console.log('from: ' + mail.from)
      console.log('subject: ' + mail.subject)
      console.log('body: ' + mail.body)

      $ionicLoading.show({
        template: "En cours d'envoi !",
        duration: 1500
      });
      $http.post('http://51.255.195.19:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
        toastr.success('Votre remarque a été envoyée avec succès')
        //$ionicHistory.goBack();
      }).error(function (data, status) {
        if (status == 0) {
          toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Veuillez nous excuser !', {displayDuration: 1000});
          navigator.app.exitApp();
        }
        else {
          toastr.error("Echec envoi de message ! Réessayez plus tart !")
        }
      });

    }

  }]);

// Controller Cours choix ajout/modif
parent.controller('PChoixCoursController', ['$scope', '$ionicPopover', function ($scope, $ionicPopover) {
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });

  $scope.goBack = function () {
    $ionicHistory.goBack();
  }

}]);

// Controller choix matière
parent.controller('PChoixMatiereCtrl', ['$scope','$rootScope', '$ionicPopover','$http','$ionicLoading','$location', function ($scope,$rootScope, $ionicPopover,$http,$ionicLoading,$location) {

 /* console.log('On est dans le controller PChoixMatiereCtrl')
  console.log('On est dans le controller PChoixMatiereCtrl')




  //Pour récupérer le nom de l'enfant
  for (index = 0; index < $rootScope.parent.entity.students.length; ++index) {
    nomEnfant = $rootScope.parent.entity.students[index].name
    console.log("le nom de l'enfant est :" +nomEnfant)
  }
  $scope.nomEnfant = nomEnfant

  //Pour récupérer le niveau de l'enfant
  //On fait un for pour parcourir l'arrayList (car c'est une liste d'étudiants)
  for (index = 0; index < $rootScope.parent.entity.students.length; ++index) {
    if (index + 1 == $rootScope.parent.entity.students.length) {
      id = $rootScope.parent.entity.students[index].id
      console.log("id id" + id)
    }
  }

  //Pour récupérer la liste des matières


  $http.get('http://localhost:8998/CapMissionApp/students/' +id , {timeout: 35000}).success(function (data, status, headers, config) {
    //$scope.items = []
    $rootScope.niveauEnfant = data
    $ionicLoading.hide();

    //On récupère l'id du niveau avec la session student
    $scope.idNiveau = $rootScope.niveauEnfant.entity.niveau.id
    console.log('id niveau :' + $scope.idNiveau)

    //recupération liste niveau
    $http.get('http://localhost:8998/CapMissionApp/niveau/' +$scope.idNiveau , {timeout: 35000}).success(function (data, status, headers, config) {
      //$scope.items = []
      $rootScope.matiereList = data
      $ionicLoading.hide();

      //On récupère l'id du niveau avec la session student
      $scope.nameCourse = $rootScope.matiereList.entity.listCourse
      console.log('id niveau :' + $scope.nameCourse)

      // $ionicLoading.hide();
      // toastr.success('Connexion avec succès')

    }).error(function (data) {
      //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
      toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
      navigator.app.exitApp();

    })

    // $ionicLoading.hide();
    // toastr.success('Connexion avec succès')

  }).error(function (data) {
    //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
    toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
    navigator.app.exitApp();

  })

  $scope.goPage= function(matiere){
    $rootScope.mat = matiere
    $location.path('/parent/choixTypeCours')
  }*/
  $scope.goPage= function(matiere){
    $rootScope.mat = matiere
    $location.path('/parent/choixTypeCours')
  }
}]);

// Controller page choix enfant à matière
parent.controller('PAjoutCoursChoixCtrl', ['$scope', '$rootScope', '$ionicPopover', '$location', '$ionicHistory', '$ionicLoading', '$http', function ($scope, $rootScope, $ionicPopover, $location, $ionicHistory, $ionicLoading, $http) {
  console.log('On est dans le controller PAjoutCoursChoixCtrl')
  $scope.goChoixMatiere = function(id){
    $rootScope.test = id
    $ionicLoading.show({
      template: "Chargement !",
    });
    $http.get('http://51.255.195.19:8182/CapMissionApp/students/' + id, {timeout: 35000}).success(function (data) {
      $rootScope.eleve = data
      $rootScope.idE = $rootScope.eleve.entity.id
      $rootScope.nomEnfant = $rootScope.eleve.entity.name
      $rootScope.niveauE = $rootScope.eleve.entity.niveau.id
      $rootScope.niveauN = $rootScope.eleve.entity.niveau.name
      $rootScope.niveauList = $rootScope.eleve.entity.niveau.listCourse
      console.log('nom eleve : '+$rootScope.nomEnfant)
      console.log('id eleve : '+$rootScope.idE)
      console.log('id niveau : '+ $rootScope.niveauE )
      console.log('nom niveau : '+ $rootScope.niveauN)
      console.log('liste niveau : '+ $rootScope.niveauList)
      $ionicLoading.hide()
      // Redirige vers la page de l'emploi directement
      $location.path('/parent/choixMatiere');
    })
    // $location.path('/parent/choixMatiere')
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


// Controller choix des enfant pour ajout cours
parent.controller('ChoixAjoutCoursCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', '$ionicLoading', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory, $ionicLoading) {
  $scope.get = function (id) {
    if ($rootScope.parent.entity.students.length == '1') {
      console.log('Le nombre  :' + $rootScope.parent.entity.students.length)
      // On fait un for pour parcourir l'arrayList (car c'est une liste d'étudiants)
      // for (index = 0; index < $rootScope.parent.entity.students.length; ++index) {
      //   if (index + 1 == $rootScope.parent.entity.students.length) {
      //     idN = $rootScope.parent.entity.students[index].id
      //     console.log("id id" + idN)
      //   }
      // }
      // Connexion au serveur pour récupérer les données Etudiant
      // $ionicLoading.show({
      //   template: "Chargement !"
      // });
      $http.get('http://51.255.195.19:8182/CapMissionApp/students/' + id, {timeout: 35000}).success(function (data) {
        $rootScope.eleve = data
        $rootScope.idE = $rootScope.eleve.entity.id
        $rootScope.nomEnfant = $rootScope.eleve.entity.name
        $rootScope.niveauE = $rootScope.eleve.entity.niveau.id
        $rootScope.niveauN = $rootScope.eleve.entity.niveau.name
        $rootScope.niveauList = $rootScope.eleve.entity.niveau.listCourse
        console.log('nom eleve : '+$rootScope.nomEnfant)
        console.log('id eleve : '+$rootScope.idE)
        console.log('id niveau : '+ $rootScope.niveauE )
        console.log('nom niveau : '+ $rootScope.niveauN)
        console.log('liste niveau : '+ $rootScope.niveauList)
        $ionicLoading.hide()
        $location.path('/parent/choixMatiere');
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
      console.log('nom eleve dans choix enfant:' +name)
      if (name == $rootScope.parent.entity.name) {
        // for (index = 0; index < 1; ++index) {
        //   idN = $rootScope.parent.entity.students[index].id
        //   console.log("id student " + idN)
        // }
        $ionicLoading.show({
          template: "Chargement !"
        });
        $http.get('http://51.255.195.19:8182/CapMissionApp/students/' + id, {timeout: 35000}).success(function (data) {
          $rootScope.eleve = data
          $rootScope.idE = $rootScope.eleve.entity.id
          $rootScope.nomEnfant = $rootScope.eleve.entity.name
          $rootScope.niveauE = $rootScope.eleve.entity.niveau.id
          $rootScope.niveauN = $rootScope.eleve.entity.niveau.name
          $rootScope.niveauList = $rootScope.eleve.entity.niveau.listCourse
          console.log('nom eleve : '+$rootScope.nomEnfant)
          console.log('id eleve : '+$rootScope.idE)
          console.log('id niveau : '+ $rootScope.niveauE )
          console.log('nom niveau : '+ $rootScope.niveauN)
          console.log('liste niveau : '+ $rootScope.niveauList)
          $ionicLoading.hide()
          $location.path('/parent/choixMatiere');
        }).error(function (data) {
          //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
          toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
          navigator.app.exitApp();
        })
      }
      else if (name != $rootScope.parent.entity.name) {
        $rootScope.test = id
        console.log('id enfant :' +$rootScope.test)
        $http.get('http://51.255.195.19:8182/CapMissionApp/students/' + id, {timeout: 35000}).success(function (data) {
          $rootScope.eleve = data
          $rootScope.idE = $rootScope.eleve.entity.id
          $rootScope.nomEnfant = $rootScope.eleve.entity.name
          $rootScope.niveauE = $rootScope.eleve.entity.niveau.id
          $rootScope.niveauN = $rootScope.eleve.entity.niveau.name
          $rootScope.niveauList = $rootScope.eleve.entity.niveau.listCourse
          console.log('nom eleve : '+$rootScope.nomEnfant)
          console.log('id eleve : '+$rootScope.idE)
          console.log('id niveau : '+ $rootScope.niveauE )
          console.log('nom niveau : '+ $rootScope.niveauN)
          console.log('liste niveau : '+ $rootScope.niveauList)
          $ionicLoading.hide()
          $location.path('/parent/choixAjoutCours');
        })
      }
    }
    else if ($rootScope.parent.entity.students.length >= "2") {
      $http.get('http://51.255.195.19:8182/CapMissionApp/students/' + id, {timeout: 35000}).success(function (data) {
        console.log('id enfant :' +id)
        $rootScope.eleve = data
        $rootScope.idE = $rootScope.eleve.entity.id
        $rootScope.nomEnfant = $rootScope.eleve.entity.name
        $rootScope.niveauE = $rootScope.eleve.entity.niveau.id
        $rootScope.niveauN = $rootScope.eleve.entity.niveau.name
        $rootScope.niveauList = $rootScope.eleve.entity.niveau.listCourse
        console.log('nom eleve : '+$rootScope.nomEnfant)
        console.log('id eleve : '+$rootScope.idE)
        console.log('id niveau : '+ $rootScope.niveauE )
        console.log('nom niveau : '+ $rootScope.niveauN)
        console.log('liste niveau : '+ $rootScope.niveauList)
        $ionicLoading.hide()
        $location.path('/parent/choixAjoutCours');
      })
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

// Controller pour choisir cours part ou cours en groupe
parent.controller('PChoixTypeCours', ['$scope', '$ionicPopover', '$location', '$rootScope', function ($scope, $ionicPopover, $location, $rootScope) {


  // $rootScope.matiere = $rootSope.mat
  // console.log('matiere :' +$rootScope.matiere)

  $scope.coursPart = function(mat, coursParti){
    $rootScope.matiere = mat
    $rootScope.coursPar = coursParti
    $location.path('/parent/coursParticulier')
  }

  $scope.coursGroupe = function(mat, coursGpe){
    $rootScope.matiere = mat
    $rootScope.coursG = coursGpe
    $location.path('/parent/nbEtudiantsGroupe')
  }

  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

// Controller pour envoyer un mail pour ajout cours part
parent.controller('PCoursParticulierCtrl', ['$scope', '$ionicPopup', '$rootScope', '$ionicModal', '$http', '$ionicLoading','$location','$ionicPopover',
  function($scope,$ionicPopup,$rootScope,$ionicModal,$http,$ionicLoading,$location,$ionicPopover){

    // Fonction qui envoie le mail
    $rootScope.sendC = function(mail, coursPar, matiere) {

      // Email to and from
      mail.to='info@capmission.com'
      mail.from='capmission.com@gmail.com'

      // Envoie de l'objet du mail et de son contenu
      mail.subject= 'MOB - ' + $rootScope.parent.entity.name + ' - AJOUT COURS PART. '
      mail.body= coursPar + matiere+  '\n' +mail.body

      console.log('to: '+mail.to)
      console.log('from: '+mail.from)
      console.log('subject: '+mail.subject)
      console.log('body: '+mail.body)

      $ionicLoading.show({
        template: "En cours d'envoi !",
        duration: 1500
      });
      $http.post('http://51.255.195.19:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
        toastr.success('Votre demande de cours particulier a été envoyée avec succès')
        //$ionicHistory.goBack();
      }).error(function (data, status) {
        if (status == 0) {
          toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Veuillez nous excuser !', {displayDuration: 1000});
          navigator.app.exitApp();
        }
        else {
          toastr.error("Echec envoi de message ! Réessayez plus tart !")
        }
      });

    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);

// Controller pour ajout en groupe
parent.controller('PCoursGroupCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover){

    $scope.goAutre = function(matiere, coursG, autre){
      $rootScope.mat = matiere
      $rootScope.coursGpe = coursG
      $rootScope.autres = autre
      $location.path('/parent/coursGroupAutre')
    }

    $scope.creerTonGroup = function(matiere, coursG, creerGroupe){
      $rootScope.mat = matiere
      $rootScope.coursGpe = coursG
      $rootScope.creerGroup = creerGroupe
      $location.path('/parent/nbEtudiantsGroupe')
    }
    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);

// Controller pour ajout groupe Autre
parent.controller('PCoursGroupAutreCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover){

    // Fonction qui envoie le mail
    $rootScope.sendAutre = function(mail, mat, coursGpe , autres) {

      // Email to and from
      mail.to='info@capmission.com'
      mail.from='capmission.com@gmail.com'

      // Envoie de l'objet du mail et de son contenu
      mail.subject= 'MOB - ' + $rootScope.parent.entity.name + ' - AUTRE COURS GROUPE. '
      mail.body= coursGpe + mat+ '\n' +mail.body

      console.log('to: '+mail.to)
      console.log('from: '+mail.from)
      console.log('subject: '+mail.subject)
      console.log('body: '+mail.body)

      $ionicLoading.show({
        template: "En cours d'envoi !",
        duration: 1500
      });
      $http.post('http://51.255.195.19:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
        toastr.success('Votre message a été envoyée avec succès')
        //$ionicHistory.goBack();
      }).error(function (data, status) {
        if (status == 0) {
          toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Veuillez nous excuser !', {displayDuration: 1000});
          navigator.app.exitApp();
        }
        else {
          toastr.error("Echec envoi de message ! Réessayez plus tart !")
        }
      });

    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);

// Controller pour creer ton groupe nb étudiants
parent.controller('PNbEtudiantsGroupeCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover){

    // Fonction qui transfère les variables - pour 3 etudiants
    $scope.goDate3 = function(mat, coursGpe, creerGroup, boutonRadio, nom1, nom2, nom3){
      $rootScope.matiere = mat
      $rootScope.coursG = coursGpe
      $rootScope.creerTonGroupe = creerGroup
      $rootScope.nb = boutonRadio
      $rootScope.nomE1 = nom1
      $rootScope.nomE2 = nom2
      $rootScope.nomE3 = nom3
      $location.path('/parent/coursChoix')
    }

    // Fonction qui transfère les variables - pour 4 etudiants
    $scope.goDate4 = function(mat, coursGpe, creerGroup, boutonRadio, nom1, nom2, nom3, nom4){
      $rootScope.matiere = mat
      $rootScope.coursG = coursGpe
      $rootScope.creerTonGroupe = creerGroup
      $rootScope.nb = boutonRadio
      $rootScope.nomE1 = nom1
      $rootScope.nomE2 = nom2
      $rootScope.nomE3 = nom3
      $rootScope.nomE4 = nom4
      $location.path('/parent/coursChoix')
    }

    // Fonction qui transfère les variables - pour 5 etudiants
    $scope.goDate5 = function(mat, coursGpe, creerGroup, boutonRadio, nom1, nom2, nom3, nom4, nom5){
      $rootScope.matiere = mat
      $rootScope.coursG = coursGpe
      $rootScope.creerTonGroupe = creerGroup
      $rootScope.nb = boutonRadio
      $rootScope.nomE1 = nom1
      $rootScope.nomE2 = nom2
      $rootScope.nomE3 = nom3
      $rootScope.nomE4 = nom4
      $rootScope.nomE5 = nom5
      $location.path('/parent/coursChoix')
    }

    // Fonction qui transfère les variables - pour 6 etudiants
    $scope.goDate6 = function(mat, coursGpe, creerGroup, boutonRadio, nom1, nom2, nom3, nom4, nom5, nom6){
      $rootScope.matiere = mat
      $rootScope.coursG = coursGpe
      $rootScope.creerTonGroupe = creerGroup
      $rootScope.nb = boutonRadio
      $rootScope.nomE1 = nom1
      $rootScope.nomE2 = nom2
      $rootScope.nomE3 = nom3
      $rootScope.nomE4 = nom4
      $rootScope.nomE5 = nom5
      $rootScope.nomE6 = nom6
      $location.path('/parent/coursChoix')
    }


    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);

// Controller pour cours en groupe date et heure pour cours multiple
parent.controller('PDateHoraireGroupeCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover){

    $scope.goRecap3 = function(mat, coursGpe, creerGroup, nbEt, nom1, nom2, nom3, nom4, nom5, nom6, heureDebut1, heureDebut2, boutonRadio, jour1, jour2, jour3){

      // debutHeure = new Date(heureDebut1).toLocaleDateString('fr-FR', {
      //   hour: 'numeric',
      //   minute: 'numeric'
      // }).split(' ').join(' ');

      $rootScope.matiere = mat
      $rootScope.coursG = coursGpe
      $rootScope.creerTonGroupe = creerGroup
      $rootScope.nb = nbEt
      $rootScope.nomE1 = nom1
      $rootScope.nomE2 = nom2
      $rootScope.nomE3 = nom3
      $rootScope.nomE4 = nom4
      $rootScope.nomE5 = nom5
      $rootScope.nomE6 = nom6
      $rootScope.heureDeb1 = heureDebut1
      $rootScope.heureDeb2 = heureDebut2
      $rootScope.nbJours = boutonRadio
      $rootScope.jours1 = jour1
      $rootScope.jours2 = jour2
      $rootScope.jours3 = jour3
      $location.path('/parent/test')
    }

    // Fonction qui transfère les variables - de 1 à 6 etudiants - pour 4 jours de cours  en groupe
    $scope.goRecap4 = function(mat, coursGpe, creerGroup, nbEt, nom1, nom2, nom3, nom4, nom5, nom6, heureDebut1,
                               heureDebut2, heureDebut3, boutonRadio, jour1, jour2, jour3, jour4){

      $rootScope.matiere = mat
      $rootScope.coursG = coursGpe
      $rootScope.creerTonGroupe = creerGroup
      $rootScope.nb = nbEt
      $rootScope.nomE1 = nom1
      $rootScope.nomE2 = nom2
      $rootScope.nomE3 = nom3
      $rootScope.nomE4 = nom4
      $rootScope.nomE5 = nom5
      $rootScope.nomE6 = nom6
      $rootScope.heureDeb1 = heureDebut1
      $rootScope.heureDeb2 = heureDebut2
      $rootScope.heureDeb3 = heureDebut3
      $rootScope.nbJours = boutonRadio
      $rootScope.jours1 = jour1
      $rootScope.jours2 = jour2
      $rootScope.jours3 = jour3
      $rootScope.jours4 = jour4
      $location.path('/parent/test')
    }

    // Fonction qui transfère les variables - de 1 à 6 etudiants - pour 5 jours de cours  en groupe
    $scope.goRecap5 = function(mat, coursGpe, creerGroup, nbEt, nom1, nom2, nom3, nom4, nom5, nom6, heureDebut1, heureDebut2, heureDebut3, heureDebut4, boutonRadio, jour1, jour2, jour3, jour4, jour5){

      $rootScope.matiere = mat
      $rootScope.coursG = coursGpe
      $rootScope.creerTonGroupe = creerGroup
      $rootScope.nb = nbEt
      $rootScope.nomE1 = nom1
      $rootScope.nomE2 = nom2
      $rootScope.nomE3 = nom3
      $rootScope.nomE4 = nom4
      $rootScope.nomE5 = nom5
      $rootScope.nomE6 = nom6
      $rootScope.heureDeb1 = heureDebut1
      $rootScope.heureDeb2 = heureDebut2
      $rootScope.heureDeb3 = heureDebut3
      $rootScope.heureDeb4 = heureDebut4
      $rootScope.nbJours = boutonRadio
      $rootScope.jours1 = jour1
      $rootScope.jours2 = jour2
      $rootScope.jours3 = jour3
      $rootScope.jours4 = jour4
      $rootScope.jours5 = jour5
      $location.path('/parent/test')
    }

    // Fonction qui transfère les variables - de 1 à 6 etudiants - pour 6 jours de cours  en groupe
    $scope.goRecap6 = function(mat, coursGpe, creerGroup, nbEt, nom1, nom2, nom3, nom4, nom5, nom6, heureDebut1, heureDebut2, heureDebut3, heureDebut4, heureDebut5,
                               boutonRadio, jour1, jour2, jour3, jour4, jour5, jour6){

      $rootScope.matiere = mat
      $rootScope.coursG = coursGpe
      $rootScope.creerTonGroupe = creerGroup
      $rootScope.nb = nbEt
      $rootScope.nomE1 = nom1
      $rootScope.nomE2 = nom2
      $rootScope.nomE3 = nom3
      $rootScope.nomE4 = nom4
      $rootScope.nomE5 = nom5
      $rootScope.nomE6 = nom6
      $rootScope.heureDeb1 = heureDebut1
      $rootScope.heureDeb2 = heureDebut2
      $rootScope.heureDeb3 = heureDebut3
      $rootScope.heureDeb4 = heureDebut4
      $rootScope.heureDeb5 = heureDebut5
      $rootScope.nbJours = boutonRadio
      $rootScope.jours1 = jour1
      $rootScope.jours2 = jour2
      $rootScope.jours3 = jour3
      $rootScope.jours4 = jour4
      $rootScope.jours5 = jour5
      $rootScope.jours6 = jour6
      $location.path('/parent/test')
    }

    // Fonction qui transfère les variables - de 1 à 6 etudiants - pour 6 jours de cours  en groupe
    $scope.goRecap7 = function(mat, coursGpe, creerGroup, nbEt, nom1, nom2, nom3, nom4, nom5, nom6, heureDebut1, heureDebut2, heureDebut3, heureDebut4, heureDebut5, heureDebut6,
                               boutonRadio, jour1, jour2, jour3, jour4, jour5, jour6, jour7){

      $rootScope.matiere = mat
      $rootScope.coursG = coursGpe
      $rootScope.creerTonGroupe = creerGroup
      $rootScope.nb = nbEt
      $rootScope.nomE1 = nom1
      $rootScope.nomE2 = nom2
      $rootScope.nomE3 = nom3
      $rootScope.nomE4 = nom4
      $rootScope.nomE5 = nom5
      $rootScope.nomE6 = nom6
      $rootScope.heureDeb1 = heureDebut1
      $rootScope.heureDeb2 = heureDebut2
      $rootScope.heureDeb3 = heureDebut3
      $rootScope.heureDeb4 = heureDebut4
      $rootScope.heureDeb5 = heureDebut5
      $rootScope.heureDeb6 = heureDebut6
      $rootScope.nbJours = boutonRadio
      $rootScope.jours1 = jour1
      $rootScope.jours2 = jour2
      $rootScope.jours3 = jour3
      $rootScope.jours4 = jour4
      $rootScope.jours5 = jour5
      $rootScope.jours6 = jour6
      $rootScope.jours7 = jour7
      $location.path('/parent/test')
    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);

// Controller pour recap cours en groupe  NON FONCTIONNEL
parent.controller('PRecapCoursGroupeCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover){

    $rootScope.sendRecapMail = function(mail, mat, coursGpe, creerGroup, nbEt, nom1, nom2, nom3, nom4, nom5, nom6, heureDeb, dateDeb, nbJours, jours1, jours2, jours3, jours4, jours5, jours6) {

      debutHeure = new Date(heureDeb).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }).split(' ').join(' ');

      debutDate = new Date(heureDeb).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }).split(' ').join(' ');

      $rootScope.matiere = mat
      $rootScope.coursG = coursGpe
      $rootScope.creerTonGroupe = creerGroup
      $rootScope.nb = nbEt
      $rootScope.nomE1 = nom1
      $rootScope.nomE2 = nom2
      $rootScope.nomE3 = nom3
      $rootScope.nomE4 = nom4
      $rootScope.nomE5 = nom5
      $rootScope.nomE6 = nom6
      $rootScope.debutH = debutHeure
      $rootScope.debutD = debutDate
      $rootScope.boutonRadio = nbJours
      $rootScope.jour1 = jours1
      $rootScope.jour2 = jours2
      $rootScope.jour3 = jours3
      $rootScope.jour4 = jours4
      $rootScope.jour5 = jours5
      $rootScope.jour6 = jours6

      mail.to = 'info@capmission.com'
      mail.from = 'capmission.com@gmail.com'

      // Envoie de l'objet du mail et de son contenu
      mail.subject = 'MOB - ' + $rootScope.parent.entity.name + ' - CREATION GROUPE. '
      mail.body = 'Le parent : ' + $rootScope.parent.entity.name + 'souhaite créer un groupe.\n Le nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
        'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' + $rootScope.nomE6 + '\n' +
        'Heure de début du cours :' + $rootScope.debutH + '\nSi cours occasionnel, date souhaitée :' + $rootScope.debutD + '\n' +
        'Si plusieurs jours par semaines sont souhaités, nombre de jours :' + $rootScope.boutonRadio + '\n' +
        'Jour :' + $rootScope.jour1 + '\n' + $rootScope.jour2 + '\n' + $rootScope.jour3 + '\n' + $rootScope.jour4 + '\n' + $rootScope.jour5 + '\n' + $rootScope.jour6 + '\n' +
        'Une remarque éventuelle de la part du parent :' +mail.body

      console.log('to: ' + mail.to)
      console.log('from: ' + mail.from)
      console.log('subject: ' + mail.subject)
      console.log('body: ' + mail.body)

      $ionicLoading.show({
        template: "En cours d'envoi !",
        duration: 1500
      });
      $http.post('http://51.255.195.19:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
        $location.path('/parent/emploiEnfant2')
        toastr.success('Votre demande a été envoyée avec succès')

        //$ionicHistory.goBack();
      }).error(function (data, status) {
        if (status == 0) {
          toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Veuillez nous excuser !', {displayDuration: 1000});
          navigator.app.exitApp();
        }
        else {
          toastr.error("Echec envoi de message ! Réessayez plus tart !")
        }
      });
    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);

// Controller pour choisir cours occasionnel ou cours en groupe
parent.controller('PCoursChoixCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover){

    $scope.goOcc = function(matiere, coursG, creerTonGroupe, nb, nomE1, nomE2, nomE3, nomE4, nomE5, nomE6, frequence){
      $rootScope.mat = matiere
      $rootScope.coursGpe = coursG
      $rootScope.creerGroup = creerTonGroupe
      $rootScope.nbEt = nb
      $rootScope.nom1 = nomE1
      $rootScope.nom2 = nomE2
      $rootScope.nom3 = nomE3
      $rootScope.nom4 = nomE4
      $rootScope.nom5 = nomE5
      $rootScope.nom6 = nomE6
      $rootScope.freq = frequence
      $location.path('/parent/dateHoraireOcc')
    }

    $scope.goMultiple = function(matiere, coursG, creerTonGroupe, nb, nomE1, nomE2, nomE3, nomE4, nomE5, nomE6, frequence){
      $rootScope.mat = matiere
      $rootScope.coursGpe = coursG
      $rootScope.creerGroup = creerTonGroupe
      $rootScope.nbEt = nb
      $rootScope.nom1 = nomE1
      $rootScope.nom2 = nomE2
      $rootScope.nom3 = nomE3
      $rootScope.nom4 = nomE4
      $rootScope.nom5 = nomE5
      $rootScope.nom6 = nomE6
      $rootScope.freq = frequence
      $location.path('/parent/dateHoraireGroupe')
    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);

// Controller pour date/h occasionnel
parent.controller('PDateHoraireOccCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover){

    $scope.goRecap = function(mat, coursGpe, creerGroup, nbEt, nom1, nom2, nom3, nom4, nom5, nom6, freq, heureDebut, dateDebut){

      debutHeure = new Date(heureDebut).toLocaleDateString('fr-FR', {
        hour: 'numeric',
        minute: 'numeric'
      }).split(' ').join(' ');

      debutDate = new Date(dateDebut).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',

      }).split(' ').join(' ');

      $rootScope.matiere = mat
      $rootScope.coursG = coursGpe
      $rootScope.creerTonGroupe = creerGroup
      $rootScope.nb = nbEt
      $rootScope.nomE1 = nom1
      $rootScope.nomE2 = nom2
      $rootScope.nomE3 = nom3
      $rootScope.nomE4 = nom4
      $rootScope.nomE5 = nom5
      $rootScope.nomE6 = nom6
      $rootScope.frequence = freq
      $rootScope.heureDeb = heureDebut
      console.log('debut heure'+ heureDebut)
      $rootScope.dateDeb = debutDate
      console.log('debut date'+ debutDate)
      $location.path('/parent/test')
    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);

// Controller pour recap cours en groupe occasionnel
parent.controller('PTestCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover){

    // Fonction qui envoie le mail
    $rootScope.sendR = function(mail, mat, coursGpe, creerGroup, nbEt, nom1, nom2, nom3, nom4, nom5, nom6, heureDeb, dateDeb, heureDeb1, heureDeb2, heureDeb3, heureDeb4, heureDeb5, heureDeb6,
                                nbJours, jours1, jours2, jours3, jours4, jours5, jours6, frequence) {

      $rootScope.matiere = mat
      $rootScope.coursG = coursGpe
      $rootScope.creerTonGroupe = creerGroup
      $rootScope.nb = nbEt
      $rootScope.nomE1 = nom1
      $rootScope.nomE2 = nom2
      $rootScope.nomE3 = nom3
      $rootScope.nomE4 = nom4
      $rootScope.nomE5 = nom5
      $rootScope.nomE6 = nom6
      $rootScope.debutH = heureDeb
      $rootScope.debutD = dateDeb
      $rootScope.debutH1 = heureDeb1
      $rootScope.debutH2 = heureDeb2
      $rootScope.debutH3 = heureDeb3
      $rootScope.debutH4 = heureDeb4
      $rootScope.debutH5 = heureDeb5
      $rootScope.debutH6 = heureDeb6
      $rootScope.nbJ = nbJours
      $rootScope.jour1 = jours1
      $rootScope.jour2 = jours2
      $rootScope.jour3 = jours3
      $rootScope.jour4 = jours4
      $rootScope.jour5 = jours5
      $rootScope.jour6 = jours6

      debutHeure = new Date(heureDeb).toLocaleDateString('fr-FR', {
        hour: 'numeric',
        minute: 'numeric'
      }).split(' ').join(' ');

      // Email to and from
      mail.to='info@capmission.com'
      mail.from='capmission.com@gmail.com'

      // Envoie de l'objet du mail et de son contenu
      mail.subject= 'MOB - ' + $rootScope.parent.entity.name + ' - CREATION GROUPE. '

      // mail.body = 'Le parent :' + $rootScope.parent.entity.name + 'souhaite créer un groupe.\n Le nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
      //   'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' + $rootScope.nomE6 + '\n' +
      //   'Heure de début du cours :' + $rootScope.debutH + '\nSi cours occasionnel, date souhaitée :' + $rootScope.debutD + '\n' +
      //   'Si plusieurs jours par semaines sont souhaités, nombre de jours :' + $rootScope.boutonRadio + '\n' +
      //   'Jour :' + $rootScope.jour1 + '\n' + $rootScope.jour2 + '\n' + $rootScope.jour3 + '\n' + $rootScope.jour4 + '\n' + $rootScope.jour5 + '\n' + $rootScope.jour6 + '\n' +
      //   'Une remarque éventuelle de la part du parent :' + mail.body

      //cas 3 noms et occ
      if($rootScope.nomE4 == null && $rootScope.nomE5 == null && $rootScope.nomE6 == null && $rootScope.jour1 == null && $rootScope.jour2 == null && $rootScope.jour3 ==null
        && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.boutonRadio == null) {
        mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
          'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' +
          'Heure de début du cours :' + moment(heureDeb).format('HH:mm') + '\nSi cours occasionnel, date souhaitée :' + $rootScope.debutD + '\n' +
          'Une remarque éventuelle de la part du parent :' + mail.body
      }else{
        //cas 4 noms et occ
        if($rootScope.nomE5 == null && $rootScope.nomE6 == null && $rootScope.jour1 == null && $rootScope.jour2 == null && $rootScope.jour3 ==null
          && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.boutonRadio == null) {
          mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
            'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' +
            'Heure de début du cours :' + moment(heureDeb).format('HH:mm') + '\nSi cours occasionnel, date souhaitée :' + $rootScope.debutD + '\n' +
            'Une remarque éventuelle de la part du parent :' + mail.body
        }else{
          //cas 5 noms et occ
          if($rootScope.nomE6 == null && $rootScope.jour1 == null && $rootScope.jour2 == null && $rootScope.jour3 ==null
            && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.boutonRadio == null) {
            mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
              'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' +
              'Heure de début du cours :' + moment(heureDeb).format('HH:mm') + '\nSi cours occasionnel, date souhaitée :' + $rootScope.debutD + '\n' +
              'Une remarque éventuelle de la part du parent :' + mail.body
          }else{
            //cas 6 noms et occ
            if($rootScope.jour1 == null && $rootScope.jour2 == null && $rootScope.jour3 ==null
              && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.boutonRadio == null) {
              mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\n Le nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' + $rootScope.nomE6 + '\n' +
                'Heure de début du cours :' + moment(heureDeb).format('HH:mm') + '\nSi cours occasionnel, date souhaitée :' + $rootScope.debutD + '\n' +
                'Une remarque éventuelle de la part du parent :' + mail.body
            }else{
              //cas 3 noms et 2 jours
              if($rootScope.jour3 == null && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null
                && $rootScope.nomE4 == null && $rootScope.nomE5 == null && $rootScope.nomE6 == null) {
                mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                  'Les étudiants sont :\n' + $rootScope.nomE1 + ' - ' + $rootScope.nomE2 + ' - ' + $rootScope.nomE3 + '\n' +
                  'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment(heureDeb1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' +moment(heureDeb2).format('HH:mm')+
                  '\nJours du 1er cours : ' +$rootScope.jour2+ '\n' +
                  'Une remarque éventuelle de la part du parent :' + mail.body

              }else{
                //cas 4 noms et 2 jours
                if($rootScope.nomE5 == null && $rootScope.nomE6 == null && $rootScope.jour3 ==null
                  && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                  mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                    'Les étudiants sont :\n' + $rootScope.nomE1 + ' - ' + $rootScope.nomE2 + ' - ' + $rootScope.nomE3 + ' - ' + $rootScope.nomE4 + '\n' +
                    'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH1).format('HH:mm')+
                    '\nJours du 1er cours : ' +$rootScope.jour2+ '\n' +
                    'Une remarque éventuelle de la part du parent :' + mail.body
                }else{
                  //cas 4 noms et 2 jours
                  if($rootScope.nomE5 == null && $rootScope.nomE6 == null && $rootScope.jour3 ==null
                    && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                    mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                      'Les étudiants sont :\n' + $rootScope.nomE1 + ' - ' + $rootScope.nomE2 + ' - ' + $rootScope.nomE3 + ' - ' + $rootScope.nomE4 + '\n' +
                      'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                      '\nJours du 1er cours : ' +$rootScope.jour2+ '\n' +
                      'Une remarque éventuelle de la part du parent :' + mail.body
                  }else{
                    //cas 5 noms et 2 jours
                    if($rootScope.nomE6 == null && $rootScope.jour3 ==null
                      && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                      mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                        'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' +
                        'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                        '\nJours du 2ème cours : ' +$rootScope.jour2+ '\n' +
                        'Une remarque éventuelle de la part du parent :' + mail.body
                    }else{
                      //cas 6 noms et 2 jours
                      if($rootScope.jour3 ==null
                        && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                        mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\n Le nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                          'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' + $rootScope.nomE6 + '\n' +
                          'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                          '\nJours du 2ème cours : ' +$rootScope.jour2+ '\n' +
                          'Une remarque éventuelle de la part du parent :' + mail.body
                      }else{
                        //cas 3 noms et 3 jours
                        if($rootScope.nomE4 == null && $rootScope.nomE5 == null && $rootScope.nomE6 == null
                          && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                          mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                            'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' +
                            'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                            '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+ '\n' +
                            'Une remarque éventuelle de la part du parent :' + mail.body
                        }else{
                          //cas 4 noms et 3 jours
                          if($rootScope.nomE5 == null && $rootScope.nomE6 == null
                            && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                            mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                              'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' +
                              'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                              '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+ '\n' +
                              'Une remarque éventuelle de la part du parent :' + mail.body
                          }else{
                            //cas 5 noms et 3 jours
                            if($rootScope.nomE6 == null
                              && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                              mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' +
                                'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+ '\n' +
                                'Une remarque éventuelle de la part du parent :' + mail.body
                            }else{
                              //cas 6 noms et 3 jours
                              if($rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                  'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' + $rootScope.nomE6 + '\n' +
                                  'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                  '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+ '\n' +
                                  'Une remarque éventuelle de la part du parent :' + mail.body
                              }else{
                                //cas 3 noms et 4 jours
                                if($rootScope.nomE4 == null && $rootScope.nomE5 == null && $rootScope.nomE6 == null &&
                                  $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                  mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                    'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' +
                                    'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH1).format('HH:mm')+
                                    '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+ '\n' +
                                    '\nJours du 4ème cours : ' +$rootScope.jour4+  '\nHeure du 4ème cours : ' +moment($rootScope.debutH4).format('HH:mm') + '\n'
                                  'Une remarque éventuelle de la part du parent :' + mail.body

                                }else{
                                  //cas 4 noms et 4 jours
                                  if($rootScope.nomE5 == null && $rootScope.nomE6 == null &&
                                    $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                    mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                      'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' +
                                      'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                      '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+ '\n' +
                                      '\nJours du 4ème cours : ' +$rootScope.jour4 + '\nHeure du 4ème cours : ' +moment($rootScope.debutH4).format('HH:mm') + '\n'
                                    'Une remarque éventuelle de la part du parent :' + mail.body
                                  }else{
                                    //cas 5 noms et 4 jours
                                    if($rootScope.nomE6 == null &&
                                      $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                      mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                        'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' +
                                        'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                        '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+ '\n' +
                                        '\nJours du 4ème cours : ' +$rootScope.jour4 + '\nHeure du 4ème cours : ' +moment($rootScope.debutH4).format('HH:mm') + '\n'
                                      'Une remarque éventuelle de la part du parent :' + mail.body
                                    }else{
                                      //cas 6 noms et 4 jours
                                      if($rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                        mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                          'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' + $rootScope.nomE6 + '\n' +
                                          'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                          '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+
                                          '\nJours du 4ème cours : ' +$rootScope.jour4+ '\nHeure du 4ème cours : ' +moment($rootScope.debutH4).format('HH:mm') + '\n'
                                        'Une remarque éventuelle de la part du parent :' + mail.body
                                      }else{
                                        //cas 3 noms et 5 jours
                                        if($rootScope.nomE4 == null && $rootScope.nomE5 == null && $rootScope.nomE6 == null &&
                                          $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                          mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                            'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' +
                                            'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                            '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+
                                            '\nJours du 4ème cours : ' +$rootScope.jour4 + '\nHeure du 4ème cours : ' +moment($rootScope.debutH4).format('HH:mm') +
                                            '\nJours du 5ème cours : ' +$rootScope.jour5 + '\nHeure du 5ème cours : ' +moment($rootScope.debutH5).format('HH:mm') + '\n'
                                          'Une remarque éventuelle de la part du parent :' + mail.body
                                        }else{
                                          //cas 4 noms et 5 jours
                                          if($rootScope.nomE5 == null && $rootScope.nomE6 == null &&
                                            $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                            mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                              'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' +
                                              'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                              '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+
                                              '\nJours du 4ème cours : ' +$rootScope.jour4 + '\nHeure du 4ème cours : ' +moment($rootScope.debutH4).format('HH:mm') +
                                              '\nJours du 5ème cours : ' +$rootScope.jour5 + '\nHeure du 5ème cours : ' +moment($rootScope.debutH5).format('HH:mm') + '\n'
                                            'Une remarque éventuelle de la part du parent :' + mail.body
                                          }else{
                                            //cas 5 noms et 5 jours
                                            if($rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                              mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                                'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n'
                                              'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                              '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+
                                              '\nJours du 4ème cours : ' +$rootScope.jour4 + '\nHeure du 4ème cours : ' +moment($rootScope.debutH4).format('HH:mm') +
                                              '\nJours du 5ème cours : ' +$rootScope.jour5 + '\nHeure du 5ème cours : ' +moment($rootScope.debutH5).format('HH:mm') + '\n'
                                              'Une remarque éventuelle de la part du parent :' + mail.body
                                            }else{
                                              //cas 6 noms et 5 jours
                                              if($rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                                mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                                  'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' + $rootScope.nomE6 + '\n'
                                                'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                                '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+
                                                '\nJours du 4ème cours : ' +$rootScope.jour4 + '\nHeure du 4ème cours : ' +moment($rootScope.debutH4).format('HH:mm') +
                                                '\nJours du 5ème cours : ' +$rootScope.jour5 + '\nHeure du 5ème cours : ' +moment($rootScope.debutH5).format('HH:mm') + '\n'
                                                'Une remarque éventuelle de la part du parent :' + mail.body
                                              }else{
                                                //cas 3 noms et 6 jours
                                                if($rootScope.nomE4 == null && $rootScope.nomE5 == null && $rootScope.nomE6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                                  mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                                    'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' +
                                                    'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                                    '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+
                                                    '\nJours du 4ème cours : ' +$rootScope.jour4 + '\nHeure du 4ème cours : ' +moment($rootScope.debutH4).format('HH:mm') +
                                                    '\nJours du 5ème cours : ' +$rootScope.jour5 + '\nHeure du 5ème cours : ' +moment($rootScope.debutH5).format('HH:mm') +
                                                    '\nJours du 6ème cours : ' +$rootScope.jour6 + '\nHeure du 6ème cours : ' +moment($rootScope.debutH6).format('HH:mm') + '\n'
                                                  'Une remarque éventuelle de la part du parent :' + mail.body
                                                }else{
                                                  //cas 4 noms et 6 jours
                                                  if($rootScope.nomE5 == null && $rootScope.nomE6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                                    mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                                      'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' +
                                                      'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                                      '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+
                                                      '\nJours du 4ème cours : ' +$rootScope.jour4 + '\nHeure du 4ème cours : ' +moment($rootScope.debutH4).format('HH:mm') +
                                                      '\nJours du 5ème cours : ' +$rootScope.jour5 + '\nHeure du 5ème cours : ' +moment($rootScope.debutH5).format('HH:mm') +
                                                      '\nJours du 6ème cours : ' +$rootScope.jour6 + '\nHeure du 6ème cours : ' +moment($rootScope.debutH6).format('HH:mm') + '\n'
                                                    'Une remarque éventuelle de la part du parent :' + mail.body
                                                  }else{
                                                    //cas 5 noms et 6 jours
                                                    if($rootScope.nomE6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                                      mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                                        'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' +
                                                        'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                                        '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+
                                                        '\nJours du 4ème cours : ' +$rootScope.jour4 + '\nHeure du 4ème cours : ' +moment($rootScope.debutH4).format('HH:mm') +
                                                        '\nJours du 5ème cours : ' +$rootScope.jour5 + '\nHeure du 5ème cours : ' +moment($rootScope.debutH5).format('HH:mm') +
                                                        '\nJours du 6ème cours : ' +$rootScope.jour6 + '\nHeure du 6ème cours : ' +moment($rootScope.debutH6).format('HH:mm') + '\n'
                                                      'Une remarque éventuelle de la part du parent :' + mail.body
                                                    }else{
                                                      //cas 6 noms et 6 jours
                                                      if($rootScope.debutH == null && $rootScope.debutD == null) {
                                                        mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                                          'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' + $rootScope.nomE6 + '\n' +
                                                          'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                                          '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+
                                                          '\nJours du 4ème cours : ' +$rootScope.jour4 + '\nHeure du 4ème cours : ' +moment($rootScope.debutH4).format('HH:mm') +
                                                          '\nJours du 5ème cours : ' +$rootScope.jour5 + '\nHeure du 5ème cours : ' +moment($rootScope.debutH5).format('HH:mm') +
                                                          '\nJours du 6ème cours : ' +$rootScope.jour6 + '\nHeure du 6ème cours : ' +moment($rootScope.debutH6).format('HH:mm') + '\n'
                                                        'Une remarque éventuelle de la part du parent :' + mail.body
                                                      }else{

                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      console.log('matiere :' +$rootScope.matiere)
      console.log('eleve1 :' +$rootScope.nomE1)
      console.log('eleve2 :' +$rootScope.nomE2)
      console.log('eleve3 :' +$rootScope.nomE3)
      console.log('eleve4 :' +$rootScope.nomE4)
      console.log('eleve5 :' +$rootScope.nomE5)
      console.log('eleve6 :' +$rootScope.nomE6)
      console.log('nb jours :' +nbJours)
      console.log('jour1 :' +$rootScope.jour1)
      console.log('jour2 :' +$rootScope.jour2)
      console.log('jour3 :' +$rootScope.jour3)
      console.log('jour4 :' +$rootScope.jour4)
      console.log('jour5 :' +$rootScope.jour5)
      console.log('jour6 :' +$rootScope.jour6)
      console.log('heure1 :' +$rootScope.debutH1)
      console.log('heure2 :' +$rootScope.debutH2)
      console.log('heure3 :' +$rootScope.debutH3)
      console.log('heure4 :' +$rootScope.debutH4)
      console.log('heure5 :' +$rootScope.debutH5)
      console.log('heure6 :' +$rootScope.debutH6)
      console.log('to: '+mail.to)
      console.log('from: '+mail.from)
      console.log('subject: '+mail.subject)
      console.log('body: '+mail.body)

      $ionicLoading.show({
        template: "En cours d'envoi !",
      });
      $http.post('http://51.255.195.19:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
        toastr.success('Votre message a été envoyée avec succès')
        $ionicLoading.hide()
        $location.path('/role')
        //$ionicHistory.goBack();
      }).error(function (data, status) {
        if (status == 0) {
          $ionicLoading.hide()
          toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Veuillez nous excuser !', {displayDuration: 1000});
          navigator.app.exitApp();
        }
        else {
          toastr.error("Echec envoi de message ! Réessayez plus tart !")
          $ionicLoading.hide()
        }
      });

    }


    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);

// Controller pour changer le mot de passe
parent.controller('ChangerMdpCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover){



    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);




/*// Controller pour changer le mot de passe
parent.controller('ChangerMdpCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover','$ionicHistory',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover,$ionicHistory){



    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);*/

// Controller pour les parametres
parent.controller('ParametresCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover','$ionicHistory',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover,$ionicHistory){

    //Méthode pour le popup modifier son login
    $scope.modifLogin = function () {
      $scope.data = {};
      $scope.user = {}

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<form name="MyForm" ><input type="hidden" name = "oldLogin" ng-model="data.oldLogin" ng-init="data.oldLogin = resp.entity.login">' +
          '<input type="hidden" ng-model="user.id" ng-init="user.id = resp.entity.id">'+
        '<input type="hidden" ng-model="user.password" ng-init="user.password = resp.entity.password">'+
        '<input type="text" name = "oldLogin2" placeholder="Ancien Login" ng-model="data.oldLogin2" ng-pattern="data.oldLogin" ><br>' +
        '<input type="text" placeholder="Nouveau Login" name="newLogin" ng-model="user.newLogin"><br>' +
        '<input type="text" placeholder="Confirmer votre Login" name="confLogin" ng-model="data.confLogin" ng-pattern="user.newLogin">'+
        '<p ng-if="showError" class="errror">Champs obligatoires</p>'+
        '<p ng-if="showError1" class="errror"></p>'+
        '<div ng-show="MyForm.oldLogin2.$error.pattern" style="color: red">*Ancien login incorrect !</div>'+
        '<div ng-show="MyForm.confLogin.$error.pattern" style="color: red">*Logins non correspondants ! </div>',
        title: 'Modifier votre Login',
        subTitle: 'Pensez à utilisez un Login simple à retenir',
        scope: $scope,
        buttons: [
          { text: '<b>Annuler</b>',
            type: 'buttonEmp3',},
          {
            text: '<b>Modifier</b>',
            type: 'buttonEmp2',
            onTap: function(e) {
              if (!$scope.data.oldLogin2 || !$scope.user.newLogin || !$scope.data.confLogin) {
                e.preventDefault();
                $scope.showError = true;
                if($scope.user.newLogin != $scope.data.confLogin) {
                  e.preventDefault();
                  $scope.showError1 = true;
                }
              }
              else{

                console.log('id : '+$scope.user.id)
                console.log('login : '+$scope.user.newLogin)
                console.log('password : '+$scope.user.password)
                var user = {
                  id: $scope.user.id,
                  login: $scope.user.newLogin,
                  password: $scope.user.password
                };
                $ionicLoading.show({
                  template: "En cours !",
                  duration: 1500
                });
                $http.put('http://51.255.195.19:8182/CapMissionApp/users/update/' + $scope.user.id, JSON.stringify(user), {timeout: 30000}).success(function (data, status, headers, config) {
                  $scope.updateData = data
                  toastr.success('Votre login a été changé avec succès !', {displayDuration: 1000});
                  console.log('new login : ' + $scope.updateData.entity.login)
                  localStorage.removeItem("id")
                  localStorage.removeItem("login")
                  localStorage.removeItem("password")
                  localStorage.removeItem("status")
                  $location.path('/login')

                }).error(function (data, status) {

                    toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
                    navigator.app.exitApp();


                });

              }
            }
          }
        ]
      });

      myPopup.then(function(res) {
        console.log('Tapped!', res);
        $scope.showError = false;
        $scope.showError1 = false;
      });
    };

    //Méthode pour modifier le mot de passe
    $scope.modifMdp = function () {
      $scope.data = {};
      $scope.user = {}

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<form name="MyForm" ><input type="hidden" name = "oldPwd" placeholder="Ancien mot de passe" ng-model="data.oldPwd" ng-init="data.oldPwd = resp.entity.password">' +
        '<input type="password" name = "oldPwd2" placeholder="Ancien mot de passe" ng-model="data.oldPwd2" ng-pattern="data.oldPwd" required="required"><br>' +
        '<input type="hidden" ng-model="user.id" ng-init="user.id = resp.entity.id">'+
        '<input type="hidden" ng-model="user.login" ng-init="user.login = resp.entity.login">'+
        '<input type="password" name="oldLogin" placeholder="Nouveau mot de passe" ng-model="user.oldLogin"><br>' +
        '<input type="password" name="confLogin" placeholder="Confirmer votre Mot de Passe" ng-model="data.confLogin" ng-pattern="user.oldLogin"></form>' +
        '<p ng-if="showError" class="errror">Champs obligatoires</p>'+
        '<p ng-if="showError1" class="errror"></p>'+
        '<div ng-show="MyForm.oldPwd2.$error.pattern" style="color: red">*Ancien mot de passe incorrect !</div>'+
        '<div ng-show="MyForm.confLogin.$error.pattern" style="color: red">*Mots de passe non correspondants ! </div>',
        title: 'Modifier votre Mot de Passe',
        scope: $scope,
        buttons: [
          { text: '<b>Annuler</b>',
            type: 'buttonEmp3',},
          {
            text: '<b>Modifier</b>',
            type: 'buttonEmp2',
            onTap: function(e) {
              if (!$scope.data.oldPwd2 || !$scope.user.oldLogin || !$scope.data.confLogin) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
                $scope.showError = true;
                if($scope.user.oldLogin != $scope.data.confLogin){
                  e.preventDefault();
                  $scope.showError1 = true;
                }

              } else {
                console.log('id : '+$scope.user.id)
                console.log('password : '+$scope.user.oldLogin)
                console.log('login : '+$scope.user.login)
                var user = {
                  id: $scope.user.id,
                  login: $scope.user.login,
                  password: $scope.user.oldLogin
                };
                $ionicLoading.show({
                  template: "En cours !",
                  duration: 1500
                });
                $http.put('http://51.255.195.19:8182/CapMissionApp/users/update/' + $scope.user.id, JSON.stringify(user), {timeout: 30000}).success(function (data, status, headers, config) {
                  $scope.updateData = data
                  toastr.success('Votre mot de passe a été changé avec succès !', {displayDuration: 1000});
                  console.log('new password : ' + $scope.updateData.entity.password)
                  localStorage.removeItem("id")
                  localStorage.removeItem("login")
                  localStorage.removeItem("password")
                  localStorage.removeItem("status")
                  $location.path('/login')

                }).error(function (data, status) {

                  toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
                  navigator.app.exitApp();


                });

              }
            }
          }
        ]
      });

      myPopup.then(function(res) {
        console.log('Tapped!', res);
        $scope.showError = false;
        $scope.showError1 = false;
      });
    };


    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);
