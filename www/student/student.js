/**
 * Created by MSIKA.SAFAA on 25/04/2016.
 */
var student = angular.module('capMission.student', ['ngResource','ui.router','ui.bootstrap']);

student.controller('StudentCtrl', ['$scope','$http','$rootScope','$location','$ionicPopover','$ionicLoading', function ($scope, $http, $rootScope,$location,$ionicPopover,$ionicLoading) {
  $scope.idStudent = window.localStorage.getItem('id')
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  $scope.now = new Date()
  $scope.get = function (id) {
    $ionicLoading.show({
      template: 'Chargement'
    });
    $http.get('http://51.255.195.19:8182/CapMissionApp/students/auth/' + id, {timeout: 35000}).success(function (data, status, headers, config) {
      //$scope.test="safaa"

      $rootScope.student = data
      //console.log(data.recaps.length)
      //console.log( JSON.stringify(data) );
      $rootScope.limit = 10;

      $rootScope.showMore = function () {
        $ionicLoading.show({
          template: 'Chargement',
          duration: 1500
        })
        $rootScope.limit += 3;

      }
      $rootScope.showLess = function () {
        $rootScope.limit -= 3;
      }


      $scope.hasMore = function () {
        return data.length > $rootScope.limit;

      }

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
      toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
      navigator.app.exitApp();

    });
  }

  // $scope.choixMatiere = function (student.entity.id) {
  //
  // }

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

    mail.subject = 'MOB - ' + $rootScope.student.entity.name + ' - Modification Nom'
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
  //Modifier Téléphone
  $scope.sendST = function(mail){
    mail.to='info@capmission.com'
    mail.from= 'capmission.com@gmail.com'
    console.log('body: '+mail.body)
    $scope.body = "Prière de modifier le téléphone de "+ $rootScope.student.entity.name +" dans le système.\nAncienne valeur " +
      ": " + $rootScope.student.entity.phone + "\nNouvelle valeur : " + mail.body
    //mail.subject='Modification séance de : '+ enfant + 'le : ' + debutDate

    mail.subject = 'MOB - ' + $rootScope.student.entity.name + ' - Modification Téléphone'
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
  //Modifier Email
  $scope.sendSE = function(mail){

    mail.to='info@capmission.com'
    mail.from= 'capmission.com@gmail.com'
    console.log('body: '+mail.body)
    $scope.body = "Prière de modifier l'email de "+ $rootScope.student.entity.name +" dans le système.\nAncienne valeur " +
      ": " + $rootScope.student.entity.mail + "\nNouvelle valeur : " + mail.body
    //mail.subject='Modification séance de : '+ enfant + 'le : ' + debutDate

    mail.subject = 'MOB - ' + $rootScope.student.entity.name + ' - Modification Email'
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
  //Modifier Date de naissance
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

    mail.subject = 'MOB - ' + $rootScope.student.entity.name + ' - Modification Date de naissance'
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
  $ionicPopover.fromTemplateUrl('student/student-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

student.controller('SsoldeCtrl', ['$scope', '$rootScope', '$ionicModal', '$http', '$ionicPopover', '$ionicHistory', '$ionicLoading', '$ionicPopup', '$filter', function ($scope, $rootScope, $ionicModal, $http, $ionicPopover, $ionicHistory, $ionicLoading, $ionicPopup, $filter) {

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
    mail.subject = 'MOB - ' + $rootScope.student.entity.name + ' - Solde'
    $scope.body = 'Message :' + mail.body + '\n Détails \n Tarif horaire : ' + tarifHour + '\n Tarif de la séance : ' + tarifPeriod +
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

    $ionicLoading.show({
      template: "En cours d'envoi !",
      duration: 1500
    });
    $http.post('http://51.255.195.19:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
      toastr.success('Votre demande a été envoyée avec succès')
      //$ionicHistory.goBack();
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
  $scope.showAlert = function () {
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

student.controller('SProposCtrl', ['$scope', '$rootScope', '$http', '$location', '$ionicPopover', '$ionicHistory', function ($scope, $rootScope, $http, $location, $ionicPopover, $ionicHistory) {

  $scope.goBack = function () {
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
    'MOB - ' + $rootScope.student.entity.name + ' - Modification TimeTable'
    $scope.body = 'Message :' + mail.body + '\n Détails \n Séance : ' + cout + '\n Nombre étudiants : ' + nbreStudents +
      '\n Nombre heures : ' + nbreHeures + '\n Matière : ' + name + '\n Date : ' + debutDate + '\n Cumul solde : ' + cumul +
      '\n Solde : ' + solde
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
      toastr.success('Votre demande a été envoyée avec succès')
      //$ionicHistory.goBack();
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


});

student.controller('SContactCtrl', ['$scope', '$ionicPopover', '$http', '$ionicHistory', function ($scope, $ionicPopover, $http, $ionicHistory) {
  $scope.contact = "contact student"
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('student/student-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

student.controller('RegStudentCtrl', ['$scope', '$ionicPopover', '$ionicHistory', function ($scope, $ionicPopover, $ionicHistory) {
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


student.controller('SAjoutCoursCtrl', ['$scope', '$rootScope', '$ionicPopover', '$location', '$ionicHistory', '$ionicLoading', '$http', function ($scope, $rootScope, $ionicPopover, $location, $ionicHistory, $ionicLoading, $http) {
  console.log('On est dans le controller SAjoutCoursCtrl')
  $scope.choixMatiere = function(id){
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
      $location.path('/student/choixMatiereS');
    })
    // $location.path('/parent/choixMatiere')
  }
  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('student/student-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

student.controller('SChoixMatiereCtrl', ['$scope', '$rootScope', '$ionicPopover', '$location', '$ionicHistory', '$ionicLoading', '$http', function ($scope, $rootScope, $ionicPopover, $location, $ionicHistory, $ionicLoading, $http) {

  $scope.goPage= function(matiere){
    $rootScope.mat = matiere
    $location.path('/student/choixTypeCoursS')
  }

  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('student/student-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

// Controller pour choisir cours part ou cours en groupe
student.controller('SChoixTypeCoursCtrl', ['$scope', '$ionicPopover', '$location', '$rootScope', function ($scope, $ionicPopover, $location, $rootScope) {


  // $rootScope.matiere = $rootSope.mat
  // console.log('matiere :' +$rootScope.matiere)

  $scope.coursPart = function(mat, coursParti){
    $rootScope.matiere = mat
    $rootScope.coursPar = coursParti
    $location.path('/student/coursParticulierS')
  }

  $scope.coursGroupe = function(mat, coursGpe){
    $rootScope.matiere = mat
    $rootScope.coursG = coursGpe
    $location.path('/student/nbPersonneS')
  }

  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('student/student-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

// Controller pour envoyer un mail pour ajout cours part
student.controller('SCoursParticulierCtrl', ['$scope', '$ionicPopup', '$rootScope', '$ionicModal', '$http', '$ionicLoading','$location','$ionicPopover',
  function($scope,$ionicPopup,$rootScope,$ionicModal,$http,$ionicLoading,$location,$ionicPopover){

    // Fonction qui envoie le mail
    $rootScope.sendC = function(mail, coursPar, matiere) {

      // Email to and from
      mail.to='info@capmission.com'
      mail.from='capmission.com@gmail.com'

      // Envoie de l'objet du mail et de son contenu
      mail.subject= 'MOB - ' + $rootScope.student.entity.name + ' - AJOUT COURS PART. '
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
        $location.path('/role')
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
    $ionicPopover.fromTemplateUrl('student/student-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);

// Controller pour creer ton groupe nb étudiants
student.controller('SNbPersonneCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover',
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
      $location.path('/student/choixFrequenceCours')
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
      $location.path('/student/choixFrequenceCours')
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
      $location.path('/student/choixFrequenceCours')
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
      $location.path('/student/choixFrequenceCours')
    }


    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    $ionicPopover.fromTemplateUrl('student/student-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);

// Controller pour choisir cours occasionnel ou cours en groupe
student.controller('SFrequenceCoursCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover',
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
      $location.path('/student/coursOccasionnelS')
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
      $location.path('/student/coursMultiple')
    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    $ionicPopover.fromTemplateUrl('student/student-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);

// Controller pour date/h occasionnel
student.controller('SCoursOccasionnelCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover',
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
      $location.path('/student/recapOcc')
    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    $ionicPopover.fromTemplateUrl('student/student-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);

// Controller pour cours en groupe date et heure pour cours multiple
student.controller('SCoursMultipleCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover',
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
      $location.path('/student/recapOcc')
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
      $location.path('/student/recapOcc')
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
      $location.path('/student/recapOcc')
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
      $location.path('/student/recapOcc')
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
      $location.path('/student/recapOcc')
    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    $ionicPopover.fromTemplateUrl('student/student-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);

// Controller pour recap cours en groupe occasionnel
student.controller('SRecapOccCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover',
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
      mail.subject= 'MOB - ' + $rootScope.student.entity.name + ' - CREATION GROUPE. '

      // mail.body = 'Le parent :' + $rootScope.parent.entity.name + 'souhaite créer un groupe.\n Le nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
      //   'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' + $rootScope.nomE6 + '\n' +
      //   'Heure de début du cours :' + $rootScope.debutH + '\nSi cours occasionnel, date souhaitée :' + $rootScope.debutD + '\n' +
      //   'Si plusieurs jours par semaines sont souhaités, nombre de jours :' + $rootScope.boutonRadio + '\n' +
      //   'Jour :' + $rootScope.jour1 + '\n' + $rootScope.jour2 + '\n' + $rootScope.jour3 + '\n' + $rootScope.jour4 + '\n' + $rootScope.jour5 + '\n' + $rootScope.jour6 + '\n' +
      //   'Une remarque éventuelle de la part du parent :' + mail.body

      //cas 3 noms et occ
      if($rootScope.nomE4 == null && $rootScope.nomE5 == null && $rootScope.nomE6 == null && $rootScope.jour1 == null && $rootScope.jour2 == null && $rootScope.jour3 ==null
        && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.boutonRadio == null) {
        mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
          'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' +
          'Heure de début du cours :' + moment(heureDeb).format('HH:mm') + '\nSi cours occasionnel, date souhaitée :' + $rootScope.debutD + '\n' +
          'Une remarque éventuelle de la part du parent :' + mail.body
      }else{
        //cas 4 noms et occ
        if($rootScope.nomE5 == null && $rootScope.nomE6 == null && $rootScope.jour1 == null && $rootScope.jour2 == null && $rootScope.jour3 ==null
          && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.boutonRadio == null) {
          mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
            'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' +
            'Heure de début du cours :' + moment(heureDeb).format('HH:mm') + '\nSi cours occasionnel, date souhaitée :' + $rootScope.debutD + '\n' +
            'Une remarque éventuelle de la part du parent :' + mail.body
        }else{
          //cas 5 noms et occ
          if($rootScope.nomE6 == null && $rootScope.jour1 == null && $rootScope.jour2 == null && $rootScope.jour3 ==null
            && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.boutonRadio == null) {
            mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
              'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' +
              'Heure de début du cours :' + moment(heureDeb).format('HH:mm') + '\nSi cours occasionnel, date souhaitée :' + $rootScope.debutD + '\n' +
              'Une remarque éventuelle de la part du parent :' + mail.body
          }else{
            //cas 6 noms et occ
            if($rootScope.jour1 == null && $rootScope.jour2 == null && $rootScope.jour3 ==null
              && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.boutonRadio == null) {
              mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\n Le nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' + $rootScope.nomE6 + '\n' +
                'Heure de début du cours :' + moment(heureDeb).format('HH:mm') + '\nSi cours occasionnel, date souhaitée :' + $rootScope.debutD + '\n' +
                'Une remarque éventuelle de la part du parent :' + mail.body
            }else{
              //cas 3 noms et 2 jours
              if($rootScope.jour3 == null && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null
                && $rootScope.nomE4 == null && $rootScope.nomE5 == null && $rootScope.nomE6 == null) {
                mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                  'Les étudiants sont :\n' + $rootScope.nomE1 + ' - ' + $rootScope.nomE2 + ' - ' + $rootScope.nomE3 + '\n' +
                  'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment(heureDeb1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' +moment(heureDeb2).format('HH:mm')+
                  '\nJours du 1er cours : ' +$rootScope.jour2+ '\n' +
                  'Une remarque éventuelle de la part du parent :' + mail.body

              }else{
                //cas 4 noms et 2 jours
                if($rootScope.nomE5 == null && $rootScope.nomE6 == null && $rootScope.jour3 ==null
                  && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                  mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                    'Les étudiants sont :\n' + $rootScope.nomE1 + ' - ' + $rootScope.nomE2 + ' - ' + $rootScope.nomE3 + ' - ' + $rootScope.nomE4 + '\n' +
                    'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH1).format('HH:mm')+
                    '\nJours du 1er cours : ' +$rootScope.jour2+ '\n' +
                    'Une remarque éventuelle de la part du parent :' + mail.body
                }else{
                  //cas 4 noms et 2 jours
                  if($rootScope.nomE5 == null && $rootScope.nomE6 == null && $rootScope.jour3 ==null
                    && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                    mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                      'Les étudiants sont :\n' + $rootScope.nomE1 + ' - ' + $rootScope.nomE2 + ' - ' + $rootScope.nomE3 + ' - ' + $rootScope.nomE4 + '\n' +
                      'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                      '\nJours du 1er cours : ' +$rootScope.jour2+ '\n' +
                      'Une remarque éventuelle de la part du parent :' + mail.body
                  }else{
                    //cas 5 noms et 2 jours
                    if($rootScope.nomE6 == null && $rootScope.jour3 ==null
                      && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                      mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                        'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' +
                        'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                        '\nJours du 2ème cours : ' +$rootScope.jour2+ '\n' +
                        'Une remarque éventuelle de la part du parent :' + mail.body
                    }else{
                      //cas 6 noms et 2 jours
                      if($rootScope.jour3 ==null
                        && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                        mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\n Le nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                          'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' + $rootScope.nomE6 + '\n' +
                          'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                          '\nJours du 2ème cours : ' +$rootScope.jour2+ '\n' +
                          'Une remarque éventuelle de la part du parent :' + mail.body
                      }else{
                        //cas 3 noms et 3 jours
                        if($rootScope.nomE4 == null && $rootScope.nomE5 == null && $rootScope.nomE6 == null
                          && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                          mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                            'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' +
                            'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                            '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+ '\n' +
                            'Une remarque éventuelle de la part du parent :' + mail.body
                        }else{
                          //cas 4 noms et 3 jours
                          if($rootScope.nomE5 == null && $rootScope.nomE6 == null
                            && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                            mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                              'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' +
                              'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                              '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+ '\n' +
                              'Une remarque éventuelle de la part du parent :' + mail.body
                          }else{
                            //cas 5 noms et 3 jours
                            if($rootScope.nomE6 == null
                              && $rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                              mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' +
                                'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+ '\n' +
                                'Une remarque éventuelle de la part du parent :' + mail.body
                            }else{
                              //cas 6 noms et 3 jours
                              if($rootScope.jour4 == null && $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                  'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' + $rootScope.nomE6 + '\n' +
                                  'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                  '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+ '\n' +
                                  'Une remarque éventuelle de la part du parent :' + mail.body
                              }else{
                                //cas 3 noms et 4 jours
                                if($rootScope.nomE4 == null && $rootScope.nomE5 == null && $rootScope.nomE6 == null &&
                                  $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                  mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                    'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' +
                                    'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH1).format('HH:mm')+
                                    '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+ '\n' +
                                    '\nJours du 4ème cours : ' +$rootScope.jour4+  '\nHeure du 4ème cours : ' +moment($rootScope.debutH4).format('HH:mm') + '\n'
                                  'Une remarque éventuelle de la part du parent :' + mail.body

                                }else{
                                  //cas 4 noms et 4 jours
                                  if($rootScope.nomE5 == null && $rootScope.nomE6 == null &&
                                    $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                    mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                      'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' +
                                      'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                      '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+ '\n' +
                                      '\nJours du 4ème cours : ' +$rootScope.jour4 + '\nHeure du 4ème cours : ' +moment($rootScope.debutH4).format('HH:mm') + '\n'
                                    'Une remarque éventuelle de la part du parent :' + mail.body
                                  }else{
                                    //cas 5 noms et 4 jours
                                    if($rootScope.nomE6 == null &&
                                      $rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                      mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                        'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' +
                                        'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                        '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+ '\n' +
                                        '\nJours du 4ème cours : ' +$rootScope.jour4 + '\nHeure du 4ème cours : ' +moment($rootScope.debutH4).format('HH:mm') + '\n'
                                      'Une remarque éventuelle de la part du parent :' + mail.body
                                    }else{
                                      //cas 6 noms et 4 jours
                                      if($rootScope.jour5 == null && $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                        mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                          'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' + $rootScope.nomE6 + '\n' +
                                          'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                          '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+
                                          '\nJours du 4ème cours : ' +$rootScope.jour4+ '\nHeure du 4ème cours : ' +moment($rootScope.debutH4).format('HH:mm') + '\n'
                                        'Une remarque éventuelle de la part du parent :' + mail.body
                                      }else{
                                        //cas 3 noms et 5 jours
                                        if($rootScope.nomE4 == null && $rootScope.nomE5 == null && $rootScope.nomE6 == null &&
                                          $rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                          mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
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
                                            mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                              'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' +
                                              'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                              '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+
                                              '\nJours du 4ème cours : ' +$rootScope.jour4 + '\nHeure du 4ème cours : ' +moment($rootScope.debutH4).format('HH:mm') +
                                              '\nJours du 5ème cours : ' +$rootScope.jour5 + '\nHeure du 5ème cours : ' +moment($rootScope.debutH5).format('HH:mm') + '\n'
                                            'Une remarque éventuelle de la part du parent :' + mail.body
                                          }else{
                                            //cas 5 noms et 5 jours
                                            if($rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                              mail.body = 'Etdudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                                'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n'
                                              'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                              '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+
                                              '\nJours du 4ème cours : ' +$rootScope.jour4 + '\nHeure du 4ème cours : ' +moment($rootScope.debutH4).format('HH:mm') +
                                              '\nJours du 5ème cours : ' +$rootScope.jour5 + '\nHeure du 5ème cours : ' +moment($rootScope.debutH5).format('HH:mm') + '\n'
                                              'Une remarque éventuelle de la part du parent :' + mail.body
                                            }else{
                                              //cas 6 noms et 5 jours
                                              if($rootScope.jour6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                                mail.body = 'Etudiant: ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
                                                  'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' + $rootScope.nomE6 + '\n'
                                                'Le nombre de jours par semaine : ' +$rootScope.nbJ+ '\nHeure du 1er cours : ' +moment($rootScope.debutH1).format('HH:mm')+ '\nJours du 1er cours : ' +$rootScope.jour1+ '\nHeure du 2ème cours : ' + moment($rootScope.debutH2).format('HH:mm')+
                                                '\nJours du 2ème cours : ' +$rootScope.jour2+ '\nHeure du 3ème cours : ' +moment($rootScope.debutH3).format('HH:mm')+ '\nJours du 3ème cours : ' +$rootScope.jour3+
                                                '\nJours du 4ème cours : ' +$rootScope.jour4 + '\nHeure du 4ème cours : ' +moment($rootScope.debutH4).format('HH:mm') +
                                                '\nJours du 5ème cours : ' +$rootScope.jour5 + '\nHeure du 5ème cours : ' +moment($rootScope.debutH5).format('HH:mm') + '\n'
                                                'Une remarque éventuelle de la part du parent :' + mail.body
                                              }else{
                                                //cas 3 noms et 6 jours
                                                if($rootScope.nomE4 == null && $rootScope.nomE5 == null && $rootScope.nomE6 == null && $rootScope.debutH == null && $rootScope.debutD == null) {
                                                  mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
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
                                                    mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
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
                                                      mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
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
                                                        mail.body = 'Etudiant : ' + $rootScope.student.entity.name + ' souhaite créer un groupe pour un cours de ' +$rootScope.matiere+ '\nLe nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
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
        $location.path('/student')
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
    $ionicPopover.fromTemplateUrl('student/student-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);

student.controller('SParametresCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover','$ionicHistory',
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
