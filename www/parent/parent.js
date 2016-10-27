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

parent.controller('ParentCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover','URL_API', function ($scope, $rootScope, $http, $location, $ionicPopover,URL_API) {

  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });

}]);

parent.controller('ProposCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory','$ionicLoading','URL_API', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory, $ionicLoading,URL_API) {

  $rootScope.testNum = function(){
    var nbrEnf = 0
    if ($rootScope.parent.entity.students.length == '1') {

     nbrEnf = 1
      return nbrEnf
    } else {
      // Dans le cas où l'étudiant est aussi parent
      if ($rootScope.parent.entity.students.length == '2') {

        console.log($rootScope.parent.entity.name)
        console.log(' propos Le nombre des enfants est :' + $rootScope.parent.entity.students.length)
        // On fait un for pour parcourir l'arrayList (car c'est une liste d'étudiants)
        for (index = 0; index < 2; ++index) {

          $rootScope.name = $rootScope.parent.entity.students[index].name

        }

        console.log($rootScope.name)

        if ($rootScope.name == $rootScope.parent.entity.name) {
          nbrEnf = 3
          return nbrEnf

        } else {
          nbrEnf = 2
          return nbrEnf
        }

      } else {
        nbrEnf = 4
        return nbrEnf
      }
    }

  }
  $rootScope.goChoix = function(){
  if ($rootScope.parent.entity.students.length == '1') {

    console.log('propos Le nombre des enfants est :' + $rootScope.parent.entity.students.length)

    // On fait un for pour parcourir l'arrayList (car c'est une liste d'étudiants)
    for (index = 0; index < $rootScope.parent.entity.students.length; ++index) {
      if (index + 1 == $rootScope.parent.entity.students.length) {
        id = $rootScope.parent.entity.students[index].id
        console.log(id)
      }
    }

    // Connexion au serveur pour récupérer les données Etudiant
    $http.get(URL_API+'/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {

      $rootScope.son = data
      window.localStorage.setItem("son", JSON.stringify(data));
      $ionicLoading.hide();
      console.log('value : ' + window.localStorage.getItem('login'))
      // Redirige vers la page de l'emploi directement
      $location.path('/parent/emploiEnfant');

    }).error(function (data) {
      if(window.localStorage.getItem("son") !== undefined) {
        $rootScope.son = JSON.parse(window.localStorage.getItem("son"));
        $ionicLoading.hide();
        $location.path('/parent/emploiEnfant');
      }
      else {
        toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
        navigator.app.exitApp();
      }
      //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
      /*toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
      navigator.app.exitApp();*/
    })
  } else {
    // Dans le cas où l'étudiant est aussi parent
    if ($rootScope.parent.entity.students.length == '2') {

      console.log($rootScope.parent.entity.name)
      console.log(' propos Le nombre des enfants est :' + $rootScope.parent.entity.students.length)
      // On fait un for pour parcourir l'arrayList (car c'est une liste d'étudiants)
      for (index = 0; index < 2; ++index) {
        /*$rootScope.variable = $rootScope.parent
         $rootScope.variableA = $rootScope.variable.lastIndexOf(name);*/
        $rootScope.name = $rootScope.parent.entity.students[index].name
        //$rootScope.nbreEnf = '1'
      }

      console.log($rootScope.name)

      if ($rootScope.name == $rootScope.parent.entity.name) {

        for (index = 0; index < 1; ++index) {
          id = $rootScope.parent.entity.students[index].id
          console.log(id)
        }

        $http.get(URL_API+'/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {

          $rootScope.son = data
          window.localStorage.setItem("son", JSON.stringify(data));
          $ionicLoading.hide();
          console.log('value : ' + window.localStorage.getItem('login'))
          $location.path('/parent/emploiEnfant');

        }).error(function (data) {
          if(window.localStorage.getItem("son") !== undefined) {
            $rootScope.son = JSON.parse(window.localStorage.getItem("son"));
            $ionicLoading.hide();
            $location.path('/parent/emploiEnfant');
          }
          else {
            toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
            navigator.app.exitApp();
          }
          //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
          /*toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
          navigator.app.exitApp();*/
        })
      } else {
        $location.path('/choix');
      }

      //console.log('function number '+ $rootScope.nbreEnf)
    } else {
      $location.path('/choix');
    }
  }
}
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

