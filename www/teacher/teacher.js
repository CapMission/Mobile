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
    }).split(' ').join(' ');
    mail.subject = 'MOB - ' + $rootScope.teacher.entity.name + ' - Modification TimeTable'
    $scope.body = 'Message :' + mail.body + '\n Détails \n Séance : ' + period + '\n Date : ' + debutDate
    mail.body = $scope.body

    console.log('idHF: '+id)
    console.log('period: '+period)
    console.log('debut: '+debutDate)
    console.log('to: '+mail.to)
    console.log('from: '+mail.from)
    console.log('subject: '+mail.subject)
    console.log('body: '+mail.body)

    $ionicLoading.show({
      template: "En cours d'envoi !",
      duration: 1500
    });
    $http.post('http://51.255.195.19:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
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

teacher.controller('TeacherCtrl', ['$scope', '$location', '$rootScope', '$http', '$ionicPopover', '$ionicLoading', function ($scope, $location, $rootScope, $http, $ionicPopover, $ionicLoading) {
  $scope.idTeacher = window.localStorage.getItem('id')
  $scope.now = new Date()
  $scope.get = function (id) {
    $ionicLoading.show({
      template: 'Chargement'
    });
    $http.get('http://51.255.195.19:8182/CapMissionApp/teachers/' + id, {timeout: 35000}).success(function (data, status, headers, config) {

      $rootScope.teacher = data

      $scope.limit = 10;

      $scope.showMore = function () {
        $scope.limit += 10;
      }
      $scope.showLess = function () {
        $scope.limit -= 5;
      }
      $ionicLoading.hide();
      //console.log('Data teacher'+JSON.stringify({data: data}))
      if(data.entity == null){
        toastr.warning("Désolés, vous n'êtes pas autorisés à accéder en tant qu'enseignant");
        $location.path('/role');
      }
      else{
        $location.path('/teacher');
        for (index = 0; index < $rootScope.teacher.entity.payments.length; ++index) {
          if (index + 1 == $rootScope.teacher.entity.payments.length) {
            $rootScope.dernier = $rootScope.teacher.entity.payments[index].cumul
          }
        }

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

  $rootScope.tgoChoix = function(){
    $location.path('/teacher')
  }
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

    mail.subject = 'MOB - ' + $rootScope.teacher.entity.name + ' - Modification Nom'
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

    mail.subject = 'MOB - ' + $rootScope.teacher.entity.name + ' - Modification Téléphone'
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

    mail.subject = 'MOB - ' + $rootScope.teacher.entity.name + ' - Modification Email'
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

teacher.controller('TsoldeCtrl', ['$scope', '$rootScope', '$ionicModal', '$http', '$ionicPopup', '$ionicLoading', '$ionicPopover', '$ionicHistory', function ($scope, $rootScope, $ionicModal, $http, $ionicPopup, $ionicLoading, $ionicPopover, $ionicHistory) {

  $ionicModal.fromTemplateUrl('templates/modalSolde.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.getPayment = function (name, date, cumul, solde, nbreHeures, nbreStudents, cout) {
    $scope.name = name
    $scope.cumul = cumul
    $scope.solde = solde
    $scope.nbreHeures = nbreHeures
    $scope.nbreStudents = nbreStudents
    $scope.cout = cout
    $scope.date = date
    debutDate = new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).split(' ').join(' ');
    console.log('nameN: ' + name)
    console.log('cumul: ' + cumul)
    console.log('solde: ' + solde)
    console.log('nbreHeures: ' + nbreHeures)
    console.log('nbreStudents: ' + nbreStudents)
    console.log('date: ' + debutDate)
    console.log('cout: ' + cout)
  }
  $scope.sendSolde = function (mail, id, solde, nbreHeures, nbreStudents, cout, cumul, name, date) {

    //$test = $rootScope.parent.entity.mail

    mail.to = 'info@capmission.com'
    mail.from = 'capmission.com@gmail.com'
    name = $scope.name
    cumul = $scope.cumul.toFixed(2)
    solde = $scope.solde.toFixed(2)
    nbreHeures = $scope.nbreHeures
    nbreStudents = $scope.nbreStudents
    cout = $scope.cout.toFixed(2)
    date = $scope.date
    debutDate = new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).split(' ').join(' ');
    mail.subject = 'MOB - ' + $rootScope.teacher.entity.name + ' - Historique Solde'
    $scope.body = 'Message :' + mail.body + '\n Détails \n Coût horaire : ' + cout + '\n Nombre étudiants : ' + nbreStudents +
      '\n Nombre heures : ' + nbreHeures + '\n Matière : ' + name + '\n Date : ' + debutDate + '\n Cumul solde : ' + cumul +
      '\n Solde : ' + solde
    mail.body = $scope.body
    console.log('name: ' + name)
    console.log('cumul: ' + cumul)
    console.log('solde: ' + solde)
    console.log('heures: ' + nbreHeures)
    console.log('students: ' + nbreStudents)
    console.log('cout: ' + cout)
    console.log('date: ' + debutDate)

    $ionicLoading.show({
      template: "En cours d'envoi !",
      duration: 1500
    });
    $http.post('http://51.255.195.19:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
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
    $ionicLoading.show({
      template: 'Chargement',
      duration: 1500
    })
    $scope.limit += 10;
  }
  $scope.showLess = function () {
    $scope.limit -= 5;
  }
  $scope.showAlert = function () {
    var solde = $scope.solde.toFixed(2)
    var coutHoraire = $scope.cout.toFixed(2)
    var alertPopup = $ionicPopup.alert({
      title: 'Détails récapitulatif solde',
      template: '<ul>Solde : ' + solde + ' MAD</ul><br> <ul>Nombre heures : ' + $scope.nbreHeures + '</ul><br> <ul>Nombre étudiants : ' + $scope.nbreStudents + '</ul><br> <ul>Revenu horaire : ' + coutHoraire + ' MAD</ul><br><ul> Date : ' + debutDate
    });

    alertPopup.then(function (res) {
      //console.log('OK');
    });

  };
  $scope.goBack = function(){
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

teacher.controller('TtimeCtrl', ['$scope','$ionicPopover','$rootScope','$http','$location', function ($scope, $ionicPopover,$rootScope,$http,$location) {
  $id = resp.entity.id
  $http.get('http://51.255.195.19:8182/CapMissionApp/teachers/' + $id, {timeout: 35000}).success(function (data, status, headers, config) {
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

teacher.controller('TContactCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory) {

  $scope.contact = "contact teacher"
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('teacher/teacher-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

teacher.controller('ChoixSoldeCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory) {

  $scope.goSolde = function () {
    $location.path('/teacher/solde')
  }
  $scope.goAmont = function () {
    $location.path('/teacher/amont')
  }
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('teacher/teacher-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

teacher.controller('AmontSoldeCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', '$ionicPopup', '$ionicModal', '$ionicLoading', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory, $ionicPopup, $ionicModal, $ionicLoading) {
  /*
   $scope.getTotal = function() {
   var total = 0;
   angular.forEach($rootScope.teacher.entity.amonts, function(amont) {
   total += amont.cout;
   })

   return total;
   }*/

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

  $ionicModal.fromTemplateUrl('templates/modalSolde.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.getAmont = function (name, date, cumul, solde, nbreHeures, nbreStudents, cout) {
    $scope.name = name
    $scope.cumul = cumul
    $scope.solde = solde
    $scope.nbreHeures = nbreHeures
    $scope.nbreStudents = nbreStudents
    $scope.cout = cout
    $scope.date = date
    debutDate = new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).split(' ').join(' ');
    console.log('nameN: ' + name)
    console.log('cumul: ' + cumul)
    console.log('solde: ' + solde)
    console.log('nbreHeures: ' + nbreHeures)
    console.log('nbreStudents: ' + nbreStudents)
    console.log('date: ' + debutDate)
    console.log('cout: ' + cout)
  }
  $scope.sendSolde = function (mail, id, solde, nbreHeures, nbreStudents, cout, cumul, name, date) {

    //$test = $rootScope.parent.entity.mail

    mail.to = 'info@capmission.com'
    mail.from = 'capmission.com@gmail.com'
    name = $scope.name
    cumul = $scope.cumul.toFixed(2)
    solde = $scope.solde.toFixed(2)
    nbreHeures = $scope.nbreHeures
    nbreStudents = $scope.nbreStudents
    cout = $scope.cout.toFixed(2)
    date = $scope.date
    debutDate = new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).split(' ').join(' ');
    mail.subject = 'MOB - ' + $rootScope.teacher.entity.name + ' - Solde prévisionnel'
    $scope.body = 'Message :' + mail.body + '\n Détails \n Coût horaire : ' + cout + '\n Nombre étudiants : ' + nbreStudents +
      '\n Nombre heures : ' + nbreHeures + '\n Matière : ' + name + '\n Date : ' + debutDate + '\n Cumul solde : ' + cumul +
      '\n Solde : ' + solde
    mail.body = $scope.body

    console.log('name: ' + name)
    console.log('cumul: ' + cumul)
    console.log('solde: ' + solde)
    console.log('heures: ' + nbreHeures)
    console.log('students: ' + nbreStudents)
    console.log('cout: ' + cout)
    console.log('date: ' + debutDate)

    $ionicLoading.show({
      template: "En cours d'envoi !",
      duration: 1500
    });
    $http.post('http://51.255.195.19:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
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
  $scope.showAlert = function () {
    var solde = $scope.solde.toFixed(2)
    var coutHoraire = $scope.cout.toFixed(2)
    var alertPopup = $ionicPopup.alert({
      title: 'Détails récapitulatif solde',
      template: '<ul>Solde : ' + solde + ' MAD</ul><br> <ul>Nombre heures : ' + $scope.nbreHeures + '</ul><br> <ul>Nombre étudiants : ' + $scope.nbreStudents + '</ul><br> <ul>Revenu horaire : ' + coutHoraire + ' MAD</ul><br><ul> Date : ' + debutDate
    });

    alertPopup.then(function (res) {
      //console.log('OK');
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

teacher.controller('ChoixEtudiantCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory) {
  $scope.choixEtudiant = "Choix étudiant !"
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('teacher/teacher-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

teacher.controller('TParametresCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover','$ionicHistory',
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
