var authentication = angular.module('capMission.authentication', ['ionic','ionicProcessSpinner','ngAnimate','toaster']);
authentication.controller('RoleCtrl',['$scope','$ionicPopover','$ionicHistory',  function ($scope,$ionicPopover,$ionicHistory) {

  $ionicPopover.fromTemplateUrl('teacher/popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

// Controller pour identifiant oublié
authentication.controller('IdentifiantOublieCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading','toaster',
  function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading,toaster) {

    String.prototype.capitalizeFirstLetter = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    }

    $scope.sendMdp = function(mail, nomMdpOublie, prenomMdpOublie, emailMdpOublie){
      $rootScope.nomMdpOub = nomMdpOublie.capitalizeFirstLetter()
      $rootScope.prenomMdpOub = prenomMdpOublie.capitalizeFirstLetter()
      $rootScope.emailMdpOub = emailMdpOublie
      console.log('le nom est : ' + $rootScope.nomMdpOub )
      console.log('le prenom est : ' +$rootScope.prenomMdpOub)
      console.log('email est : '  +$rootScope.emailMdpOub)
      $scope.name = $rootScope.nomMdpOub+ ' ' +$rootScope.prenomMdpOub
      console.log('le nom entier est : ' +$scope.name)



      // $scope.name

     $ionicLoading.show({
         content: '<div class="icon ion-loading-c"></div>',
         duration: 30000
     }

     )

      $http.get('http://51.255.195.19:8182/CapMissionApp/users/get/' + $scope.name, {timeout: 120000}).success(function (data, status, headers, config) {
        $ionicLoading.hide()
        $scope.identifiant = data
        console.log('Vous y etes !')
        console.log('la data est : ' +data)


        mail.to = emailMdpOublie
        mail.from = 'info@capmission.com'

        // Envoie de l'objet du mail et de son contenu
        mail.subject = 'Vos identifiants Cap Mission'
        mail.body = 'Suite à votre demande de récupération de vos identifiants, nous vous transmettons votre login et votre mot de passe :' +
          '\nLogin : ' +$scope.identifiant.entity.login+ '\nMot de Passe : ' +$scope.identifiant.entity.password

        console.log('to: ' + mail.to)
        console.log('from: ' + mail.from)
        console.log('subject: ' + mail.subject)
        console.log('body: ' + mail.body)
        toastr.success("Nous avons pu récupérer vos données. Un email vous sera envoyé contenant vos identifiants", {closeButton: true });

        $http.post('http://51.255.195.19:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
          toastr.success("Un email vous a été envoyé. Vérifiez votre boîte email", {closeButton: true });
          $location.path('/login')

          //$ionicHistory.goBack();
        }).error(function (data, status) {
          if (status == 0) {
            toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Veuillez nous excuser !', {displayDuration: 1000});
            navigator.app.exitApp();
          }
          else {
            toastr.error("Echec envoi de message ! Réessayez plus tart !")
            $location.path('/login')
          }
        });

      }).error(function (data, status) {
        if (status == 0) {
          toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Veuillez nous excuser !', {displayDuration: 1000});
          $ionicLoading.hide()
          navigator.app.exitApp();
        }
        else {
          toastr.error("Veuillez nous excuser, nous n'avons pas pu retrouver vos identifiants, contactez-nous au plus vite !")
          $ionicLoading.hide()
        }
      });



    }

  }]);

authentication.controller('InscriptionCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading',
  function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading) {

  $scope.nomPrenomP = ''
  $scope.bodyAutre = ''
  $scope.getNomPrenomP = function() {
    console.log('Le nom et prenom du parent est : ' +$scope.nomPrenomP);
    return $scope.nomPrenomP;
  }

  $scope.getAutreRaison = function() {
    console.log('Autre raison est : ' +$scope.bodyAutre);
    return $scope.bodyAutre;
  }

  $scope.goCours = function(nomPrenomP, telP, emailP, choix, bodyAutre){
    $rootScope.nomPrenomParent = nomPrenomP
    $rootScope.telParent = telP
    $rootScope.emailParent = emailP
    $rootScope.choixP = choix
    $rootScope.raisonAutre = bodyAutre
    $location.path('/infoEleve')
  }

  $scope.goCatalogue = function(nomPrenomP, telP, emailP, choix, bodyAutre){
    $rootScope.nomPrenomParent = nomPrenomP
    $rootScope.telParent = telP
    $rootScope.emailParent = emailP
    $rootScope.choixP = choix
    $rootScope.raisonAutre = bodyAutre
    $location.path('/catalogue')

    // // Email to and from
    // mail.to='audrey.deligand@hei.fr'
    // mail.from='audreyd@capmission.com'
    //
    // // Envoie de l'objet du mail et de son contenu
    // mail.subject= 'MOB - INSCRIPTION Consultation du Catalogue. '
    // mail.body= $rootScope.nomPrenomParent + ' a consulté notre catalogue ! \nVoici les informations le concernant :\nTéléphone : ' + telParent +'\nE-mail : ' + emailParent + '\nComment a t-il connu CapMission : '
    // + choix + 'Si autre, voici comment il a connu notre établissement : ' + mail.body
    //
    // console.log('to: '+mail.to)
    // console.log('from: '+mail.from)
    // console.log('subject: '+mail.subject)
    // console.log('body: '+mail.body)
    //
    // $ionicLoading.show({
    //   template: "En cours d'envoi !"
    // });
    // $http.post('http://81.192.194.109:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
    //   $ionicLoading.hide();
    //   toastr.success('Votre message a été envoyée avec succès')
    //   $ionicHistory.goBack();
    //   $location.path('/parent/choixAjoutCours');
    // }).error(function (data, status) {
    //   if (status == 0) {
    //     toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Veuillez nous excuser !', {displayDuration: 1000});
    //     navigator.app.exitApp();
    //   }
    //   else {
    //     $ionicLoading.hide();
    //     toastr.error("Echec envoi de message ! Réessayez plus tart !")
    //   }
    // });
  }

  console.log('nom du parent : ' +$rootScope.nomPrenomParent)
  console.log('tel parent : ' +$rootScope.telParent)
  console.log('email parent : ' +$rootScope.emailParent)
  console.log('choixParent : ' +$rootScope.choixP)
  console.log('autre raison : ' +$rootScope.raisonAutre)

  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

authentication.controller('ChoixCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading', function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading) {
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
  $scope.now = new Date();
  $rootScope.onTabSelected = function(){
    <!-- ionicToast.show(message, position, stick, time); -->
    // ionicToast.show('This is a toast at the top.', 'top', true, 2500);
    toastr.info('Fontionnalité non disponible pour le moment !');
    toastr.clear();

  };
  $scope.idParent = window.localStorage.getItem('id')
  //$ionicLoading.show();
  $scope.getd = function(){}
  // $id = $rootScope.resp.entity.id
  $scope.get = function (id) {

    $http.get('http://51.255.195.19:8182/CapMissionApp/parents/' + id).success(function (data, status, headers, config) {
      //$scope.test="safaa"
      $rootScope.parent = data
      console.log(data)
      if (data.entity == null) {
        toastr.warning("Désolés, vous n'êtes pas autorisés à accéder en tant que parent");
        $location.path('/role');
      }
      else {
        // Dans le cas où la personne n'a qu'un enfant
        if ($rootScope.parent.entity.students.length == '1') {

          console.log('Le nombre des enfants est :' + $rootScope.parent.entity.students.length)

          // On fait un for pour parcourir l'arrayList (car c'est une liste d'étudiants)
          for (index = 0; index < $rootScope.parent.entity.students.length; ++index) {
            if (index + 1 == $rootScope.parent.entity.students.length) {
              id = $rootScope.parent.entity.students[index].id
              console.log(id)
            }
          }

          // Connexion au serveur pour récupérer les données Etudiant
          $http.get('http://51.255.195.19:8182/CapMissionApp/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {

            $rootScope.son = data
            $ionicLoading.hide();
            console.log('value : ' + window.localStorage.getItem('login'))
            // Redirige vers la page de l'emploi directement
            $location.path('/parent/emploiEnfant2');

          }).error(function (data) {

            //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
            toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
            navigator.app.exitApp();
          })
        } else {
          // Dans le cas où l'étudiant est aussi parent
          if ($rootScope.parent.entity.students.length == '2') {

            console.log($rootScope.parent.entity.name)
            console.log('Le nombre des enfants est :' + $rootScope.parent.entity.students.length)
            // On fait un for pour parcourir l'arrayList (car c'est une liste d'étudiants)
            for (index = 0; index < 2; ++index) {
              name = $rootScope.parent.entity.students[index].name
            }
            console.log(name)

            if (name == $rootScope.parent.entity.name) {

              for (index = 0; index < 1; ++index) {
                id = $rootScope.parent.entity.students[index].id
                console.log(id)
              }

              $http.get('http://51.255.195.19:8182/CapMissionApp/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {

                $rootScope.son = data
                $ionicLoading.hide();
                console.log('value : ' + window.localStorage.getItem('login'))
                $location.path('/parent/emploiEnfant2');

              }).error(function (data) {

                //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
                toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
                navigator.app.exitApp();
              })
            } else {
              $location.path('/choix');
            }
          } else {
            $location.path('/choix');
          }
        }
      }
      $ionicLoading.hide();
      //console.log('Data choix'+JSON.stringify({data: data}))
      //$location.path('/choix');
    }).error(function (data) {
      toastr.error('Echec de connexion');

    });
  }
  $scope.goBack = function(){
    $ionicHistory.goBack();
  }


}]);

