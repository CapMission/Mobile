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
        $rootScope.limit += 10;

      }
      $rootScope.showLess = function () {
        $rootScope.limit -= 5;
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

  $rootScope.sgoChoix = function(){
    $location.path('/student')
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
      //
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

  $scope.goPage= function(matiere, niveauN){
    $rootScope.mat = matiere
    $rootScope.niv = niveauN
    console.log(matiere)
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
student.controller('SChoixTypeCoursCtrl', ['$scope', '$rootScope', '$ionicPopover', '$location', '$ionicHistory', '$ionicLoading', '$http',
  function ($scope, $rootScope, $ionicPopover, $location, $ionicHistory, $ionicLoading, $http) {

    $http.get('student/prixS.json', {timeout: 35000}).success(function (data) {
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
      $location.path('/student/recapAidesDevoirs')
    }

    $scope.coursPart = function (mat, niv, coursGpe, coursParti, frequence) {
      $rootScope.matiere = mat
      $rootScope.niveauN = niv
      $rootScope.coursG = coursGpe
      $rootScope.coursPar = coursParti
      $rootScope.freq =  frequence
      $location.path('/student/coursParticulierS')
    }

    $scope.goCoursRegulier = function(mat, niv, coursGpe, coursParti, freq2){
      $rootScope.matiere = mat
      $rootScope.niveauN = niv
      $rootScope.coursG = coursGpe
      $rootScope.coursPar = coursParti
      $rootScope.freq = freq2
      $location.path('/student/coursMultiple')
    }

    $scope.goCoursOcc = function(mat, niv, coursGpe, coursParti, freq1){
      $rootScope.matiere = mat
      $rootScope.niveauN = niv
      $rootScope.coursG = coursGpe
      $rootScope.coursPar = coursParti
      $rootScope.freq = freq1
      $location.path('/student/coursOccasionnelS')
    }

    $scope.stageI1 = function (mat, niv, stageint1, vacs) {
      $rootScope.matiere = mat
      $rootScope.niveauN = niv
      $rootScope.stageIntens = stageint1
      $rootScope.vacances = vacs
      $location.path('/student/recapStageIntensif1')
    }

    $scope.stageI2 = function (mat, niv, stageint2, vacs) {
      $rootScope.matiere = mat
      $rootScope.niveauN = niv
      $rootScope.stageIntens = stageint2
      $rootScope.vacances = vacs
      $location.path('/student/recapStageIntensif1')
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
      mail.to='audrey.deligand@hei.fr'
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
      $location.path('/student/recapCoursReguliers')
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
      mail.subject= 'MOB - ' +$rootScope.eleve.entity.name+ ' - Ajout Cours. '

      mail.body = 'L\'étudiant : ' +$rootScope.eleve.entity.name+ ' souhaite prendre des cours réguliers en groupe de ' +$rootScope.matiere+ '.' +
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
      $http.post('http://51.255.195.19:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
        toastr.success('Votre message a été envoyée avec succès')
        $ionicLoading.hide()
        $location.path('/student')
        $rootScope.debutDate = undefined
        $rootScope.matiere = undefined
        $rootScope.coursGpe = undefined
        $rootScope.coursPar = undefined
        $rootScope.freq = undefined
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

// Controller pour recap cours en groupe d'aides aux devoirs
student.controller('SRecapAidesDevoirsCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover){


    // Fonction qui envoie le mail
    $rootScope.sendR = function(mail, matiere, niveauN , coursG) {

      $rootScope.mat = matiere
      $rootScope.niv = niveauN
      $rootScope.coursGpe = coursG

      // Email to and from
      mail.to='info@capmission.com'
      mail.from='capmission.com@gmail.com'

      // Envoie de l'objet du mail et de son contenu
      mail.subject= 'MOB - ' + $rootScope.eleve.entity.name + ' - Ajout Cours. '

      // mail.body = 'Le parent :' + $rootScope.parent.entity.name + 'souhaite créer un groupe.\n Le nombre de personnes pour ce groupe est de :' + $rootScope.nb + '. \n' +
      //   'Les étudiants sont :\n' + $rootScope.nomE1 + '\n' + $rootScope.nomE2 + '\n' + $rootScope.nomE3 + '\n' + $rootScope.nomE4 + '\n' + $rootScope.nomE5 + '\n' + $rootScope.nomE6 + '\n' +
      //   'Heure de début du cours :' + $rootScope.debutH + '\nSi cours occasionnel, date souhaitée :' + $rootScope.debutD + '\n' +
      //   'Si plusieurs jours par semaines sont souhaités, nombre de jours :' + $rootScope.boutonRadio + '\n' +
      //   'Jour :' + $rootScope.jour1 + '\n' + $rootScope.jour2 + '\n' + $rootScope.jour3 + '\n' + $rootScope.jour4 + '\n' + $rootScope.jour5 + '\n' + $rootScope.jour6 + '\n' +
      //   'Une remarque éventuelle de la part du parent :' + mail.body

      if($rootScope.coursGpe == '1950'){
        mail.body = 'L\'étudiant : ' +$rootScope.eleve.entity.name+ ' souhaite prendre un cours en groupe de ' +$rootScope.matiere+ ' pour son enfant ' +$rootScope.eleve.entity.name+
          '\nNombre de jour : 1 jour/semaine \nTarif :' +$rootScope.coursGpe+
          '\nUne remarque éventuelle de la part du parent :' + mail.body
      }else{
        if($rootScope.coursGpe == '3705'){
          mail.body = 'L\'étudiant : ' +$rootScope.eleve.entity.name+ ' souhaite prendre un cours en groupe de ' +$rootScope.matiere+ ' pour son enfant ' +$rootScope.eleve.entity.name+
            '\nNombre de jour : 2 jours/semaine \nTarif :' +$rootScope.coursGpe+
            '\nUne remarque éventuelle de la part du parent :' + mail.body
        }else{
          if($rootScope.coursGpe == '5265'){
            mail.body = 'L\'étudiant : ' +$rootScope.eleve.entity.name+ ' souhaite prendre un cours en groupe de ' +$rootScope.matiere+ ' pour son enfant ' +$rootScope.eleve.entity.name+
              '\nNombre de jour : 3 jours/semaine \nTarif :' +$rootScope.coursGpe+
              '\nUne remarque éventuelle de la part du parent :' + mail.body
          }
        }
      }


      console.log('matiere :' +$rootScope.matiere)
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
        $ionicLoading.hide()
        $location.path('/student')
        $rootScope.matiere = undefined
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
    $ionicPopover.fromTemplateUrl('student/student-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);

// Controller pour recap cours en groupe réguliers
student.controller('SRecapCoursReguliersCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover){

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
      mail.subject= 'MOB - ' +$rootScope.eleve.entity.name+ ' - Ajout Cours. '

      mail.body = 'L\'étudiant : ' +$rootScope.eleve.entity.name+ ' souhaite prendre des cours réguliers en groupe de ' +$rootScope.matiere+ '.' +
        '\nNombre de cours souhaité : ' +$rootScope.nbJ+ '\nTarif horaire :' +$rootScope.coursGpe+
        '\nUne remarque éventuelle de la part du parent :' + mail.body

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
        $ionicLoading.hide()
        $location.path('/student')
        $rootScope.matiere = undefined
        $rootScope.nbJ = undefined
        $rootScope.coursGpe = undefined
        $rootScope.coursPar = undefined
        $rootScope.freq = undefined
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

// Controller pour recap cours de stage intensif
student.controller('SRecapStageIntensifCtrl', ['$scope', '$ionicPopup', '$rootScope', '$http', '$ionicLoading','$location','$ionicPopover',
  function($scope,$ionicPopup,$rootScope,$http,$ionicLoading,$location,$ionicPopover){

    $scope.sendR = function (mail, mat, niv, stageIntens, vacances) {
      $rootScope.matiere = mat
      $rootScope.niveauN = niv
      $rootScope.stageIntensif = stageIntens
      $rootScope.vac = vacances

      // Email to and from
      mail.to='info@capmission.com'
      mail.from='capmission.com@gmail.com'

      // Envoie de l'objet du mail et de son contenu
      mail.subject= 'MOB - ' +$rootScope.eleve.entity.name+ ' - Ajout Cours. '

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
        duration: 1500
      });
      $http.post('http://51.255.195.19:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
        toastr.success('Votre message a été envoyée avec succès')
        $ionicLoading.hide()
        $location.path('/student')
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
  }
]);

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