parent.controller('EnfantCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', '$ionicLoading', '$ionicPopup', '$q','URL_API','$localStorage', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory, $ionicLoading, $ionicPopup, $q,URL_API, $localStorage) {
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
    $http.get(URL_API+'/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {
      //$scope.items = []

      //var son = JSON.stringify(data);
      //localStorage.setItem('son', son);
      $rootScope.son = data
      window.localStorage.setItem("son", JSON.stringify(data));

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
     /* toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
      navigator.app.exitApp();*/
      if(window.localStorage.getItem("son") !== undefined) {
        $rootScope.son = JSON.parse(window.localStorage.getItem("son"));
        $ionicLoading.hide();
        $location.path('/parent/emploiEnfant');
      }
      else {
        toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
        navigator.app.exitApp();
      }

    })

  }

  $scope.goBack = function () {
    $ionicHistory.goBack();
  }

}]);

parent.controller('PprofileCtrl', ['$scope', '$ionicPopover', '$ionicHistory', '$rootScope', '$http','$ionicModal','$ionicLoading','URL_API', function ($scope, $ionicPopover, $ionicHistory, $rootScope, $http,$ionicModal,$ionicLoading,URL_API) {
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
    $http.post(URL_API+'/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
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
    $http.post(URL_API+'/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
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
    $http.post(URL_API+'/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
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
    $http.post(URL_API+'/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
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

parent.controller('PsoldeCtrl', ['$scope', '$rootScope', '$ionicModal', '$http', '$ionicPopover', '$ionicHistory', '$location', '$ionicLoading', '$ionicPopup','URL_API', function ($scope, $rootScope, $ionicModal, $http, $ionicPopover, $ionicHistory, $location, $ionicLoading, $ionicPopup,URL_API) {
  $scope.IsVisible = false;
  $scope.ShowHide = function () {
    //If DIV is visible it will be hidden and vice versa.
    $scope.IsVisible = $scope.IsVisible ? false : true;
  }

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function (popover) {
    $scope.popover = popover;
  });
  /*$ionicPopover.fromTemplateUrl('templates/popover2.html', {
    scope: $scope,
  }).then(function (popover) {
    $scope.popover2 = popover;
  });*/
  $scope.getd = function (id) {
    console.log("id function getd : " + id)
    $ionicLoading.show({
      template: 'Chargement'
    });
    $http.get(URL_API+'/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {
      //$scope.items = []
      $rootScope.sonSolde = data
      window.localStorage.setItem("sonSolde", JSON.stringify(data));
      $ionicLoading.hide();
      $location.path('/parent/solde');
    }).error(function (data) {
      if(window.localStorage.getItem("sonSolde") !== undefined) {
        $rootScope.sonSolde = JSON.parse(window.localStorage.getItem("sonSolde"));
        $ionicLoading.hide();
        $location.path('/parent/solde');
      }
      else {
        toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
        navigator.app.exitApp();
      }
      //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
     /* toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
      navigator.app.exitApp();*/

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
    $http.post(URL_API+'/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
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
    $scope.limit += 10;
  }
  $scope.showLess = function () {
    $scope.limit -= 5;
  }
  /*$scope.showAlert = function () {

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
  };*/


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

parent.controller('ChoixsoldeCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', '$ionicLoading','URL_API', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory, $ionicLoading,URL_API) {
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
      $http.get(URL_API+'/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {

        $rootScope.sonSolde = data
        window.localStorage.setItem("sonSolde1", JSON.stringify(data));
        $ionicLoading.hide()
        // Redirige vers la page de l'emploi directement
        $location.path('/parent/solde');

      }).error(function (data) {
        if(window.localStorage.getItem("sonSolde1") !== undefined) {
          $rootScope.sonSolde = JSON.parse(window.localStorage.getItem("sonSolde1"));
          $ionicLoading.hide();
          $location.path('/parent/solde');
        }
        else {
          toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
          navigator.app.exitApp();
        }
        //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
        /*toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
        navigator.app.exitApp();*/
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
        $http.get(URL_API+'/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {

          $rootScope.sonSolde = data
          window.localStorage.setItem("sonSolde1", JSON.stringify(data));
          $ionicLoading.hide()
          $location.path('/parent/solde');

        }).error(function (data) {
          if(window.localStorage.getItem("sonSolde1") !== undefined) {
            $rootScope.sonSolde = JSON.parse(window.localStorage.getItem("sonSolde1"));
            $ionicLoading.hide();
            $location.path('/parent/solde');
          }
          else {
            toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
            navigator.app.exitApp();
          }
          //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
         /* toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
          navigator.app.exitApp();*/
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
parent.controller("PEmailController", ['$scope', '$ionicPopup', '$rootScope', '$ionicModal', '$http', '$ionicLoading','URL_API',
  function ($scope, $ionicPopup, $rootScope, $ionicModal, $http, $ionicLoading,URL_API) {
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
      $http.post(URL_API+'/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {

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
parent.controller("PDemandeInfoEmailController", ['$scope', '$ionicPopup', '$rootScope', '$ionicModal', '$http', '$ionicLoading', '$location', '$ionicPopover','URL_API',
  function ($scope, $ionicPopup, $rootScope, $ionicModal, $http, $ionicLoading, $location, $ionicPopover,URL_API) {
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
      $http.post(URL_API+'/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
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


  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

// Controller choix matière
parent.controller('PChoixMatiereCtrl', ['$scope','$rootScope', '$ionicPopover','$http','$ionicLoading','$location', function ($scope,$rootScope, $ionicPopover,$http,$ionicLoading,$location) {


  $scope.goPage= function(matiere, niveauN){
    $rootScope.mat = matiere
    $rootScope.niv = niveauN
    console.log(matiere)
    $location.path('/parent/choixTypeCours')
  }
}]);

// Controller page choix enfant à matière
parent.controller('PAjoutCoursChoixCtrl', ['$scope', '$rootScope', '$ionicPopover', '$location', '$ionicHistory', '$ionicLoading', '$http','URL_API', function ($scope, $rootScope, $ionicPopover, $location, $ionicHistory, $ionicLoading, $http,URL_API) {
  console.log('On est dans le controller PAjoutCoursChoixCtrl')
  $scope.goChoixMatiere = function(id){
    $rootScope.test = id
    $ionicLoading.show({
      template: "Chargement !",
    });
    $http.get(URL_API+'/students/' + id, {timeout: 35000}).success(function (data) {
      $rootScope.eleve = data
      window.localStorage.setItem("eleve", JSON.stringify(data));
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
    }).error(function (data) {
      if(window.localStorage.getItem("eleve") !== undefined) {
        $rootScope.eleve = JSON.parse(window.localStorage.getItem("eleve"));
        $ionicLoading.hide();
        $location.path('/parent/choixMatiere');
      }
      else {
        toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
        navigator.app.exitApp();
      }
      //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
      /* toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
       navigator.app.exitApp();*/
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
parent.controller('ChoixAjoutCoursCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', '$ionicLoading','URL_API',
  function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory, $ionicLoading,URL_API) {
    $scope.get = function (id) {
      if ($rootScope.parent.entity.students.length == '1') {
        console.log('Le nombre  :' + $rootScope.parent.entity.students.length)
        $http.get(URL_API+'/students/' + id, {timeout: 35000}).success(function (data) {
          $rootScope.eleve = data
          window.localStorage.setItem("eleve", JSON.stringify(data));
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
          if(window.localStorage.getItem("eleve") !== undefined) {
            $rootScope.eleve = JSON.parse(window.localStorage.getItem("eleve"));
            $ionicLoading.hide();
            $location.path('/parent/choixMatiere');
          }
          else {
            toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
            navigator.app.exitApp();
          }
          //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
          /*toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
          navigator.app.exitApp();*/
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
          $http.get(URL_API+'/students/' + id, {timeout: 35000}).success(function (data) {
            $rootScope.eleve = data
            window.localStorage.setItem("eleve", JSON.stringify(data));
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
            if(window.localStorage.getItem("eleve") !== undefined) {
              $rootScope.eleve = JSON.parse(window.localStorage.getItem("eleve"));
              $ionicLoading.hide();
              $location.path('/parent/choixMatiere');
            }
            else {
              toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
              navigator.app.exitApp();
            }
            //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
            /*toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
            navigator.app.exitApp();*/
          })
        }
        else if (name != $rootScope.parent.entity.name) {
          $rootScope.test = id
          console.log('id enfant :' +$rootScope.test)
          $http.get(URL_API+'/students/' + id, {timeout: 35000}).success(function (data) {
            $rootScope.eleve = data
            window.localStorage.setItem("eleve", JSON.stringify(data));
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
          }).error(function (data) {
            if(window.localStorage.getItem("eleve") !== undefined) {
              $rootScope.eleve = JSON.parse(window.localStorage.getItem("eleve"));
              $ionicLoading.hide();
              $location.path('/parent/choixAjoutCours');
            }
            else {
              toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
              navigator.app.exitApp();
            }
            //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
            /*toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
             navigator.app.exitApp();*/
          })
        }
      }
      else if ($rootScope.parent.entity.students.length >= "2") {
        $http.get(URL_API+'/students/' + id, {timeout: 35000}).success(function (data) {
          console.log('id enfant :' +id)
          $rootScope.eleve = data
          window.localStorage.setItem("eleve", JSON.stringify(data));
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
        }).error(function (data) {
          if(window.localStorage.getItem("eleve") !== undefined) {
            $rootScope.eleve = JSON.parse(window.localStorage.getItem("eleve"));
            $ionicLoading.hide();
            $location.path('/parent/choixAjoutCours');
          }
          else {
            toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
            navigator.app.exitApp();
          }
          //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
          /*toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
           navigator.app.exitApp();*/
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
parent.controller('PChoixTypeCours', ['$scope', '$rootScope', '$ionicPopover', '$location', '$ionicHistory', '$ionicLoading', '$http','URL_API',
  function ($scope, $rootScope, $ionicPopover, $location, $ionicHistory, $ionicLoading, $http,URL_API) {

    $http.get('parent/prixP.json', {timeout: 35000}).success(function (data) {
      $rootScope.prixC = data



    }).error(function (data) {
      $ionicLoading.hide()
      toastr.error('ECHEC', {displayDuration: 1000});
    });

    // $rootScope.matiere = $rootSope.mat
    // console.log('matiere :' +$rootScope.matiere)

    $scope.coursAideDevoirs = function (mat, niv, coursGpe) {
      $rootScope.matiere = mat
      $rootScope.niveauN = niv
      $rootScope.coursG = coursGpe
      $location.path('/parent/recapCoursGroupe')
    }

    $scope.coursPart = function (mat, niv, coursGpe, coursParti, frequence) {
      $rootScope.matiere = mat
      $rootScope.niveauN = niv
      $rootScope.coursG = coursGpe
      $rootScope.coursPar = coursParti
      $rootScope.freq =  frequence
      $location.path('/parent/coursParticulier')
    }

    $scope.goCoursRegulier = function(mat, niv, coursGpe, coursParti, freq2){
      $rootScope.matiere = mat
      $rootScope.niveauN = niv
      $rootScope.coursG = coursGpe
      $rootScope.coursPar = coursParti
      $rootScope.freq = freq2
      $location.path('/parent/dateHoraireGroupe')
    }

    $scope.goCoursOcc = function(mat, niv, coursGpe, coursParti, freq1){
      $rootScope.matiere = mat
      $rootScope.niveauN = niv
      $rootScope.coursG = coursGpe
      $rootScope.coursPar = coursParti
      $rootScope.freq = freq1
      $location.path('/parent/dateHoraireOcc')
    }

    $scope.stageI1 = function (mat, niv, stageint1, vacs) {
      $rootScope.matiere = mat
      $rootScope.niveauN = niv
      $rootScope.stageIntens = stageint1
      $rootScope.vacances = vacs
      $location.path('/parent/recapStageIntensif')
    }
    $scope.stageI2 = function (mat, niv, stageint2, vac) {
      $rootScope.matiere = mat
      $rootScope.niveauN = niv
      $rootScope.stageIntens = stageint2
      $rootScope.vacances = vac
      $location.path('/parent/recapStageIntensif')
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
parent.controller('PCoursParticulierCtrl', ['$scope', '$ionicPopup', '$rootScope', '$ionicModal', '$http', '$ionicLoading','$location','$ionicPopover','URL_API',
  function($scope,$ionicPopup,$rootScope,$ionicModal,$http,$ionicLoading,$location,$ionicPopover,URL_API){

    // Fonction qui envoie le mail
    $rootScope.sendC = function(mail, coursPar, matiere) {

      // Email to and from
      mail.to='info@capmission.com'
      mail.from='capmission.com@gmail.com'

      // Envoie de l'objet du mail et de son contenu
      mail.subject= 'MOB - ' + $rootScope.parent.entity.name + ' - AJOUT COURS PART. '
      mail.body= matiere+  '\n' +mail.body

      console.log('to: '+mail.to)
      console.log('from: '+mail.from)
      console.log('subject: '+mail.subject)
      console.log('body: '+mail.body)

      $ionicLoading.show({
        template: "En cours d'envoi !",
        duration: 1500
      });
      $http.post(URL_API+'/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
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
parent.controller('PCoursGroupCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover','URL_API',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover,URL_API){

    $scope.goAutre = function(matiere, niv, coursG, autre){
      $rootScope.mat = matiere
      $rootScope.niveauN = niv
      $rootScope.coursGpe = coursG
      $rootScope.autres = autre
      $location.path('/parent/coursGroupAutre')
    }

    $scope.creerTonGroup = function(matiere, niv, coursG, creerGroupe){
      $rootScope.mat = matiere
      $rootScope.niveauN = niv
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
parent.controller('PCoursGroupAutreCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover','URL_API',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover,URL_API){

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
      $http.post(URL_API+'/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
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

// Controller pour cours en groupe date et heure pour cours multiple
parent.controller('PDateHoraireGroupeCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover','URL_API',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover,URL_API ){

    $scope.goRecap = function(matiere, niveauN, coursG, coursPar, freq, boutonRadio){

      // debutHeure = new Date(heureDebut1).toLocaleDateString('fr-FR', {
      //   hour: 'numeric',
      //   minute: 'numeric'
      // }).split(' ').join(' ');

      $rootScope.mat = matiere
      $rootScope.niv = niveauN
      $rootScope.coursGpe = coursG
      $rootScope.coursParti = coursPar
      $rootScope.frequence = freq
      $rootScope.nbJours = boutonRadio
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

// Controller pour recap cours en groupe
parent.controller('PRecapCoursGroupeCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover','URL_API',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover,URL_API){

    // Fonction qui envoie le mail
    $rootScope.sendR = function(mail, matiere, niveauN , coursG) {

      $rootScope.mat = matiere
      $rootScope.niv = niveauN
      $rootScope.coursGpe = coursG

      // Email to and from
      mail.to='info@capmission.com'
      mail.from='capmission.com@gmail.com'

      // Envoie de l'objet du mail et de son contenu
      mail.subject= 'MOB - ' + $rootScope.parent.entity.name + ' - Ajout Cours. '

      // mail.body = 'Le parent :' + $rootScope.parent.entity.name + 'souhaite créer un groupe.\n Le nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
      //   'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' + $rootScope.nomE6 + '\n' +
      //   'Heure de début du cours :' + $rootScope.debutH + '\nSi cours occasionnel, date souhaitée :' + $rootScope.debutD + '\n' +
      //   'Si plusieurs jours par semaines sont souhaités, nombre de jours :' + $rootScope.boutonRadio + '\n' +
      //   'Jour :' + $rootScope.jour1 + '\n' + $rootScope.jour2 + '\n' + $rootScope.jour3 + '\n' + $rootScope.jour4 + '\n' + $rootScope.jour5 + '\n' + $rootScope.jour6 + '\n' +
      //   'Une remarque éventuelle de la part du parent :' + mail.body

      if($rootScope.coursGpe == '1950'){
        mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite prendre un cours en groupe de ' +$rootScope.mat+ ' pour son enfant ' +$rootScope.eleve.entity.name+
          '\nNombre de jour : 1 jour/semaine \nTarif :' +$rootScope.coursGpe+
          '\nUne remarque éventuelle de la part du parent :' + mail.body
      }else{
        if($rootScope.coursGpe == '3705'){
          mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite prendre un cours en groupe de ' +$rootScope.mat+ ' pour son enfant ' +$rootScope.eleve.entity.name+
            '\nNombre de jour : 2 jours/semaine \nTarif :' +$rootScope.coursGpe+
            '\nUne remarque éventuelle de la part du parent :' + mail.body
        }else{
          if($rootScope.coursGpe == '5265'){
            mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite prendre un cours en groupe de ' +$rootScope.mat+ ' pour son enfant ' +$rootScope.eleve.entity.name+
              '\nNombre de jour : 3 jours/semaine \nTarif :' +$rootScope.coursGpe+
              '\nUne remarque éventuelle de la part du parent :' + mail.body
          }
        }
      }


      console.log('matiere :' +$rootScope.mat)
      console.log('to: '+mail.to)
      console.log('from: '+mail.from)
      console.log('subject: '+mail.subject)
      console.log('body: '+mail.body)

      $ionicLoading.show({
        template: "En cours d'envoi !",
        duration: 1500
      });
      $http.post(URL_API+'/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
        toastr.success('Votre message a été envoyée avec succès')
        $ionicLoading.hide()
        $rootScope.mat = undefined
        $rootScope.coursGpe = undefined
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

// Controller pour choisir cours occasionnel ou cours en groupe
parent.controller('PCoursChoixCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover','URL_API',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover,URL_API){

    $scope.goOcc = function(matiere, niveauN, coursG, coursPar, frequence){
      $rootScope.mat = matiere
      $rootScope.niv = niveauN
      $rootScope.coursGpe = coursG
      $rootScope.coursParti = coursPar
      $rootScope.freq = frequence
      $location.path('/parent/dateHoraireOcc')
    }

    $scope.goMultiple = function(matiere, niveauN, coursG, coursPar, frequence){
      $rootScope.mat = matiere
      $rootScope.niv = niveauN
      $rootScope.coursGpe = coursG
      $rootScope.coursParti = coursPar
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
parent.controller('PDateHoraireOccCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover','URL_API',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover,URL_API){

    $scope.goRecap = function(matiere, niveauN, coursG, coursPar, freq, dateDebut){

      // debutHeure = new Date(heureDebut).toLocaleDateString('fr-FR', {
      //   hour: 'numeric',
      //   minute: 'numeric'
      // }).split(' ').join(' ');
      //
      debutDate = new Date(dateDebut).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',

      }).split(' ').join(' ');

      $rootScope.mat = matiere
      $rootScope.niv = niveauN
      $rootScope.coursGpe = coursG
      $rootScope.coursParti = coursPar
      $rootScope.frequence = freq
      $rootScope.dateDeb = debutDate
      $location.path('/parent/recapCoursOcc')
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

// Controller pour recap cours en groupe réguliers
parent.controller('PTestCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover','URL_API',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover,URL_API){

    // Fonction qui envoie le mail

    $rootScope.sendR = function(mail, mat, niv , coursG, coursParti, frequence, dateDeb, nbJours) {

      $rootScope.matiere = mat
      $rootScope.niveauN = niv
      $rootScope.coursGpe = coursG
      $rootScope.coursPar = coursParti
      $rootScope.freq = frequence
      $rootScope.debutDate = dateDeb
      $rootScope.nbJ = nbJours

      // Email to and from
      mail.to='info@capmission.com'
      mail.from='capmission.com@gmail.com'

      // Envoie de l'objet du mail et de son contenu
      mail.subject= 'MOB - ' + $rootScope.parent.entity.name + ' - Ajout Cours. '

      mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite prendre des cours réguliers en groupe de ' +$rootScope.matiere+ ' pour son enfant ' +$rootScope.eleve.entity.name+
        '\nNombre de cours souhaité : ' +$rootScope.nbJ+ '\nTarif horaire :' +$rootScope.coursGpe+
        '\nUne remarque éventuelle de la part du parent :' + mail.body

      console.log('to: '+mail.to)
      console.log('from: '+mail.from)
      console.log('subject: '+mail.subject)
      console.log('body: '+mail.body)

      $ionicLoading.show({
        template: "En cours d'envoi !",
        duration : 1500
      });
      $http.post(URL_API+'/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
        toastr.success('Votre message a été envoyée avec succès')
        $ionicLoading.hide()
        $rootScope.matiere = undefined
        $rootScope.coursGpe = undefined
        $rootScope.coursPar = undefined
        $rootScope.freq = undefined
        $rootScope.debutDate = undefined
        $rootScope.nbJ = undefined
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
  }
]);

parent.controller('ChangerMdpCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover','$ionicHistory','URL_API',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover,$ionicHistory,URL_API){



    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);

// Controller pour les parametres
parent.controller('ParametresCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover','$ionicHistory','URL_API',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover,$ionicHistory,URL_API){

    //Méthode pour le popup modifier son login
    $scope.modifLogin = function () {
      $scope.data = {};
      $scope.user = {}

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<form name="MyForm" ><input type="hidden" name = "oldLogin" ng-model="data.oldLogin" ng-init="data.oldLogin = resp.entity.login">' +
        '<input type="hidden" ng-model="user.id" ng-init="user.id = resp.entity.id">'+
        '<input type="hidden" ng-model="user.password" ng-init="user.password = resp.entity.password">'+
        '<input type="text" class="lower" name = "oldLogin2" placeholder="Ancien Login" ng-model="data.oldLogin2" ng-pattern="data.oldLogin" ><br>' +
        '<input type="text" class="lower" placeholder="Nouveau Login" name="newLogin" ng-model="user.newLogin"><br>' +
        '<input type="text" class="lower" placeholder="Confirmer votre Login" name="confLogin" ng-model="data.confLogin" ng-pattern="user.newLogin">'+
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
                $http.put(URL_API+'/users/update/' + $scope.user.id, JSON.stringify(user), {timeout: 30000}).success(function (data, status, headers, config) {
                  $scope.updateData = data
                  //window.localStorage.setItem("updateLogin", JSON.stringify(data));
                  toastr.success('Votre login a été changé avec succès !', {displayDuration: 1000});
                  console.log('new login : ' + $scope.updateData.entity.login)
                  localStorage.removeItem("id")
                  localStorage.removeItem("login")
                  localStorage.removeItem("password")
                  localStorage.removeItem("status")
                  $location.path('/login')

                }).error(function (data, status) {
                  /*if(window.localStorage.getItem("updateLogin") !== undefined) {
                    $rootScope.updateData = JSON.parse(window.localStorage.getItem("updateLogin"));
                    $ionicLoading.hide();
                    $location.path('/login');
                  }
                  else {
                    toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
                    navigator.app.exitApp();
                  }*/

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
        '<input type="password" class="lower" name = "oldPwd2" placeholder="Ancien mot de passe" ng-model="data.oldPwd2" ng-pattern="data.oldPwd" required="required"><br>' +
        '<input type="hidden" ng-model="user.id" ng-init="user.id = resp.entity.id">'+
        '<input type="hidden" ng-model="user.login" ng-init="user.login = resp.entity.login">'+
        '<input type="password" class="lower" name="oldLogin" placeholder="Nouveau mot de passe" ng-model="user.oldLogin"><br>' +
        '<input type="password" class="lower" name="confLogin" placeholder="Confirmer votre Mot de Passe" ng-model="data.confLogin" ng-pattern="user.oldLogin"></form>' +
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
                $http.put(URL_API+'/users/update/' + $scope.user.id, JSON.stringify(user), {timeout: 30000}).success(function (data, status, headers, config) {
                  $scope.updateData = data
                  //window.localStorage.setItem("updatePass", JSON.stringify(data));
                  toastr.success('Votre mot de passe a été changé avec succès !', {displayDuration: 1000});
                  console.log('new password : ' + $scope.updateData.entity.password)
                  localStorage.removeItem("id")
                  localStorage.removeItem("login")
                  localStorage.removeItem("password")
                  localStorage.removeItem("status")
                  $location.path('/login')

                }).error(function (data, status) {

                 /* if(window.localStorage.getItem("updatePass") !== undefined) {
                    $rootScope.updateData = JSON.parse(window.localStorage.getItem("updatePass"));
                    $ionicLoading.hide();
                    $location.path('/login');
                  }
                  else {
                    toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
                    navigator.app.exitApp();
                  }*/

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

// Controller pour les tarification
parent.controller('TarifCoursCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover',
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

//controller pour les stages intensif
parent.controller('StageIntensifCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover','URL_API',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover,URL_API){

    $scope.goR = function (matiere, niveauN, stageIntens, vac) {
      $rootScope.mat = matiere
      $rootScope.niv = niveauN
      $rootScope.stageIntensif = stageIntens
      $rootScope.vacances = vac
      $location.path('/parent/recapStageIntensif')
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

//controller pour le récapitulatif des stages intensif
parent.controller('RecapStageIntensifCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover','URL_API',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover,URL_API){

    $scope.sendR = function (mail, mat, niv, stageIntens, vacances) {
      $rootScope.matiere = mat
      $rootScope.niveauN = niv
      $rootScope.stageIntensif = stageIntens
      $rootScope.vac = vacances

      // Email to and from
      mail.to='info@capmission.com'
      mail.from='capmission.com@gmail.com'

      // Envoie de l'objet du mail et de son contenu
      mail.subject= 'MOB - ' + $rootScope.parent.entity.name + ' - Ajout Cours. '

      // mail.body = 'Le parent :' + $rootScope.parent.entity.name + 'souhaite créer un groupe.\n Le nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
      //   'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' + $rootScope.nomE6 + '\n' +
      //   'Heure de début du cours :' + $rootScope.debutH + '\nSi cours occasionnel, date souhaitée :' + $rootScope.debutD + '\n' +
      //   'Si plusieurs jours par semaines sont souhaités, nombre de jours :' + $rootScope.boutonRadio + '\n' +
      //   'Jour :' + $rootScope.jour1 + '\n' + $rootScope.jour2 + '\n' + $rootScope.jour3 + '\n' + $rootScope.jour4 + '\n' + $rootScope.jour5 + '\n' + $rootScope.jour6 + '\n' +
      //   'Une remarque éventuelle de la part du parent :' + mail.body

      if($rootScope.stageIntensif == '1344' || $rootScope.stageIntensif == '1680' || $rootScope.stageIntensif == '2100'){
        mail.body = 'L\'élève : ' +$rootScope.eleve.entity.name+ ' souhaite prendre des cours de ' +$rootScope.matiere+ ' pour un stage intensif en cours de Groupe' +
          ' pendant les vacances de ' +$rootScope.vac+ '.\nTarif :' +$rootScope.stageIntensif+
          '\nUne remarque éventuelle de la part du parent :' + mail.body
      }else{
        mail.body = 'L\'élève : ' +$rootScope.eleve.entity.name+ ' souhaite prendre des cours de ' +$rootScope.matiere+ ' pour un stage intensif en cours Particulier' +
          ' pendant les vacances de ' +$rootScope.vac+ '.\nTarif :' +$rootScope.stageIntensif+
          '\nUne remarque éventuelle de la part du parent :' + mail.body
      }

      console.log('matiere :' +$rootScope.matiere)
      console.log('vacances : ' +$rootScope.vac)
      console.log('tarif :' +$rootScope.stageIntensif)
      console.log('to: '+mail.to)
      console.log('from: '+mail.from)
      console.log('subject: '+mail.subject)
      console.log('body: '+mail.body)

      $ionicLoading.show({
        template: "En cours d'envoi !",
        duration : 1500
      });
      $http.post(URL_API+'/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
        toastr.success('Votre message a été envoyée avec succès')
        $rootScope.matiere = undefined
        $rootScope.niveauN = undefined
        $rootScope.stageIntensif = undefined
        $rootScope.vac = undefined
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

// Controller pour recap cours en groupe occasionnel
parent.controller('RecapCoursOccCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover','URL_API',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover,URL_API){

    // Fonction qui envoie le mail

    $rootScope.sendR = function(mail, mat, niv , coursG, coursParti, frequence, dateDeb, nbJours) {

      $rootScope.matiere = mat
      $rootScope.niveauN = niv
      $rootScope.coursGpe = coursG
      $rootScope.coursPar = coursParti
      $rootScope.freq = frequence
      $rootScope.debutDate = dateDeb
      $rootScope.nbJ = nbJours

      // Email to and from
      mail.to='info@capmission.com'
      mail.from='capmission.com@gmail.com'

      // Envoie de l'objet du mail et de son contenu
      mail.subject= 'MOB - ' + $rootScope.parent.entity.name + ' - Ajout Cours. '

      mail.body = 'Le parent : ' + $rootScope.parent.entity.name + ' souhaite prendre un cours occasionnel en groupe de ' +$rootScope.matiere+ ' pour son enfant ' +$rootScope.eleve.entity.name+
        '\nDate souhaitée : ' +$rootScope.debutDate+ '\nTarif horaire :' +$rootScope.coursGpe+
        '\nUne remarque éventuelle de la part du parent :' + mail.body

      console.log('to: '+mail.to)
      console.log('from: '+mail.from)
      console.log('subject: '+mail.subject)
      console.log('body: '+mail.body)

      $ionicLoading.show({
        template: "En cours d'envoi !",
        duration: 1500
      });
      $http.post(URL_API+'/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
        toastr.success('Votre message a été envoyée avec succès')
        $rootScope.matiere = undefined
        $rootScope.coursGpe = undefined
        $rootScope.coursPar = undefined
        $rootScope.freq = undefined
        $rootScope.debutDate = undefined
        $rootScope.nbJ = undefined
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