authentication.controller('LoginCtrl',function($scope, $location, $auth, $http){
 /* $scope.login = function(user) {
   $http.post('http://localhost:8182/auth/login', user).success(function(data, status, headers, config){
     $scope.resp = "test"
     //$scope.login = UserService.login;

     alert(JSON.stringify({data: data}))
     toastr.success('Bienvenu à votre espace personnel!');
     $location.path('/tab/home');
   }).error(function(data){
     toastr.error('Login/Password incorrect !');
     $location.path('/login');
   });
   /!* $auth.login($scope.user)
      .then(function() {
        toastr.success('You have successfully signed in!');
        $location.path('/tab/home');
      })
      .catch(function(error) {
        toastr.error(error.data.message, error.status);
      });*!/
  };*/

  $scope.goMdpPage = function () {
    $location.path('/identifiantOublie')
  }

  $scope.goInscription = function(){
    $location.path('/inscription')
}

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        toastr.success('You have successfully signed in with ' + provider + '!');
        $location.path('/tab/home');
      })
      .catch(function(error) {
        if (error.error) {
          // Popup error - invalid redirect_uri, pressed cancel button, etc.
          toastr.error(error.error);
        } else if (error.data) {
          // HTTP response error from server
          toastr.error(error.data.message, error.status);
        } else {
          toastr.error(error);

        }
      });
  };
  $scope.logout = function() {
    $auth.logout();
  };

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };
});

authentication.controller('InfoEleveCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading',
  function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading) {

    $scope.goMatiere = function(nomPrenomParent, telParent, emailParent, choixP, raisonAutre, nomPrenomE, dateNaissanceE, telE,
                                emailE, ecoleE, coursParticulier, coursEnGroupe){

      dateN = new Date(dateNaissanceE).toLocaleDateString('fr-FR', {
        hour: 'numeric',
        minute: 'numeric'
      }).split(' ').join(' ');

      $rootScope.nomPrenomP = nomPrenomParent
      $rootScope.telP = telParent
      $rootScope.emailP = emailParent
      $rootScope.choixParent = choixP
      $rootScope.autreRaison = raisonAutre
      $rootScope.nomPrenomEnfant = nomPrenomE
      $rootScope.dateNaissanceEnfant = dateN
      $rootScope.telEnfant = telE
      $rootScope.emailEnfant = emailE
      $rootScope.ecoleEnfant = ecoleE
      $rootScope.coursParti = coursParticulier
      $rootScope.coursEnGpe = coursEnGroupe
      $location.path('/choixMatiereNonInscrit')
    }

    console.log('nom du parent : ' +$rootScope.nomPrenomP)
    console.log('tel parent : ' +$rootScope.telP)
    console.log('email parent : ' +$rootScope.emailP)
    console.log('choixParent : ' +$rootScope.choixParent)
    console.log('autre raison : ' +$rootScope.autreRaison)

  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
  $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);

authentication.controller('CatalogueCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading',
  function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading) {

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);


authentication.controller('ChoixMatiereNonInscritCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading',
  function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading) {

    $scope.missions = ["Bilingue", "Mission Française", "Mission Belge", "Mission U.S.", "Mission Espagnole", "Enseignement Universitaire", "Adulte English", "Informatique"]
    $scope.sections = ["Maternelle", "Primaire", "Collège", "Lycée"]
    $scope.sectionsUS = ["Elementary/Grade School", "Middle/Junio School", "High School"]
    $scope.sectionsEsp = ["Primaria", "ESO", "Bachillerato"]
    $scope.filieres = ["S", "ES", "L", "STMG", "S-OIB", "ES-OIB", "L-OIB", "STMG-OIB"]
    $scope.niveaux1 = ["CP", "CE1", "CE2", "CM1", "CM2"]
    $scope.niveaux2 = ["6ème", "5ème", "4ème", "3ème"]
    $scope.niveaux3 = ["2nde", "1ère", "Terminale"]
    $scope.niveauxUS1 = ["1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade"]
    $scope.niveauxUS2 = ["6th Grade", "7th Grade", "8th Grade"]
    $scope.niveauxUS3 = ["9th Grade", "10th Grade", "11th Grade", "12th Grade"]
    $scope.niveauxEsp1 = ["Primero de primaria", "Segundo de primaria", "Tercero de primaria", "Cuarto de primaria", "Quinto de primaria", "Sexto de primaria"]
    $scope.niveauxEsp2 = ["Primero de la ESO", "Segundo de la ESO", "Tercero de la ESO", "Cuarto de la ESO"]
    $scope.niveauxEsp3 = ["Primero de Bachillerato", "Segundo de Bachillerato"]
    $scope.niveauxB1 = ["CP", "CE2", "CE3", "CE4", "CE5", "CE6"]
    $scope.niveauxB2 = ["CE7", "CE8", "CE9"]
    $scope.niveauxB3 = ["Tronc Commun", "1ère Année Baccaloréat", "2ème Année Baccaloréat"]
    $scope.niveauxAdultes = ["Débutant", "A1", "A2", "B1", "B2", "C1", "C2", "Business English", "IELTS", "SAT", "TOEFL"]
    $scope.niveauxUniv = ["1ère année"]
    $scope.nveauxInfo = ["Initiation"]
    $scope.niveauxMaternelle = ["Test Mission G.S."]

    //Matière pour la mission frnacaise et Belge
    $scope.matieresTS = ["Mathématiques", "Physique/Chimie", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie",
      "Suivi scolaire", "Méthodologie"]
    $scope.matieresTSOIB = ["Arabe OIB", "Hist/Géo Arabe OIB", "Mathématiques", "Physique/Chimie", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie",
      "Suivi scolaire", "Méthodologie"]
    $scope.matieresTES = ["Mathématiques", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie",
      "Economie", "Suivi scolaire", "Méthodologie"]
    $scope.matieresTESOIB = ["Arabe OIB", "Hist/Géo Arabe OIB", "Mathématiques", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie",
      "Economie", "Suivi scolaire", "Méthodologie"]
    $scope.matieresTL = ["Mathématiques", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie",
      "Suivi scolaire", "Méthodologie"]
    $scope.matieresTLOIB = ["Arabe OIB", "Hist/Géo Arabe OIB", "Mathématiques","SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie",
      "Suivi scolaire", "Méthodologie"]
    $scope.matieresTSTMG = ["Mathématiques", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie", "Economie/Droit", "Management",
      "Suivi scolaire", "Méthodologie"]
    $scope.matieresTSTMGOIB = ["Arabe OIB", "Hist/Géo Arabe OIB", "Mathématiques", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie", "Economie/Droit", "Management",
      "Suivi scolaire", "Méthodologie"]
    $scope.matieres1ereS = ["Mathématiques", "Physique/Chimie", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie",
      "Suivi scolaire", "Méthodologie", "Français", "SAT Mathématiques", "SAT English"]
    $scope.matieres1ereSOIB = ["Arabe OIB", "Hist/Géo Arabe OIB", "Français", "Mathématiques", "Physique/Chimie", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie",
      "Suivi scolaire", "Méthodologie"]
    $scope.matieres1ereES = ["Mathématiques", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie",
      "Economie", "Suivi scolaire", "Méthodologie","Français", "SAT Mathématiques", "SAT English"]
    $scope.matieres1ereESOIB = ["Arabe OIB", "Hist/Géo Arabe OIB", "Mathématiques", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie",
      "Economie", "Suivi scolaire", "Méthodologie","Français", "SAT Mathématiques", "SAT English"]
    $scope.matieres1ereL = ["Mathématiques", "Physique/Chimie", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie",
      "Suivi scolaire", "Méthodologie", "Français", "SAT English"]
    $scope.matieres1ereLOIB = ["Arabe OIB", "Hist/Géo Arabe OIB", "Mathématiques", "Physique/Chimie", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie",
      "Suivi scolaire", "Méthodologie", "Français", "SAT English"]
    $scope.matieres1ereSTMG = ["Français", "Mathématiques", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie", "Economie/Droit", "Management",
      "Suivi scolaire", "Méthodologie"]
    $scope.matieres1ereSTMGOIB = ["Arabe OIB", "Hist/Géo Arabe OIB", "Français", "Mathématiques", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie", "Economie/Droit", "Management",
      "Suivi scolaire", "Méthodologie"]
    $scope.matieres2nde = ["Mathématiques", "Physique/Chimie", "SVT", "Histoire/Géographie", "Espagnol LV", "Français", "Anglais LV",
      "SAT Mathématiques", "SAT English", "Economie", "Suivi scolaire", "Méthodologie"]
    $scope.matieres345eme = ["Arabe", "Aides aux devoirs", "Mathématiques", "Physiques/Chimie", "SVT", "Histoire/Géographie", "Espagnol LV", "Français", "Anglais LV",
      "Technologie", "Suivi scolaire", "Méthodologie"]
    $scope.matieres6eme = ["Arabe", "Aides aux devoirs", "Mathématiques", "SVT", "Histoire/Géographie", "Espagnol LV", "Français", "Anglais LV",
      "Suivi scolaire", "Méthodologie"]
    $scope.matieresPrimaire = ["Arabe", "Aides aux devoirs", "Mathématiques", "Français", "Anglais LV", "Suivi scolaire", "Méthodologie"]

    //Matiere pour les cours adultes
    $scope.matieresAdulte = ["Anglais", "FLE", "ELE"]

    //Matière pour la mission espagnol
    $scope.matieresBacEsp = ["Matemáticas", "Economía", "Física y química", "Lengua Española y Literatura", "Geografía e historia", "Inglés LE", "Francés LE", "Biología y geología",
    "Árabe"]
    $scope.matieresESO432 = ["Matemáticas", "Tecnología", "Física y química", "Lengua Española y Literatura", "Geografía e historia", "Inglés LE", "Francés LE", "Biología y geología",
      "Árabe", "Ayuda a los deberes"]
    $scope.matieresESO1 = ["Matemáticas", "Tecnología", "Lengua Española y Literatura", "Geografía e historia", "Inglés LE", "Francés LE", "Biología y geología",
      "Árabe", "Ayuda a los deberes"]
    $scope.matieresPrimaria = ["Matemáticas", "Ciencias naturales", "Lengua Española y Literatura", "Ciencias de la naturaleza", "Inglés LE", "Francés LE", "Árabe", "Ayuda a los deberes"]

    //Matiere pour la mission US
    $scope.matieresElementary = ["Arabic", "HomeWork Assistance", "Mathematics", "French", "English", "Methodology"]
    $scope.matieresMiddle = ["Arabic", "HomeWork Assistance", "Mathematics", "French", "English", "Methodology", "Sciences/Biology", "Physics/Chemestry", "History/Geography"]
    $scope.matieresHigh = ["Arabic", "HomeWork Assistance", "Mathematics", "French", "English", "Methodology", "Sciences/Biology", "Physics/Chemestry", "History/Geography", "Economy", "Philosophy"]

    //Matiere pour la mission Bilingue
    $scope.matieresBacB = ["Mathématiques", "Physique/Chimie", "Espagnol", "Français", "Anglais", "Suivi Scolaire", "Arabe"]
    $scope.matieresPrimaireB = ["Mathématiques", "Espagnol", "Français", "Anglais", "Suivi Scolaire", "Arabe"]

    $scope.goNbJoursNnInsc = function(nomPrenomP, telP, emailP, choixParent, autreRaison, nomPrenomEnfant, telEnfant, emailEnfant, dateNaissanceEnfant, ecoleEnfant, coursParti, coursEnGpe,
                                             choixMission, choixSection, choixNiveau, choixMatiere){
      $rootScope.nomPrenomParent = nomPrenomP
      $rootScope.telParent = telP
      $rootScope.emailParent = emailP
      $rootScope.choixP = choixParent
      $rootScope.raisonAutre = autreRaison
      $rootScope.nomPrenomE = nomPrenomEnfant
      $rootScope.telE = telEnfant
      $rootScope.emailE = emailEnfant
      $rootScope.dateNaissanceE = dateNaissanceEnfant
      $rootScope.ecoleE = ecoleEnfant
      $rootScope.coursParticulier = coursParti
      $rootScope.coursEnGroupe = coursEnGpe
      $rootScope.choixMiss = choixMission
      $rootScope.choixS = choixSection
      $rootScope.choixN = choixNiveau
      $rootScope.choixMat = choixMatiere
      $location.path('/nbJoursNnInscrit')
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

authentication.controller('NbJoursNnInscritCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading',
  function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading) {



    $scope.goDispo = function(nomPrenomParent, telParent, emailParent, choixP, raisonAutre, nomPrenomE, telE, emailE, dateNaissanceE, ecoleE, coursParticulier, coursEnGroupe, choixMiss, choixS, choixN, choixMat,
                              dateDebCours, boutonRadioOui, boutonRadio){

        $rootScope.nomPrenomP = nomPrenomParent
        $rootScope.telP = telParent
        $rootScope.emailP = emailParent
        $rootScope.choixParent = choixP
        $rootScope.autreRaison = raisonAutre
        $rootScope.nomPrenomEnfant = nomPrenomE
        $rootScope.telEnfant = telE
        $rootScope.emailEnfant = emailE
        $rootScope.dateNaissanceEnfant = dateNaissanceE
        $rootScope.ecoleEnfant = ecoleE
        $rootScope.coursParti = coursParticulier
        $rootScope.coursEnGpe = coursEnGroupe
        $rootScope.choixMission = choixMiss
        $rootScope.choixSection = choixS
        $rootScope.choixNiveau = choixN
        $rootScope.choixMatiere = choixMat
        $rootScope.dateDebutCours = dateDebCours
        $rootScope.plusieursCours = boutonRadioOui
        $rootScope.nbJoursCours = boutonRadio
        $location.path('/disponibilite')
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

authentication.controller('RecapitulatifNonInscritCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading',
  function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading) {

    $rootScope.sendRecaptitulatif = function(mail, nomPrenomP, telP, emailP, choixParent, autreRaison, nomPrenomEnfant, telEnfant, emailEnfant, dateNaissanceEnfant, ecoleEnfant, coursParti, coursEnGpe, choixMission, choixSection,
                                             choixNiveau, choixMatiere, nbJoursCours, heureDebutCours, heureDebutCours1, heureDebutCours2, heureDebutCours3, heureDebutCours4, heureDebutCours5, heureDebutCours6, dateDebutCours, jCours1,
                                             jCours2, jCours3, jCours4, jCours5, jCours6) {


      $rootScope.nomPrenomParent = nomPrenomP
      $rootScope.telParent = telP
      $rootScope.emailParent = emailP
      $rootScope.choixP = choixParent
      $rootScope.raisonAutre = autreRaison
      $rootScope.nomPrenomE = nomPrenomEnfant
      $rootScope.telE = telEnfant
      $rootScope.emailE = emailEnfant
      $rootScope.dateNaissanceE = dateNaissanceEnfant
      $rootScope.ecoleE = ecoleEnfant
      $rootScope.coursParticulier = coursParti
      $rootScope.coursEnGroupe = coursEnGpe
      $rootScope.choixMiss = choixMission
      $rootScope.choixS = choixSection
      $rootScope.choixN = choixNiveau
      $rootScope.choixMat = choixMatiere
      $rootScope.nbJoursC = nbJoursCours
      $rootScope.heureDebCours = heureDebutCours
      $rootScope.heureDebCours1 = heureDebutCours1
      $rootScope.heureDebCours2 = heureDebutCours2
      $rootScope.heureDebCours3 = heureDebutCours3
      $rootScope.heureDebCours4 = heureDebutCours4
      $rootScope.heureDebCours5 = heureDebutCours5
      $rootScope.heureDebCours6 = heureDebutCours6
      $rootScope.dateDebCours = dateDebutCours
      $rootScope.jourCours1 = jCours1
      $rootScope.jourCours2 = jCours2
      $rootScope.jourCours3 = jCours3
      $rootScope.jourCours4 = jCours4
      $rootScope.jourCours5 = jCours5
      $rootScope.jourCours6 = jCours6

      // Email to and from
      mail.to='audrey.deligand@hei.fr'
      mail.from='audreyd@capmission.com'

      // Envoie de l'objet du mail et de son contenu
      mail.subject= 'MOB - AJOUT COURS - NON INSCRIT. '
      // mail.body= 'Informations concernant le tuteur : \nNom et Prénom : ' +$rootScope.nomPrenomParent+ '\nTéléphone : ' +$rootScope.telParent+ '\nE-mail : ' +$rootScope.emailParent+ '\nComment a t-il connu CapMission ? '
      //   +$rootScope.choixP+ '\nSi Autre : ' +$rootScope.raisonAutre+ '\nInformations concernant l étudiant : \nNom et Prénom : ' +$rootScope.nomPrenomE+ '\nTéléphone : ' +$rootScope.telE+ '\nE-mail : ' +$rootScope.emailE+
      //   '\nDate de Naissance :' +$rootScope.dateNaissanceE+ '\nEcole : ' +$rootScope.ecoleE+ '\nType de cours : ' +$rootScope.coursParticulier+ '\nMission : ' +$rootScope.choixMiss+ '\nSection : ' +$rootScope.choixS+
      //   '\nNiveau : ' +$rootScope.choixN+ '\nMatière du cours : ' +$rootScope.choixMat+ '\nNombre de jour de cours : ' +$rootScope.nbJoursC+ '\nHeure du 1er cours : ' +moment(heureDebutCours1).format('HH:mm')+
      //   '/ Jour du 1er cours : ' +$rootScope.jourCours1+ '\nHeure du 2ème cours : ' +moment(heureDebutCours2).format('HH:mm')+ '/ Jour du 2ème cours : ' +$rootScope.nbJoursCours2+
      //   '\nHeure du 3ème cours : ' +moment(heureDebutCours3).format('HH:mm')+ '/ Jours du 3ème cours : ' +$rootScope.jourCours3+ '\nHeure du 4ème cours : ' +moment(heureDebutCours4).format('HH:mm')+
      //   '/ Jour du 4ème cours : ' +$rootScope.jourCours4+ '\nHeure du 5ème jours : ' +moment(heureDebutCours5).format('HH:mm')+ '/ Jour du 5ème cours : ' +$rootScope.jourCours5+ '\nHeure du 6ème cours : '
      //   +moment(heureDebutCours6).format('HH:mm')+ '/ Jour du 6ème cours : ' +$rootScope.jourCours6+ '\nSi un seul jour : ' +moment(heureDebutCours).format('HH:mm')+ ' / ' +$rootScope.dateDebCours+
      //   '\nMessage du tuteur : ' +mail.body


      if($rootScope.heureDebCours1 == null && $rootScope.heureDebCours2 == null && $rootScope.heureDebCours3 == null && $rootScope.heureDebCours4 == null && $rootScope.heureDebCours5 == null
        && $rootScope.heureDebCours6 == null && $rootScope.jourCours1 == null && $rootScope.jourCours2 == null && $rootScope.jourCours3 == null && $rootScope.jourCours4 == null && $rootScope.jourCours5 == null &&
        $rootScope.jourCours6 == null){
          mail.body= 'Informations concernant le tuteur : \nNom et Prénom : ' +$rootScope.nomPrenomParent+ '\nTéléphone : ' +$rootScope.telParent+ '\nE-mail : ' +$rootScope.emailParent+ '\nComment a t-il connu CapMission ? '
          +$rootScope.choixP+ '\nSi Autre : ' +$rootScope.raisonAutre+ '\nInformations concernant l étudiant : \nNom et Prénom : ' +$rootScope.nomPrenomE+ '\nTéléphone : ' +$rootScope.telE+ '\nE-mail : ' +$rootScope.emailE+
          '\nDate de Naissance :' +$rootScope.dateNaissanceE+ '\nEcole : ' +$rootScope.ecoleE+ '\nType de cours : ' +$rootScope.coursParticulier+ '\nMission : ' +$rootScope.choixMiss+ '\nSection : ' +$rootScope.choixS+
          '\nNiveau : ' +$rootScope.choixN+ '\nMatière du cours : ' +$rootScope.choixMat+ '\nNombre de jour de cours : ' +$rootScope.nbJoursC+ '\nHeure du cours : '  +moment(heureDebutCours).format('HH:mm')+
            ' - Jour du cours : ' +$rootScope.dateDebCours+ '\nMessage du tuteur : ' +mail.body+ '\n \n \n' +$rootScope.nomPrenomParent+ ';' +$rootScope.telParent+ ';' +$rootScope.emailParent+ ';' +$rootScope.choixP+ ';'
            +$rootScope.raisonAutre+ ';' +$rootScope.nomPrenomE+ ';' +$rootScope.telE+ ';' +$rootScope.emailE+ ';' +$rootScope.dateNaissanceE+ ';' +$rootScope.ecoleE+ ';' +$rootScope.coursParticulier+ ';' +$rootScope.choixMiss+
              ';' +$rootScope.choixS+ ';' +$rootScope.choixN+ ';' +$rootScope.choixMat+ ';' +$rootScope.nbJoursC+ ';' +moment(heureDebutCours).format('HH:mm')+ ';' +$rootScope.dateDebCours+ ';' +mail.body
      }else{
          if($rootScope.heureDebCours == null && $rootScope.dateDebCours == null && $rootScope.heureDebCours3 == null && $rootScope.heureDebCours4 == null && $rootScope.heureDebCours5 == null && $rootScope.heureDebCours6 == null
          && $rootScope.jourCours3 == null && $rootScope.jourCours4 == null && $rootScope.jourCours5 == null && $rootScope.jourCours6 == null){
            mail.body= 'Informations concernant le tuteur : \nNom et Prénom : ' +$rootScope.nomPrenomParent+ '\nTéléphone : ' +$rootScope.telParent+ '\nE-mail : ' +$rootScope.emailParent+ '\nComment a t-il connu CapMission ? '
              +$rootScope.choixP+ '\nSi Autre : ' +$rootScope.raisonAutre+ '\nInformations concernant l étudiant : \nNom et Prénom : ' +$rootScope.nomPrenomE+ '\nTéléphone : ' +$rootScope.telE+ '\nE-mail : ' +$rootScope.emailE+
              '\nDate de Naissance :' +$rootScope.dateNaissanceE+ '\nEcole : ' +$rootScope.ecoleE+ '\nType de cours : ' +$rootScope.coursParticulier+ '\nMission : ' +$rootScope.choixMiss+ '\nSection : ' +$rootScope.choixS+
              '\nNiveau : ' +$rootScope.choixN+ '\nMatière du cours : ' +$rootScope.choixMat+ '\nNombre de jour de cours : ' +$rootScope.nbJoursC+ '\nHeure du 1er cours : ' +moment(heureDebutCours1).format('HH:mm')+
              '/ Jour du 1er cours : ' +$rootScope.jourCours1+ '\nHeure du 2ème cours : ' +moment(heureDebutCours2).format('HH:mm')+ '/ Jour du 2ème cours : ' +$rootScope.jourCours2+ '\nMessage du tuteur : ' +mail.body
            '\n \n \n' +$rootScope.nomPrenomParent+ ';' +$rootScope.telParent+ ';' +$rootScope.emailParent+ ';' +$rootScope.choixP+ ';' +$rootScope.raisonAutre+ ';' +$rootScope.nomPrenomE+ ';' +$rootScope.telE+ ';'
            +$rootScope.emailE+ ';' +$rootScope.dateNaissanceE+ ';' +$rootScope.ecoleE+ ';' +$rootScope.coursParticulier+ ';' +$rootScope.choixMiss+ ';' +$rootScope.choixS+ ';' +$rootScope.choixN+ ';'
            +$rootScope.choixMat+ ';' +$rootScope.nbJoursC+ ';' +moment(heureDebutCours1).format('HH:mm')+ ';' +$rootScope.jourCours1+ ';' +moment(heureDebutCours2).format('HH:mm')+ ';' +$rootScope.jourCours2+
            ';' +mail.body
          }else{
            if($rootScope.heureDebCours == null && $rootScope.dateDebCours == null && $rootScope.heureDebCours4 == null && $rootScope.heureDebCours5 == null && $rootScope.heureDebCours6 == null
              && $rootScope.jourCours4 == null && $rootScope.jourCours5 == null && $rootScope.jourCours6 == null){
              mail.body= 'Informations concernant le tuteur : \nNom et Prénom : ' +$rootScope.nomPrenomParent+ '\nTéléphone : ' +$rootScope.telParent+ '\nE-mail : ' +$rootScope.emailParent+ '\nComment a t-il connu CapMission ? '
                +$rootScope.choixP+ '\nSi Autre : ' +$rootScope.raisonAutre+ '\nInformations concernant l étudiant : \nNom et Prénom : ' +$rootScope.nomPrenomE+ '\nTéléphone : ' +$rootScope.telE+ '\nE-mail : ' +$rootScope.emailE+
                '\nDate de Naissance :' +$rootScope.dateNaissanceE+ '\nEcole : ' +$rootScope.ecoleE+ '\nType de cours : ' +$rootScope.coursParticulier+ '\nMission : ' +$rootScope.choixMiss+ '\nSection : ' +$rootScope.choixS+
                '\nNiveau : ' +$rootScope.choixN+ '\nMatière du cours : ' +$rootScope.choixMat+ '\nNombre de jour de cours : ' +$rootScope.nbJoursC+ '\nHeure du 1er cours : ' +moment(heureDebutCours1).format('HH:mm')+
                '/ Jour du 1er cours : ' +$rootScope.jourCours1+ '\nHeure du 2ème cours : ' +moment(heureDebutCours2).format('HH:mm')+ '/ Jour du 2ème cours : ' +$rootScope.jourCours2+
                '\nHeure du 3ème cours : ' +moment(heureDebutCours3).format('HH:mm')+ '/ Jours du 3ème cours : ' +$rootScope.jourCours3+ '\nMessage du tuteur : ' +mail.body
              '\n \n \n' +$rootScope.nomPrenomParent+ ';' +$rootScope.telParent+ ';' +$rootScope.emailParent+ ';' +$rootScope.choixP+ ';' +$rootScope.raisonAutre+ ';' +$rootScope.nomPrenomE+ ';' +$rootScope.telE+ ';'
              +$rootScope.emailE+ ';' +$rootScope.dateNaissanceE+ ';' +$rootScope.ecoleE+ ';' +$rootScope.coursParticulier+ ';' +$rootScope.choixMiss+ ';' +$rootScope.choixS+ ';' +$rootScope.choixN+ ';'
              +$rootScope.choixMat+ ';' +$rootScope.nbJoursC+ ';' +moment(heureDebutCours1).format('HH:mm')+ ';' +$rootScope.jourCours1+ ';' +moment(heureDebutCours2).format('HH:mm')+ ';' +$rootScope.jourCours2+
              ';' +moment(heureDebutCours3).format('HH:mm')+ ';' +$rootScope.jourCours3+ ';' +mail.body
            }else{
              if($rootScope.heureDebCours == null && $rootScope.dateDebCours == null && $rootScope.heureDebCours5 == null && $rootScope.heureDebCours6 == null && $rootScope.jourCours5 == null && $rootScope.jourCours6 == null){
                mail.body= 'Informations concernant le tuteur : \nNom et Prénom : ' +$rootScope.nomPrenomParent+ '\nTéléphone : ' +$rootScope.telParent+ '\nE-mail : ' +$rootScope.emailParent+ '\nComment a t-il connu CapMission ? '
                  +$rootScope.choixP+ '\nSi Autre : ' +$rootScope.raisonAutre+ '\nInformations concernant l étudiant : \nNom et Prénom : ' +$rootScope.nomPrenomE+ '\nTéléphone : ' +$rootScope.telE+ '\nE-mail : ' +$rootScope.emailE+
                  '\nDate de Naissance :' +$rootScope.dateNaissanceE+ '\nEcole : ' +$rootScope.ecoleE+ '\nType de cours : ' +$rootScope.coursParticulier+ '\nMission : ' +$rootScope.choixMiss+ '\nSection : ' +$rootScope.choixS+
                  '\nNiveau : ' +$rootScope.choixN+ '\nMatière du cours : ' +$rootScope.choixMat+ '\nNombre de jour de cours : ' +$rootScope.nbJoursC+ '\nHeure du 1er cours : ' +moment(heureDebutCours1).format('HH:mm')+
                  '/ Jour du 1er cours : ' +$rootScope.jourCours1+ '\nHeure du 2ème cours : ' +moment(heureDebutCours2).format('HH:mm')+ '/ Jour du 2ème cours : ' +$rootScope.jourCours2+
                  '\nHeure du 3ème cours : ' +moment(heureDebutCours3).format('HH:mm')+ '/ Jours du 3ème cours : ' +$rootScope.jourCours3+ '\nHeure du 4ème cours : ' +moment(heureDebutCours4).format('HH:mm')+
                  '/ Jour du 4ème cours : ' +$rootScope.jourCours4+ '\nMessage du tuteur : ' +mail.body
                '\n \n \n' +$rootScope.nomPrenomParent+ ';' +$rootScope.telParent+ ';' +$rootScope.emailParent+ ';' +$rootScope.choixP+ ';' +$rootScope.raisonAutre+ ';' +$rootScope.nomPrenomE+ ';' +$rootScope.telE+ ';'
                +$rootScope.emailE+ ';' +$rootScope.dateNaissanceE+ ';' +$rootScope.ecoleE+ ';' +$rootScope.coursParticulier+ ';' +$rootScope.choixMiss+ ';' +$rootScope.choixS+ ';' +$rootScope.choixN+ ';'
                +$rootScope.choixMat+ ';' +$rootScope.nbJoursC+ ';' +moment(heureDebutCours1).format('HH:mm')+ ';' +$rootScope.jourCours1+ ';' +moment(heureDebutCours2).format('HH:mm')+ ';' +$rootScope.jourCours2+
                ';' +moment(heureDebutCours3).format('HH:mm')+ ';' +$rootScope.jourCours3+ ';' +moment(heureDebutCours4).format('HH:mm')+ ';' +$rootScope.jourCours4+ ';' +mail.body
              }else{
                if($rootScope.heureDebCours == null && $rootScope.dateDebCours == null && $rootScope.heureDebCours6 == null && $rootScope.jourCours6 == null){
                  mail.body= 'Informations concernant le tuteur : \nNom et Prénom : ' +$rootScope.nomPrenomParent+ '\nTéléphone : ' +$rootScope.telParent+ '\nE-mail : ' +$rootScope.emailParent+ '\nComment a t-il connu CapMission ? '
                    +$rootScope.choixP+ '\nSi Autre : ' +$rootScope.raisonAutre+ '\nInformations concernant l étudiant : \nNom et Prénom : ' +$rootScope.nomPrenomE+ '\nTéléphone : ' +$rootScope.telE+ '\nE-mail : ' +$rootScope.emailE+
                    '\nDate de Naissance :' +$rootScope.dateNaissanceE+ '\nEcole : ' +$rootScope.ecoleE+ '\nType de cours : ' +$rootScope.coursParticulier+ '\nMission : ' +$rootScope.choixMiss+ '\nSection : ' +$rootScope.choixS+
                    '\nNiveau : ' +$rootScope.choixN+ '\nMatière du cours : ' +$rootScope.choixMat+ '\nNombre de jour de cours : ' +$rootScope.nbJoursC+ '\nHeure du 1er cours : ' +moment(heureDebutCours1).format('HH:mm')+
                    '/ Jour du 1er cours : ' +$rootScope.jourCours1+ '\nHeure du 2ème cours : ' +moment(heureDebutCours2).format('HH:mm')+ '/ Jour du 2ème cours : ' +$rootScope.jourCours2+
                    '\nHeure du 3ème cours : ' +moment(heureDebutCours3).format('HH:mm')+ '/ Jours du 3ème cours : ' +$rootScope.jourCours3+ '\nHeure du 4ème cours : ' +moment(heureDebutCours4).format('HH:mm')+
                    '/ Jour du 4ème cours : ' +$rootScope.jourCours4+ '\nHeure du 5ème jours : ' +moment(heureDebutCours5).format('HH:mm')+ '/ Jour du 5ème cours : ' +$rootScope.jourCours5+
                    '\nMessage du tuteur : ' +mail.body
                  '\n \n \n' +$rootScope.nomPrenomParent+ ';' +$rootScope.telParent+ ';' +$rootScope.emailParent+ ';' +$rootScope.choixP+ ';' +$rootScope.raisonAutre+ ';' +$rootScope.nomPrenomE+ ';' +$rootScope.telE+ ';'
                  +$rootScope.emailE+ ';' +$rootScope.dateNaissanceE+ ';' +$rootScope.ecoleE+ ';' +$rootScope.coursParticulier+ ';' +$rootScope.choixMiss+ ';' +$rootScope.choixS+ ';' +$rootScope.choixN+ ';'
                  +$rootScope.choixMat+ ';' +$rootScope.nbJoursC+ ';' +moment(heureDebutCours1).format('HH:mm')+ ';' +$rootScope.jourCours1+ ';' +moment(heureDebutCours2).format('HH:mm')+ ';' +$rootScope.jourCours2+
                  ';' +moment(heureDebutCours3).format('HH:mm')+ ';' +$rootScope.jourCours3+ ';' +moment(heureDebutCours4).format('HH:mm')+ ';' +$rootScope.jourCours4+ ';' +moment(heureDebutCours5).format('HH:mm')+
                  ';' +$rootScope.jourCours5+ ';' +mail.body
                }else{
                  if($rootScope.heureDebCours == null && $rootScope.dateDebCours == null) {
                    mail.body = 'Informations concernant le tuteur : \nNom et Prénom : ' + $rootScope.nomPrenomParent + '\nTéléphone : ' + $rootScope.telParent + '\nE-mail : ' + $rootScope.emailParent + '\nComment a t-il connu CapMission ? '
                      + $rootScope.choixP + '\nSi Autre : ' + $rootScope.raisonAutre + '\nInformations concernant l étudiant : \nNom et Prénom : ' + $rootScope.nomPrenomE + '\nTéléphone : ' + $rootScope.telE + '\nE-mail : ' + $rootScope.emailE +
                      '\nDate de Naissance :' + $rootScope.dateNaissanceE + '\nEcole : ' + $rootScope.ecoleE + '\nType de cours : ' + $rootScope.coursParticulier + '\nMission : ' + $rootScope.choixMiss + '\nSection : ' + $rootScope.choixS +
                      '\nNiveau : ' + $rootScope.choixN + '\nMatière du cours : ' + $rootScope.choixMat + '\nNombre de jour de cours : ' + $rootScope.nbJoursC + '\nHeure du 1er cours : ' + moment(heureDebutCours1).format('HH:mm') +
                      '/ Jour du 1er cours : ' + $rootScope.jourCours1 + '\nHeure du 2ème cours : ' + moment(heureDebutCours2).format('HH:mm') + '/ Jour du 2ème cours : ' + $rootScope.jourCours2 +
                      '\nHeure du 3ème cours : ' + moment(heureDebutCours3).format('HH:mm') + '/ Jours du 3ème cours : ' + $rootScope.jourCours3 + '\nHeure du 4ème cours : ' + moment(heureDebutCours4).format('HH:mm') +
                      '/ Jour du 4ème cours : ' + $rootScope.jourCours4 + '\nHeure du 5ème jours : ' + moment(heureDebutCours5).format('HH:mm') + '/ Jour du 5ème cours : ' + $rootScope.jourCours5 + '\nHeure du 6ème cours : '
                      +moment(heureDebutCours6).format('HH:mm')+ '/ Jour du 6ème cours : ' +$rootScope.jourCours6+ '\nMessage du tuteur : ' + mail.body
                    '\n \n \n' +$rootScope.nomPrenomParent+ ';' +$rootScope.telParent+ ';' +$rootScope.emailParent+ ';' +$rootScope.choixP+ ';' +$rootScope.raisonAutre+ ';' +$rootScope.nomPrenomE+ ';' +$rootScope.telE+ ';'
                    +$rootScope.emailE+ ';' +$rootScope.dateNaissanceE+ ';' +$rootScope.ecoleE+ ';' +$rootScope.coursParticulier+ ';' +$rootScope.choixMiss+ ';' +$rootScope.choixS+ ';' +$rootScope.choixN+ ';'
                    +$rootScope.choixMat+ ';' +$rootScope.nbJoursC+ ';' +moment(heureDebutCours1).format('HH:mm')+ ';' +$rootScope.jourCours1+ ';' +moment(heureDebutCours2).format('HH:mm')+ ';' +$rootScope.jourCours2+
                    ';' +moment(heureDebutCours3).format('HH:mm')+ ';' +$rootScope.jourCours3+ ';' +moment(heureDebutCours4).format('HH:mm')+ ';' +$rootScope.jourCours4+ ';' +moment(heureDebutCours5).format('HH:mm')+
                    ';' +$rootScope.jourCours5+ ';' +moment(heureDebutCours6).format('HH:mm')+ ';' +$rootScope.jourCours6+ ';' +mail.body
                  }
                }
              }
            }
          }
      }



      console.log('to: '+mail.to)
      console.log('from: '+mail.from)
      console.log('subject: '+mail.subject)
      console.log('body: '+mail.body)

      $ionicLoading.show({
        template: "En cours d'envoi !"
      });
      $http.post('http://51.255.195.19:8182/CapMissionApp/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
        $ionicLoading.hide();
        toastr.success('Votre commande a été envoyé avec succès')
        //$ionicHistory.goBack();
        $location.path('/login');
      }).error(function (data, status) {
        if (status == 0) {
          toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Veuillez nous excuser !', {displayDuration: 1000});
          navigator.app.exitApp();
        }
        else {
          $ionicLoading.hide();
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

authentication.controller('DisponibiliteCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading', '$ionicPopup',
  function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading, $ionicPopup) {

    $scope.voirDispo = function (field) {
      $scope.data = {};

      $scope.disponibilities = [
        {indexD: 'id1', cb: 'Lundi 9h-10h30'},
        {indexD: 'id2', cb: 'Lundi 10h30-12h'}
      ];

      var tab = []

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="disponibility in disponibilities">' +
        '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{disponibility.cb}}</ion-checkbox>' +
        // '<span ng-repeat="disponibility in disponibilities">' +
        // '<label class="checkbox" for="{{$index}}"><input type="checkbox" ng-model="disponibility.index" name="group"/>{{disponibility.cb}}</label></span>' +
        // '<ion-checkbox ng-model="courELE.cb2"  ng-checked="courELE.cb2">{{courELE.cb2}}</ion-checkbox>' +
        '</div></ion-scroll>',
        title: 'Sélectionner le ou les créneau(x) qui vous conviennent :',
        // subTitle: 'Pensez à utilisez un Login simple à retenir',
        scope: $scope,
        buttons: [
          { text: '<b>Annuler</b>',
            type: 'buttonEmp3',},
          {
            text: '<b>Valider</b>',
            type: 'buttonEmp2',
            onTap: function(e) {
              console.log('la longueur de la liste est : ' +$scope.disponibilities.length)
              for(i = 0; i < $scope.disponibilities.length; i++){
                console.log($scope.disponibilities[i].indexD)
                // var parseFun = $parse($scope.disponibilities[i].indexD)
                // setter(parseFun, '$scope.disponibilities[i].indexD');

                // $scope.creneauELE[i] = $scope.disponibilities[i].indexD
                // console.log('Le model est : ' +$scope.creneauELE[i])

                // if ($scope.disponibilities[i].indexD == 'id1') {
                //   id = $scope.disponibilities[i].indexD
                //   //don't allow the user to close unless he enters wifi password
                //   e.preventDefault();
                //   console.log('le model est : ' +$scope.disponibilities.length)
                //   tab = push(id)
                //   return $scope.tab
                  // toastr.error('Veuillez choisir un créneau minimum !', {displayDuration: 1000});

                // }
              }

              }
            }
          ]
        });

      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });
    };

    //Méthode pour modifier le mot de passe
    $scope.modifMdp = function () {
      $scope.data = {};

      myPopup.then(function(res) {
        console.log('Tapped!', res);
      })
//       $scope.data = { hasWorkEntry: true };
//
//       $ionicPopup.show({
//         title: 'Are you sure you want to open the garage?',
//         content: '<ion-checkbox ng-model="data.hasWorkEntry" ng-checked="data.hasWorkEntry">Mark as Work Entry?</ion-checkbox>',
//         scope: $scope,
//         buttons: [
//           {text: 'Cancel'},
//           {
//             text: '<b>OK</b>',
//             type: 'button-positive',
//             onTap: function(e) { return e; }
//           }
//         ]
//       })
//         .then(function(res) {
//           if (res)
//           {
//             console.log('You asked to open it!');
//             if($scope.data.hasWorkEntry) {
//               console.log('and also to mark this as a work log (entry or leave)!');
//             }
//           }
//         });
//     };
//
// // using Confirm()
// // Ps.: In the Cordova Docs, the Confirm() doesn't have a scope param, but it works if you pass it
//     $scope.pedestrianToggle = function() {
//       $scope.data = { hasWorkEntry: true };
//       $ionicPopup.confirm({
//         title: 'Tem certeza que deseja abrir o Portão de Pedestres?',
//         content: '<ion-checkbox ng-model="data.hasWorkEntry" ng-checked="data.hasWorkEntry">Marcar como ponto?</ion-checkbox>',
//         scope: $scope
//       })
//         .then(function(res) {
//           if(res) {
//             console.log('You are sure');
//             if($scope.data.hasWorkEntry) {
//               console.log('ponto!');
//             }
//           }
//         });
    }


    $scope.goRecapitulatif = function (nomPrenomP, telP, emailP, choixParent, autreRaison, nomPrenomEnfant, telEnfant, emailEnfant, dateNaissanceEnfant, ecoleEnfant, coursParti, coursEnGpe, choixMission, choixSection,
                                       choixNiveau, choixMatiere, dateDebutCours, plusieursCours, nbJoursCours) {

      $rootScope.nomPrenomParent = nomPrenomP
      $rootScope.telParent = telP
      $rootScope.emailParent = emailP
      $rootScope.choixP = choixParent
      $rootScope.raisonAutre = autreRaison
      $rootScope.nomPrenomE = nomPrenomEnfant
      $rootScope.telE = telEnfant
      $rootScope.emailE = emailEnfant
      $rootScope.dateNaissanceE = dateNaissanceEnfant
      $rootScope.ecoleE = ecoleEnfant
      $rootScope.coursParticulier = coursParti
      $rootScope.coursEnGroupe = coursEnGpe
      $rootScope.choixMiss = choixMission
      $rootScope.choixS = choixSection
      $rootScope.choixN = choixNiveau
      $rootScope.choixMat = choixMatiere
      $rootScope.dateDebCours = dateDebutCours
      $rootScope.plusCours = plusieursCours
      $rootScope.nbJoursC = nbJoursCours
      $location.path('/recapitulatifNonInscrit')
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
