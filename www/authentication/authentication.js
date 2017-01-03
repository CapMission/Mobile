var authentication = angular.module('capMission.authentication', ['ionic','ionicProcessSpinner','ngAnimate','toaster']);
authentication.controller('RoleCtrl',['$scope','$ionicPopover','$ionicHistory',  function ($scope,$ionicPopover,$ionicHistory) {

  $ionicPopover.fromTemplateUrl('teacher/popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
}]);
authentication.controller('HomePageCtrl',['$scope','$rootScope',  function ($scope,$rootScope) {


}]);

// Controller pour identifiant oublié
authentication.controller('IdentifiantOublieCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading','toaster','URL_API',
  function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading,toaster,URL_API) {

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

      $http.get(URL_API+'/users/get/' + $scope.name , {timeout: 35000}).success(function (data, status, headers, config) {
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
          navigator.app.exitApp();

          //$ionicHistory.goBack();
        }).error(function (data, status) {
          if (status == 0) {
            toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Veuillez nous excuser !', {displayDuration: 1000});
            navigator.app.exitApp();
          }
          else {
            toastr.error("Echec envoi de message ! Réessayez plus tart !")
            navigator.app.exitApp();
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

authentication.controller('InscriptionCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading','URL_API',
  function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading,URL_API) {

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


authentication.controller('ChoixCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading','URL_API', function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading,URL_API) {
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
    //toastr.clear();

  };
  $scope.idParent = window.localStorage.getItem('id')
  //console.log('parent object : ' + $rootScope.parent)
  //$ionicLoading.show();
  $scope.getd = function(){}
  // $id = $rootScope.resp.entity.id
  $scope.getP = function (id) {
    $http.get(URL_API+'/parents/' + id, {timeout: 35000}).success(function (data, status, headers, config) {
      //$scope.test="safaa"
      $rootScope.parent = data
      window.localStorage.setItem("parent", JSON.stringify(data));

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
          $http.get(URL_API+'/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {

            $rootScope.son = data
            window.localStorage.setItem("son1", JSON.stringify(data));
            $ionicLoading.hide();
            console.log('value : ' + window.localStorage.getItem('login'))
            // Redirige vers la page de l'emploi directement
            $location.path('/parent/emploiEnfant2');

          }).error(function (data) {

            if(window.localStorage.getItem("son1") !== undefined) {
              $rootScope.son = JSON.parse(window.localStorage.getItem("son1"));
              $ionicLoading.hide();
              $location.path('/parent/emploiEnfant2');
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
            console.log('Le nombre des enfants est :' + $rootScope.parent.entity.students.length)
            // On fait un for pour parcourir l'arrayList (car c'est une liste d'étudiants)
            for (index = 0; index < 2; ++index) {
              /*$rootScope.variable = $rootScope.parent
              $rootScope.variableA = $rootScope.variable.lastIndexOf(name);*/
              name = $rootScope.parent.entity.students[index].name
            }
            console.log(name)

            if (name == $rootScope.parent.entity.name) {

              for (index = 0; index < 1; ++index) {
                id = $rootScope.parent.entity.students[index].id
                console.log(id)
              }

              $http.get(URL_API+'/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {

                $rootScope.son = data
                window.localStorage.setItem("son2", JSON.stringify(data));
                $ionicLoading.hide();
                console.log('value : ' + window.localStorage.getItem('login'))
                $location.path('/parent/emploiEnfant2');

              }).error(function (data) {

                if(window.localStorage.getItem("son2") !== undefined) {
                  $rootScope.son = JSON.parse(window.localStorage.getItem("son2"));
                  $ionicLoading.hide();
                  $location.path('/parent/emploiEnfant2');
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
          } else {
            $location.path('/choix');
          }
        }
      }
      $ionicLoading.hide();
      //console.log('Data choix'+JSON.stringify({data: data}))
      //$location.path('/choix');
    }).error(function (data) {

      if(window.localStorage.getItem("parent") !== undefined) {
        $rootScope.parent = JSON.parse(window.localStorage.getItem("parent"));
        $ionicLoading.hide();
        // Dans le cas où la personne n'a qu'un enfant
        if ($rootScope.parent.entity.students.length == '1') {

          if(window.localStorage.getItem("son1") !== undefined) {
            $rootScope.son = JSON.parse(window.localStorage.getItem("son1"));
            $ionicLoading.hide();
            $location.path('/parent/emploiEnfant2');
          }
          else {
            toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
            navigator.app.exitApp();
          }

      /*    console.log('Le nombre des enfants est :' + $rootScope.parent.entity.students.length)

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
            window.localStorage.setItem("son1", JSON.stringify(data));
            $ionicLoading.hide();
            console.log('value : ' + window.localStorage.getItem('login'))
            // Redirige vers la page de l'emploi directement
            $location.path('/parent/emploiEnfant2');

          }).error(function (data) {

            if(window.localStorage.getItem("son1") !== undefined) {
              $rootScope.son = JSON.parse(window.localStorage.getItem("son1"));
              $ionicLoading.hide();
              $location.path('/parent/emploiEnfant2');
            }
            else {
              toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
              navigator.app.exitApp();
            }
            //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
            /!*toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
             navigator.app.exitApp();*!/
          })*/
        } else {
          // Dans le cas où l'étudiant est aussi parent
          if ($rootScope.parent.entity.students.length == '2') {

            console.log($rootScope.parent.entity.name)
            console.log('Le nombre des enfants est :' + $rootScope.parent.entity.students.length)
            // On fait un for pour parcourir l'arrayList (car c'est une liste d'étudiants)
            for (index = 0; index < 2; ++index) {
              /*$rootScope.variable = $rootScope.parent
               $rootScope.variableA = $rootScope.variable.lastIndexOf(name);*/
              name = $rootScope.parent.entity.students[index].name
            }
            console.log(name)

            if (name == $rootScope.parent.entity.name) {


              if(window.localStorage.getItem("son2") !== undefined) {
                $rootScope.son = JSON.parse(window.localStorage.getItem("son2"));
                $ionicLoading.hide();
                $location.path('/parent/emploiEnfant2');
              }
              else {
                toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
                navigator.app.exitApp();
              }

          /*    for (index = 0; index < 1; ++index) {
                id = $rootScope.parent.entity.students[index].id
                console.log(id)
              }

              $http.get(URL_API+'/students/' + id, {timeout: 35000}).success(function (data, status, headers, config) {

                $rootScope.son = data
                window.localStorage.setItem("son2", JSON.stringify(data));
                $ionicLoading.hide();
                console.log('value : ' + window.localStorage.getItem('login'))
                $location.path('/parent/emploiEnfant2');

              }).error(function (data) {

                if(window.localStorage.getItem("son2") !== undefined) {
                  $rootScope.son = JSON.parse(window.localStorage.getItem("son2"));
                  $ionicLoading.hide();
                  $location.path('/parent/emploiEnfant2');
                }
                else {
                  toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
                  navigator.app.exitApp();
                }
                //alert("Désolés , échec de connexion ! Veuillez réessayer dans quelques instants !")
                /!*toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
                 navigator.app.exitApp();*!/
              })*/
            } else {
              $location.path('/choix');
            }
          } else {
            $location.path('/choix');
          }
        }
      }
      else {
        toastr.error('Echec de connexion ! Veuillez réessayer dans quelques instants !', 'Désolés !', {displayDuration: 1000});
        navigator.app.exitApp();
      }
      /*toastr.error('Echec de connexion');*/

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
       console.log('success')
      })
      .catch(function(response,error,status) {
        console.log('resp' + response)
        console.log('error' + error)
        console.log('status' + status)
      });
  };
  $scope.logout = function() {
    $auth.logout();
  };

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };
});

authentication.controller('InfoEleveCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading','URL_API',
  function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading,URL_API) {

    $scope.goMatierePart = function (nomPrenomParent, telParent, emailParent, choixP, raisonAutre, nomPrenomE, dateNaissanceE, telE,
                                     emailE, ecoleE, coursParticulier, coursEnGroupe) {

      // dateN = new Date(dateNaissanceE).toLocaleDateString('fr-FR', {
      //   hour: 'numeric',
      //   minute: 'numeric'
      // }).split(' ').join(' ');

      $rootScope.nomPrenomP = nomPrenomParent
      $rootScope.telP = telParent
      $rootScope.emailP = emailParent
      $rootScope.choixParent = choixP
      $rootScope.autreRaison = raisonAutre
      $rootScope.nomPrenomEnfant = nomPrenomE
      $rootScope.dateNaissanceEnfant = dateNaissanceE
      $rootScope.telEnfant = telE
      $rootScope.emailEnfant = emailE
      $rootScope.ecoleEnfant = ecoleE
      $rootScope.coursParti = coursParticulier
      $rootScope.coursEnGpe = coursEnGroupe
      $location.path('/choixMatiereNonInscrit')
    }


    $scope.goMatiereGpe = function (nomPrenomParent, telParent, emailParent, choixP, raisonAutre, nomPrenomE, dateNaissanceE, telE,
                                    emailE, ecoleE, coursParticulier, coursEnGroupe) {

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
      if ($rootScope.coursParti == 'Cours en Groupe') {
        $location.path('/choixMatiereCoursGroupe')
      }
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
  }
]);

authentication.controller('CatalogueCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading','URL_API',
  function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading,URL_API) {

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
    $ionicPopover.fromTemplateUrl('parent/parent-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
  }]);


authentication.controller('ChoixMatiereNonInscritCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading','URL_API',
  function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading,URL_API) {

    $scope.missions = ["Bilingue", "Mission Française", "Mission Belge", "Mission U.S.", "Mission Espagnole", "Enseignement Universitaire", "Adulte", "Informatique"]
    $scope.sections = ["Maternelle", "Primaire", "Collège", "Lycée"]
    $scope.sectionsB = ["Primaire", "Collège", "Lycée"]
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
    $scope.matieresAdultes = ["Débutant", "A1", "A2", "B1", "B2", "C1", "C2", "Business English", "IELTS", "SAT", "TOEFL", 'FLE', 'FLE Business', 'Test Français', 'ELE', 'ELE Business', 'ELE Test',
      'Arabe Communication', 'Arabe Business',]
    $scope.niveauxUniv = ["1ère année"]
    $scope.nveauxInfo = ["Essai", "Trimestre", "Annuel"]
    $scope.matieresMaternelle = ["Test Mission G.S."]

    //Matière pour la mission frnacaise et Belge
    $scope.matieresTS = ["Mathématiques", "Physique/Chimie", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie",]
    $scope.matieresTSOIB = ["Arabe OIB", "Hist/Géo Arabe OIB", "Mathématiques", "Physique/Chimie", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie"]
    $scope.matieresTES = ["Mathématiques", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie",
      "Economie", "Suivi scolaire", "Méthodologie"]
    $scope.matieresTESOIB = ["Arabe OIB", "Hist/Géo Arabe OIB", "Mathématiques", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie",
      "Economie"]
    $scope.matieresTL = ["Mathématiques", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie"]
    $scope.matieresTLOIB = ["Arabe OIB", "Hist/Géo Arabe OIB", "Mathématiques","SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie"]
    $scope.matieresTSTMG = ["Mathématiques", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie", "Economie/Droit", "Management",
      "Suivi scolaire", "Méthodologie"]
    $scope.matieresTSTMGOIB = ["Arabe OIB", "Hist/Géo Arabe OIB", "Mathématiques", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie", "Economie/Droit", "Management"]
    $scope.matieres1ereS = ["Mathématiques", "Physique/Chimie", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie",
      "Français", "SAT Mathématiques", "SAT English"]
    $scope.matieres1ereSOIB = ["Arabe OIB", "Hist/Géo Arabe OIB", "Français", "Mathématiques", "Physique/Chimie", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie"]
    $scope.matieres1ereES = ["Mathématiques", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie",
      "Economie", "Français", "SAT Mathématiques", "SAT English"]
    $scope.matieres1ereESOIB = ["Arabe OIB", "Hist/Géo Arabe OIB", "Mathématiques", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie",
      "Economie",,"Français", "SAT Mathématiques", "SAT English"]
    $scope.matieres1ereL = ["Mathématiques", "Physique/Chimie", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie",
      "Suivi scolaire", "Méthodologie", "Français", "SAT English"]
    $scope.matieres1ereLOIB = ["Arabe OIB", "Hist/Géo Arabe OIB", "Mathématiques", "Physique/Chimie", "SVT", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie",
      "Français", "SAT English"]
    $scope.matieres1ereSTMG = ["Français", "Mathématiques", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie", "Economie/Droit", "Management"]
    $scope.matieres1ereSTMGOIB = ["Arabe OIB", "Hist/Géo Arabe OIB", "Français", "Mathématiques", "Histoire/Géographie", "Espagnol LV", "Anglais LV", "Philosophie", "Economie/Droit", "Management"]
    $scope.matieres2nde = ["Mathématiques", "Physique/Chimie", "SVT", "Histoire/Géographie", "Espagnol LV", "Français", "Anglais LV",
      "SAT Mathématiques", "SAT English", "Economie", "Suivi scolaire", "Méthodologie"]
    $scope.matieres345eme = ["Arabe", "Aides aux devoirs", "Mathématiques", "Physique/Chimie", "SVT", "Histoire/Géographie", "Espagnol LV", "Français", "Anglais LV",
      "Technologie"]
    $scope.matieres6eme = ["Arabe", "Aides aux devoirs", "Mathématiques", "SVT", "Histoire/Géographie", "Espagnol LV", "Français", "Anglais LV"]
    $scope.matieresPrimaire = ["Arabe", "Aides aux devoirs", "Mathématiques", "Français", "Anglais LV"]
    $scope.matieresCE2 = ["Arabe", "Aides aux devoirs", "Mathématiques", "Français", "Anglais LV", "Test Mission CE2"]
    $scope.matieresCE1 = ["Arabe", "Aides aux devoirs", "Mathématiques", "Français", "Anglais LV", "Test Mission CE1"]
    $scope.matieresCM1 = ["Arabe", "Aides aux devoirs", "Mathématiques", "Français", "Anglais LV", "Test Mission Maths CM1", "Test Mission Français CM1"]
    $scope.matieresCM2 = ["Arabe", "Aides aux devoirs", "Mathématiques", "Français", "Anglais LV", "Test Mission Maths CM2", "Test Mission Français CM2"]

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
    $scope.matieresBacB = ["Mathématiques", "Physique/Chimie", "Espagnol", "Français", "Anglais", "Arabe"]
    $scope.matieresPrimaireB = ["Mathématiques", "Espagnol", "Français", "Anglais", "Arabe"]

    $scope.goTarif = function(nomPrenomP, telP, emailP, choixParent, autreRaison, nomPrenomEnfant, telEnfant, emailEnfant, dateNaissanceEnfant, ecoleEnfant, coursParti, coursEnGpe,
                              choixMission, choixSection, choixNiveau, choixMatiere, choixFiliere){
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
      $rootScope.chixF = choixFiliere
      $location.path('/tarifCours')
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

authentication.controller('NbJoursNnInscritCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading','URL_API',
  function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading,URL_API) {




    $scope.goDisp = function(nomPrenomParent, telParent, emailParent, choixP, raisonAutre, nomPrenomE, telE, emailE, dateNaissanceE, ecoleE, coursParticulier, coursEnGroupe, choixMiss, choixS, choixN, choixMat,
                             dateCours){

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
      $rootScope.datecours = dateCours
      $location.path('/disponibilite')
    }


    $scope.goDispo = function(nomPrenomParent, telParent, emailParent, choixP, raisonAutre, nomPrenomE, telE, emailE, dateNaissanceE, ecoleE, coursParticulier, coursEnGroupe, choixMiss, choixS, choixN,
                              choixMat, choixF, dateCours) {

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
      $rootScope.choixFiliere = choixF
      $rootScope.datecours = dateCours
      console.log('date !!' + $rootScope.datecours)
      $location.path('/dispoCoursPart')
    }



    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

  }]);

authentication.controller('RecapitulatifNonInscritCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading','URL_API',
  function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading,URL_API) {

    // if($rootScope.choixMission == 'Mission Française' && $rootScope.choixNiveau == 'Primaire'){

    $http.get('authentication/prix.json').success(function (data) {
      $rootScope.prixCours = data



    }).error(function (data) {
      $ionicLoading.hide()
      toastr.error('ECHEC', {displayDuration: 1000});
    });

    // }


    $rootScope.sendRecaptitulatif = function(mail, nomPrenomParent, telParent, emailParent, choixP, raisonAutre, nomPrenomE, telE, emailE, dateNaissanceE, ecoleE, coursParticulier, coursEnGroupe, choixMiss,
                                             choixS, choixN, choixMat, choixF, joursCoursNb, dateDebCours, horaire1, horaire2, horaire2, horaire3, horaire4, horaire5, horaire6, date1, date2,
                                             date2, date3, date4, date5, date6) {


      newDate = new Date(dateDebCours).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',

      }).split(' ').join(' ');

      dateNaissanceEnf = new Date(dateNaissanceE).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',

      }).split(' ').join(' ');

      $rootScope.nomPrenomP = nomPrenomParent
      $rootScope.telP = telParent
      $rootScope.emailP = emailParent
      $rootScope.choixParent = choixP
      $rootScope.autreRaison = raisonAutre
      $rootScope.nomPrenomEnfant = nomPrenomE
      $rootScope.telEnfant = telE
      $rootScope.emailEnfant = emailE
      $rootScope.dateNaissanceEnfant = dateNaissanceEnf
      $rootScope.ecoleEnfant = ecoleE
      $rootScope.coursParti = coursParticulier
      $rootScope.coursEnGpe = coursEnGroupe
      $rootScope.choixMission = choixMiss
      $rootScope.choixSection = choixS
      $rootScope.choixNiveau = choixN
      $rootScope.choixFiliere = choixF
      $rootScope.choixMatiere = choixMat
      $rootScope.nbJoursCours = joursCoursNb
      $rootScope.heureDebutCours1 = horaire1
      $rootScope.heureDebutCours2 = horaire2
      $rootScope.heureDebutCours3 = horaire3
      $rootScope.heureDebutCours4 = horaire4
      $rootScope.heureDebutCours5 = horaire5
      $rootScope.heureDebutCours6 = horaire6
      $rootScope.dateDebutCours = newDate
      $rootScope.date11 = date1
      $rootScope.date22 = date2
      $rootScope.date33 = date3
      $rootScope.date44 = date4
      $rootScope.date55 = date5
      $rootScope.date66 = date6


      // Email to and from
      mail.to='safaa.msika@gmail.com'
      mail.from='capmission.com@gmail.com'

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


      if($rootScope.heureDebCours2 == null && $rootScope.heureDebCours3 == null && $rootScope.heureDebCours4 == null && $rootScope.heureDebCours5 == null
        && $rootScope.heureDebCours6 == null && $rootScope.date22 == null && $rootScope.date33 == null && $rootScope.date44 == null && $rootScope.date55 == null && $rootScope.date66 == null){
        mail.body= 'Informations concernant le tuteur : \nNom et Prénom : ' +$rootScope.nomPrenomP+ '\nTéléphone : ' +$rootScope.telP+ '\nE-mail : ' +$rootScope.emailP+ '\nComment a t-il connu CapMission ? '
          +$rootScope.choixParent+ '\nSi Autre : ' +$rootScope.autreRaison+ '\nInformations concernant l étudiant : \nNom et Prénom : ' +$rootScope.nomPrenomEnfant+ '\nTéléphone : ' +$rootScope.telEnfant+ '\nE-mail : ' +$rootScope.emailEnfant+
          '\nDate de Naissance :' +$rootScope.dateNaissanceEnfant+ '\nEcole : ' +$rootScope.ecoleEnfant+ '\nType de cours : ' +$rootScope.coursParti+ '\nMission : ' +$rootScope.choixMission+ '\nSection : ' +$rootScope.choixSection+
          '\nNiveau : ' +$rootScope.choixNiveau+ '\nFilière : ' +$rootScope.choixF+ '\nMatière du cours : ' +$rootScope.choixMatiere+ '\nNombre de jour de cours par semaine : ' +$rootScope.nbJoursCours+ '\nDate du début des cours : ' +$rootScope.dateDebutCours+
          '\nHeure du cours : '  +moment($rootScope.heureDebutCours1).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date11+ '\nMessage du tuteur : ' +mail.body+ '\n \n \n' +$rootScope.nomPrenomP+ ';' +$rootScope.telP+ ';' +$rootScope.emailP+ ';' +
          +$rootScope.choixParent+ ';'
          +$rootScope.autreRaison+ ';' +$rootScope.nomPrenomEnfant+ ';' +$rootScope.telEnfant+ ';' +$rootScope.emailEnfant+ ';' +$rootScope.dateNaissanceEnfant+ ';' +$rootScope.ecoleEnfant+ ';' +$rootScope.coursParti+ ';' +$rootScope.choixMission+
          ';' +$rootScope.choixSection+ ';' +$rootScope.choixNiveau+ ';' +$rootScope.choixMatiere+ ';' +$rootScope.nbJoursCours+ ';' +$rootScope.dateDebutCours+ ';' +moment($rootScope.heureDebutCours1).format('HH:mm')+ ';' +$rootScope.date11+ ';' +mail.body
      }else{
        if($rootScope.heureDebCours3 == null && $rootScope.heureDebCours4 == null && $rootScope.heureDebCours5 == null
          && $rootScope.heureDebCours6 == null && $rootScope.date33 == null && $rootScope.date44 == null && $rootScope.date55 == null && $rootScope.date66 == null){
          mail.body= 'Informations concernant le tuteur : \nNom et Prénom : ' +$rootScope.nomPrenomP+ '\nTéléphone : ' +$rootScope.telP+ '\nE-mail : ' +$rootScope.emailP+ '\nComment a t-il connu CapMission ? '
            +$rootScope.choixParent+ '\nSi Autre : ' +$rootScope.autreRaison+ '\nInformations concernant l étudiant : \nNom et Prénom : ' +$rootScope.nomPrenomEnfant+ '\nTéléphone : ' +$rootScope.telEnfant+ '\nE-mail : ' +$rootScope.emailEnfant+
            '\nDate de Naissance :' +$rootScope.dateNaissanceEnfant+ '\nEcole : ' +$rootScope.ecoleEnfant+ '\nType de cours : ' +$rootScope.coursParti+ '\nMission : ' +$rootScope.choixMission+ '\nSection : ' +$rootScope.choixSection+
            '\nNiveau : ' +$rootScope.choixNiveau+ '\nFilière : ' +$rootScope.choixF+ '\nMatière du cours : ' +$rootScope.choixMatiere+ '\nNombre de jour de cours par semaine : ' +$rootScope.nbJoursCours+ '\nDate du début des cours : ' +$rootScope.dateDebutCours+
            '\nHeure du cours : '  +moment($rootScope.heureDebutCours1).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date11+ '\nHeure du cours : '  +moment($rootScope.heureDebutCours2).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date22+
            '\nMessage du tuteur : ' +mail.body+ '\n \n \n' +$rootScope.nomPrenomP+ ';' +$rootScope.telP+ ';' +$rootScope.emailP+ ';' +
            +$rootScope.choixParent+ ';'
            +$rootScope.autreRaison+ ';' +$rootScope.nomPrenomEnfant+ ';' +$rootScope.telEnfant+ ';' +$rootScope.emailEnfant+ ';' +$rootScope.dateNaissanceEnfant+ ';' +$rootScope.ecoleEnfant+ ';' +$rootScope.coursParti+ ';' +$rootScope.choixMission+
            ';' +$rootScope.choixSection+ ';' +$rootScope.choixNiveau+ ';' +$rootScope.choixMatiere+ ';' +$rootScope.nbJoursCours+ ';' +$rootScope.dateDebutCours+ ';' +moment($rootScope.heureDebutCours1).format('HH:mm')+ ';' +$rootScope.date11+ ';'
            +moment($rootScope.heureDebutCours2).format('HH:mm')+ ';' +$rootScope.date22+ ';' +mail.body
        }else{
          if($rootScope.heureDebCours4 == null && $rootScope.heureDebCours5 == null && $rootScope.heureDebCours6 == null && $rootScope.date44 == null && $rootScope.date55 == null && $rootScope.date66 == null){
            mail.body= 'Informations concernant le tuteur : \nNom et Prénom : ' +$rootScope.nomPrenomP+ '\nTéléphone : ' +$rootScope.telP+ '\nE-mail : ' +$rootScope.emailP+ '\nComment a t-il connu CapMission ? '
              +$rootScope.choixParent+ '\nSi Autre : ' +$rootScope.autreRaison+ '\nInformations concernant l étudiant : \nNom et Prénom : ' +$rootScope.nomPrenomEnfant+ '\nTéléphone : ' +$rootScope.telEnfant+ '\nE-mail : ' +$rootScope.emailEnfant+
              '\nDate de Naissance :' +$rootScope.dateNaissanceEnfant+ '\nEcole : ' +$rootScope.ecoleEnfant+ '\nType de cours : ' +$rootScope.coursParti+ '\nMission : ' +$rootScope.choixMission+ '\nSection : ' +$rootScope.choixSection+
              '\nNiveau : ' +$rootScope.choixNiveau+ '\nFilière : ' +$rootScope.choixF+ '\nMatière du cours : ' +$rootScope.choixMatiere+ '\nNombre de jour de cours par semaine : ' +$rootScope.nbJoursCours+ '\nDate du début des cours : ' +$rootScope.dateDebutCours+
              '\nHeure du cours : '  +moment($rootScope.heureDebutCours1).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date11+ '\nHeure du cours : '  +moment($rootScope.heureDebutCours2).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date22+
              '\nHeure du cours : '  +moment($rootScope.heureDebutCours3).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date33+ '\nMessage du tuteur : ' +mail.body+ '\n \n \n' +$rootScope.nomPrenomP+ ';' +$rootScope.telP+ ';' +$rootScope.emailP+ ';' +
              +$rootScope.choixParent+ ';'
              +$rootScope.autreRaison+ ';' +$rootScope.nomPrenomEnfant+ ';' +$rootScope.telEnfant+ ';' +$rootScope.emailEnfant+ ';' +$rootScope.dateNaissanceEnfant+ ';' +$rootScope.ecoleEnfant+ ';' +$rootScope.coursParti+ ';' +$rootScope.choixMission+
              ';' +$rootScope.choixSection+ ';' +$rootScope.choixNiveau+ ';' +$rootScope.choixMatiere+ ';' +$rootScope.nbJoursCours+ ';' +$rootScope.dateDebutCours+ ';' +moment($rootScope.heureDebutCours1).format('HH:mm')+ ';' +$rootScope.date11+ ';'
              +moment($rootScope.heureDebutCours2).format('HH:mm')+ ';' +$rootScope.date22+ ';' +moment($rootScope.heureDebutCours3).format('HH:mm')+ ';' +$rootScope.date33+ ';' +mail.body
          }else{
            if($rootScope.heureDebCours5 == null && $rootScope.heureDebCours6 == null && $rootScope.date55 == null && $rootScope.date66 == null){
              mail.body= 'Informations concernant le tuteur : \nNom et Prénom : ' +$rootScope.nomPrenomP+ '\nTéléphone : ' +$rootScope.telP+ '\nE-mail : ' +$rootScope.emailP+ '\nComment a t-il connu CapMission ? '
                +$rootScope.choixParent+ '\nSi Autre : ' +$rootScope.autreRaison+ '\nInformations concernant l étudiant : \nNom et Prénom : ' +$rootScope.nomPrenomEnfant+ '\nTéléphone : ' +$rootScope.telEnfant+ '\nE-mail : ' +$rootScope.emailEnfant+
                '\nDate de Naissance :' +$rootScope.dateNaissanceEnfant+ '\nEcole : ' +$rootScope.ecoleEnfant+ '\nType de cours : ' +$rootScope.coursParti+ '\nMission : ' +$rootScope.choixMission+ '\nSection : ' +$rootScope.choixSection+
                '\nNiveau : ' +$rootScope.choixNiveau+ '\nFilière : ' +$rootScope.choixF+ '\nMatière du cours : ' +$rootScope.choixMatiere+ '\nNombre de jour de cours par semaine : ' +$rootScope.nbJoursCours+ '\nDate du début des cours : ' +$rootScope.dateDebutCours+
                '\nHeure du cours : '  +moment($rootScope.heureDebutCours1).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date11+ '\nHeure du cours : '  +moment($rootScope.heureDebutCours2).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date22+
                '\nHeure du cours : '  +moment($rootScope.heureDebutCours3).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date33+ '\nHeure du cours : '  +moment($rootScope.heureDebutCours4).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date44+
                '\nMessage du tuteur : ' +mail.body+ '\n \n \n' +$rootScope.nomPrenomP+ ';' +$rootScope.telP+ ';' +$rootScope.emailP+ ';' +
                +$rootScope.choixParent+ ';'
                +$rootScope.autreRaison+ ';' +$rootScope.nomPrenomEnfant+ ';' +$rootScope.telEnfant+ ';' +$rootScope.emailEnfant+ ';' +$rootScope.dateNaissanceEnfant+ ';' +$rootScope.ecoleEnfant+ ';' +$rootScope.coursParti+ ';' +$rootScope.choixMission+
                ';' +$rootScope.choixSection+ ';' +$rootScope.choixNiveau+ ';' +$rootScope.choixMatiere+ ';' +$rootScope.nbJoursCours+ ';' +$rootScope.dateDebutCours+ ';' +moment($rootScope.heureDebutCours1).format('HH:mm')+ ';' +$rootScope.date11+ ';'
                +moment($rootScope.heureDebutCours2).format('HH:mm')+ ';' +$rootScope.date22+ ';' +moment($rootScope.heureDebutCours3).format('HH:mm')+ ';' +$rootScope.date33+ ';' +moment($rootScope.heureDebutCours4).format('HH:mm')+ ';' +$rootScope.date44+ ';'
                +mail.body
            }else{
              if($rootScope.heureDebCours6 == null && $rootScope.date66 == null){
                mail.body= 'Informations concernant le tuteur : \nNom et Prénom : ' +$rootScope.nomPrenomP+ '\nTéléphone : ' +$rootScope.telP+ '\nE-mail : ' +$rootScope.emailP+ '\nComment a t-il connu CapMission ? '
                  +$rootScope.choixParent+ '\nSi Autre : ' +$rootScope.autreRaison+ '\nInformations concernant l étudiant : \nNom et Prénom : ' +$rootScope.nomPrenomEnfant+ '\nTéléphone : ' +$rootScope.telEnfant+ '\nE-mail : ' +$rootScope.emailEnfant+
                  '\nDate de Naissance :' +$rootScope.dateNaissanceEnfant+ '\nEcole : ' +$rootScope.ecoleEnfant+ '\nType de cours : ' +$rootScope.coursParti+ '\nMission : ' +$rootScope.choixMission+ '\nSection : ' +$rootScope.choixSection+
                  '\nNiveau : ' +$rootScope.choixNiveau+ '\nFilière : ' +$rootScope.choixF+ '\nMatière du cours : ' +$rootScope.choixMatiere+ '\nNombre de jour de cours par semaine : ' +$rootScope.nbJoursCours+ '\nDate du début des cours : ' +$rootScope.dateDebutCours+
                  '\nHeure du cours : '  +moment($rootScope.heureDebutCours1).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date11+ '\nHeure du cours : '  +moment($rootScope.heureDebutCours2).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date22+
                  '\nHeure du cours : '  +moment($rootScope.heureDebutCours3).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date33+ '\nHeure du cours : '  +moment($rootScope.heureDebutCours4).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date44+
                  '\nHeure du cours : '  +moment($rootScope.heureDebutCours5).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date55+ '\nMessage du tuteur : ' +mail.body+ '\n \n \n' +$rootScope.nomPrenomP+ ';' +$rootScope.telP+ ';' +$rootScope.emailP+ ';' +
                  +$rootScope.choixParent+ ';'
                  +$rootScope.autreRaison+ ';' +$rootScope.nomPrenomEnfant+ ';' +$rootScope.telEnfant+ ';' +$rootScope.emailEnfant+ ';' +$rootScope.dateNaissanceEnfant+ ';' +$rootScope.ecoleEnfant+ ';' +$rootScope.coursParti+ ';' +$rootScope.choixMission+
                  ';' +$rootScope.choixSection+ ';' +$rootScope.choixNiveau+ ';' +$rootScope.choixMatiere+ ';' +$rootScope.nbJoursCours+ ';' +$rootScope.dateDebutCours+ ';' +moment($rootScope.heureDebutCours1).format('HH:mm')+ ';' +$rootScope.date11+ ';'
                  +moment($rootScope.heureDebutCours2).format('HH:mm')+ ';' +$rootScope.date22+ ';' +moment($rootScope.heureDebutCours3).format('HH:mm')+ ';' +$rootScope.date33+ ';' +moment($rootScope.heureDebutCours4).format('HH:mm')+ ';' +$rootScope.date44+ ';'
                  +moment($rootScope.heureDebutCours5).format('HH:mm')+ ';' +$rootScope.date55+ ';' +mail.body
              }else{
                mail.body= 'Informations concernant le tuteur : \nNom et Prénom : ' +$rootScope.nomPrenomP+ '\nTéléphone : ' +$rootScope.telP+ '\nE-mail : ' +$rootScope.emailP+ '\nComment a t-il connu CapMission ? '
                  +$rootScope.choixParent+ '\nSi Autre : ' +$rootScope.autreRaison+ '\nInformations concernant l étudiant : \nNom et Prénom : ' +$rootScope.nomPrenomEnfant+ '\nTéléphone : ' +$rootScope.telEnfant+ '\nE-mail : ' +$rootScope.emailEnfant+
                  '\nDate de Naissance :' +$rootScope.dateNaissanceEnfant+ '\nEcole : ' +$rootScope.ecoleEnfant+ '\nType de cours : ' +$rootScope.coursParti+ '\nMission : ' +$rootScope.choixMission+ '\nSection : ' +$rootScope.choixSection+
                  '\nNiveau : ' +$rootScope.choixNiveau+ '\nFilière : ' +$rootScope.choixF+ '\nMatière du cours : ' +$rootScope.choixMatiere+ '\nNombre de jour de cours par semaine : ' +$rootScope.nbJoursCours+ '\nDate du début des cours : ' +$rootScope.dateDebutCours+
                  '\nHeure du cours : '  +moment($rootScope.heureDebutCours1).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date11+ '\nHeure du cours : '  +moment($rootScope.heureDebutCours2).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date22+
                  '\nHeure du cours : '  +moment($rootScope.heureDebutCours3).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date33+ '\nHeure du cours : '  +moment($rootScope.heureDebutCours4).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date44+
                  '\nHeure du cours : '  +moment($rootScope.heureDebutCours5).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date55+ '\nHeure du cours : '  +moment($rootScope.heureDebutCours6).format('HH:mm')+ ' - Jour du cours : ' +$rootScope.date66+
                  '\nMessage du tuteur : ' +mail.body+ '\n \n \n' +$rootScope.nomPrenomP+ ';' +$rootScope.telP+ ';' +$rootScope.emailP+ ';' +
                  +$rootScope.choixParent+ ';'
                  +$rootScope.autreRaison+ ';' +$rootScope.nomPrenomEnfant+ ';' +$rootScope.telEnfant+ ';' +$rootScope.emailEnfant+ ';' +$rootScope.dateNaissanceEnfant+ ';' +$rootScope.ecoleEnfant+ ';' +$rootScope.coursParti+ ';' +$rootScope.choixMission+
                  ';' +$rootScope.choixSection+ ';' +$rootScope.choixNiveau+ ';' +$rootScope.choixMatiere+ ';' +$rootScope.nbJoursCours+ ';' +$rootScope.dateDebutCours+ ';' +moment($rootScope.heureDebutCours1).format('HH:mm')+ ';' +$rootScope.date11+ ';'
                  +moment($rootScope.heureDebutCours2).format('HH:mm')+ ';' +$rootScope.date22+ ';' +moment($rootScope.heureDebutCours3).format('HH:mm')+ ';' +$rootScope.date33+ ';' +moment($rootScope.heureDebutCours4).format('HH:mm')+ ';' +$rootScope.date44+ ';'
                  +moment($rootScope.heureDebutCours5).format('HH:mm')+ ';' +$rootScope.date55+ ';' +moment($rootScope.heureDebutCours6).format('HH:mm')+ ';' +$rootScope.date66+ ';' +mail.body
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
      $http.post(URL_API+'/send-mail', mail, {timeout: 120000}).success(function (data, status, headers, config) {
        $ionicLoading.hide();
        toastr.success('Votre commande a été envoyé avec succès')
        //$ionicHistory.goBack();
        navigator.app.exitApp();
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

  }]);

authentication.controller('DisponibiliteCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading', '$ionicPopup','URL_API',
  function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading, $ionicPopup,URL_API) {


    // pour cours de ELE
    if( $rootScope.choixMatiere == 'Espagnol LV' || $rootScope.choixMatiere == 'Espagnol'){
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursELE">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de Ayuda a los deberes 1
    if( $rootScope.choixMatiere == 'Ayuda a los deberes' && $rootScope.choixNiveau == 'Primero de primaria'){
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesAyudaDeberes1">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de Ayuda a los deberes 2
    if( $rootScope.choixMatiere == 'Ayuda a los deberes' && $rootScope.choixNiveau == 'Segundo de primaria'){
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesAyudaDeberes2">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de Ayuda a los deberes 3
    if( $rootScope.choixMatiere == 'Ayuda a los deberes' && $rootScope.choixNiveau == 'Tercero de primaria'){
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesAyudaDeberes3">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de Ayuda a los deberes 4
    if( $rootScope.choixMatiere == 'Ayuda a los deberes' && $rootScope.choixNiveau == 'Cuarto de primaria'){
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesAyudaDeberes4">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de Ayuda a los deberes 5
    if( $rootScope.choixMatiere == 'Ayuda a los deberes' && $rootScope.choixNiveau == 'Quinto de primaria'){
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesAyudaDeberes5">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de Ayuda a los deberes 6
    if( $rootScope.choixMatiere == 'Ayuda a los deberes' && $rootScope.choixNiveau == 'Sexto de primaria'){
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesAyudaDeberes6">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de maths en 5 primaria
    if( $rootScope.choixMatiere == 'Matemáticas' && $rootScope.choixNiveau == 'Quinto de primaria'){
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesMathPrimaria5">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de lengua en 5 primaria
    if( $rootScope.choixMatiere == 'Lengua Española y Literatura' && $rootScope.choixNiveau == 'Quinto de primaria'){
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesLenguaPrimaria5">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de lengua en 5 primaria
    if( $rootScope.choixMatiere == 'Matemáticas' && $rootScope.choixNiveau == 'Sexto de primaria'){
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesMathPrimaria6">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de lengua en 5 primaria
    if( $rootScope.choixMatiere == 'Lengua Española y Literatura' && $rootScope.choixNiveau == 'Sexto de primaria'){
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesLenguaPrimaria6">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de maths ESO1
    if( $rootScope.choixMatiere == 'Matemáticas' && $rootScope.choixNiveau == 'Primero de la ESO') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursMathESO1">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de lengua ESO1
    if( $rootScope.choixMatiere == 'Lengua Española y Literatura' && $rootScope.choixNiveau == 'Primero de la ESO') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursLenguaESO1">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de maths ESO2
    if( $rootScope.choixMatiere == 'Matemáticas' && $rootScope.choixNiveau == 'Segundo de la ESO') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursMathESO2">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de lengua ESO2
    if( $rootScope.choixMatiere == 'Lengua Española y Literatura' && $rootScope.choixNiveau == 'Segundo de la ESO') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursLenguaESO2">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de maths ESO3
    if( $rootScope.choixMatiere == 'Matemáticas' && $rootScope.choixNiveau == 'Tercero de la ESO') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursMathESO3">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de lengua ESO3
    if( $rootScope.choixMatiere == 'Lengua Española y Literatura' && $rootScope.choixNiveau == 'Tercero de la ESO') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursLenguaESO3">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de phys/chimie ESO3
    if( $rootScope.choixMatiere == 'Física y química' && $rootScope.choixNiveau == 'Tercero de la ESO') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursFisicaESO3">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de phys/chimie ESO4
    if( $rootScope.choixMatiere == 'Física y química' && $rootScope.choixNiveau == 'Cuarto de la ESO') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursFisicaESO4">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de maths ESO4
    if( $rootScope.choixMatiere == 'Matemáticas' && $rootScope.choixNiveau == 'Cuarto de la ESO') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursMathESO4">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de lengua ESO4
    if( $rootScope.choixMatiere == 'Lengua Española y Literatura' && $rootScope.choixNiveau == 'Cuarto de la ESO') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursLenguaESO4">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de maths bac 1
    if( $rootScope.choixMatiere == 'Matemáticas' && $rootScope.choixNiveau == 'Primero de Bachillerato') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursMathBacEsp1">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de eco bac 2
    if( $rootScope.choixMatiere == 'Economía' && $rootScope.choixNiveau == 'Segundo de Bachillerato') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursEcoBacEsp2">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de lengua bac 1
    if( $rootScope.choixMatiere == 'Lengua Española y Literatura' && $rootScope.choixNiveau == 'Primero de Bachillerato') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursLiteraturaBacEsp1">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de lengua bac 1
    if( $rootScope.choixMatiere == 'Lengua Española y Literatura' && $rootScope.choixNiveau == 'Segundo de Bachillerato') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursLiteraturaBacEsp2">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours de maths bac 2
    if( $rootScope.choixMatiere == 'Matemáticas' && $rootScope.choixNiveau == 'Segundo de Bachillerato') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursMathBacEsp2">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour test FR niveau maternelle
    if( $rootScope.choixMatiere == 'Test Mission G.S.') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursTestMissionCP">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours 4eme FR
    if( $rootScope.choixMatiere == 'Français' && $rootScope.choixNiveau == '4ème') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursFr4eme">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours 4eme maths
    if( $rootScope.choixMatiere == 'Mathématiques' && $rootScope.choixNiveau == '4ème') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursMath4eme">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours 6eme FR
    if( $rootScope.choixMatiere == 'Français' && $rootScope.choixNiveau == '6ème') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursFr6eme">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours 6eme maths
    if( $rootScope.choixMatiere == 'Mathématiques' && $rootScope.choixNiveau == '6ème') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursMath6eme">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours 3eme maths
    if( $rootScope.choixMatiere == 'Mathématiques' && $rootScope.choixNiveau == '3ème') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursMath3eme">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours 3eme FR
    if( $rootScope.choixMatiere == 'Français' && $rootScope.choixNiveau == '3ème') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursFr3eme">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours 3eme phys/chimie
    if( $rootScope.choixMatiere == 'Physique/Chimie' && $rootScope.choixNiveau == '3ème') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursPhys3eme">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours 5eme FR
    if( $rootScope.choixMatiere == 'Français' && $rootScope.choixNiveau == '5ème') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursFr5eme">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours 5eme maths
    if( $rootScope.choixMatiere == 'Mathématiques' && $rootScope.choixNiveau == '5ème') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursMath5eme">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours 2nde maths
    if( $rootScope.choixMatiere == 'Mathématiques' && $rootScope.choixNiveau == '2nde') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursMath2nde">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours 2nde FR
    if( $rootScope.choixMatiere == 'Français' && $rootScope.choixNiveau == '2nde') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursFr2nde">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours 2nde phys/chimie
    if( $rootScope.choixMatiere == 'Physique/Chimie' && $rootScope.choixNiveau == '2nde') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursPhys2nde">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours 1ere FR
    if( $rootScope.choixMatiere == 'Français' && $rootScope.choixNiveau == '1ère') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursFr1ere">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // // pour cours 1ere ES maths                                                                                                      A finir !
    // if( $rootScope.choixMatiere == 'Mathématiques' && $rootScope.choixNiveau == '1ère' && $rootScope.choixFiliere == 'ES') {
    //   $http.get('authentication/listeDispo.json', {timeout: 35000}).success(function (data) {
    //     $rootScope.dispo = data
    //   }).error(function (data) {
    //     $ionicLoading.hide()
    //     toastr.error('ECHEC', {displayDuration: 1000});
    //   });
    //
    //   $scope.voirDispo = function (field) {
    //     $scope.data = {};
    //
    //
    //     var tab = []
    //
    //     $http.get('authentication/listeDispo.json', {timeout: 35000}).success(function (data) {
    //       $rootScope.dispo = data
    //
    //
    //       var myPopup = $ionicPopup.show({
    //         template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursMath1ereES">' +
    //         '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
    //         '</div></ion-scroll>',
    //         title: 'Sélectionner le ou les créneau(x) qui vous conviennent :',
    //         // subTitle: 'Pensez à utilisez un Login simple à retenir',
    //         scope: $scope,
    //         buttons: [
    //           { text: '<b>Annuler</b>',
    //             type: 'buttonEmp3',},
    //           {
    //             text: '<b>Valider</b>',
    //             type: 'buttonEmp2',
    //             onTap: function(e) {
    //               console.log('vous avez selectionnez des elements !')
    //             }
    //           }
    //         ]
    //       });
    //
    //       myPopup.then(function(res) {
    //         console.log('Tapped!', res);
    //       });
    //
    //     }).error(function (data) {
    //       $ionicLoading.hide()
    //       toastr.error('ECHEC', {displayDuration: 1000});
    //     });
    //   };}

    // pour cours maths CE2
    if( $rootScope.choixMatiere == 'Mathématiques' && $rootScope.choixNiveau == 'CE2' && ($rootScope.choixMission == 'Mission Française' || $rootScope.choixMission == 'Mission Belge')) {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursMathCE2">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    //pour cours CE2 FR
    if( $rootScope.choixMatiere == 'Français' && $rootScope.choixNiveau == 'CE2' && ($rootScope.choixMission == 'Mission Française' || $rootScope.choixMission == 'Mission Belge')) {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursFrCE2">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours CE2 test mission
    if( $rootScope.choixMatiere == 'Test Mission CE2' && $rootScope.choixSection == 'Primaire' && ($rootScope.choixMission == 'Mission Française' || $rootScope.choixMission == 'Mission Belge')) {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursTestMissionCE2">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    //pour cours CE1 FR
    if( $rootScope.choixMatiere == 'Français' && $rootScope.choixNiveau == 'CE1' && ($rootScope.choixMission == 'Mission Française' || $rootScope.choixMission == 'Mission Belge')) {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursFrCE1">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours maths CE1
    if( $rootScope.choixMatiere == 'Mathématiques' && $rootScope.choixNiveau == 'CE1' && ($rootScope.choixMission == 'Mission Française' || $rootScope.choixMission == 'Mission Belge')) {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursMathCE1">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours CE1 test mission
    if( $rootScope.choixMatiere == 'Test Mission CE1' && $rootScope.choixSection == 'Primaire' && ($rootScope.choixMission == 'Mission Française' || $rootScope.choixMission == 'Mission Belge')) {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursTestMissionCE1">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours maths CM2
    if( $rootScope.choixMatiere == 'Mathématiques' && $rootScope.choixNiveau == 'CM2' && ($rootScope.choixMission == 'Mission Française' || $rootScope.choixMission == 'Mission Belge')) {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursMathCM2">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    //pour cours CM2 FR
    if( $rootScope.choixMatiere == 'Français' && $rootScope.choixNiveau == 'CM2' && ($rootScope.choixMission == 'Mission Française' || $rootScope.choixMission == 'Mission Belge')) {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursFrCM2">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours CM2 test mission maths
    if( $rootScope.choixMatiere == 'Test Mission Maths CM2' && $rootScope.choixNiveau == 'CM2') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursTestMissionMathCM2">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours CM2 test mission FR
    if( $rootScope.choixMatiere == 'Test Mission Français CM2' && $rootScope.choixNiveau == 'CM2') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursTestMissionFrCM2">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours CM1 FR
    if( $rootScope.choixMatiere == 'Français' && $rootScope.choixNiveau == 'CM1') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursFrCM1">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours CM1 Maths
    if( $rootScope.choixMatiere == 'Mathématiques' && $rootScope.choixNiveau == 'CM1') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursMathCM1">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours CM1 Maths test mission
    if( $rootScope.choixMatiere == 'Test Mission Maths CM1' && $rootScope.choixNiveau == 'CM1') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursTestMissionMathCM1">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours CM1 FR test mission
    if( $rootScope.choixMatiere == 'Test Mission Français CM1' && $rootScope.choixNiveau == 'CM1') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursTestMissionFrCM1">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours IELTS
    if( $rootScope.choixMatiere == 'IELTS') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursIELTS">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours TOEFL
    if( $rootScope.choixMatiere == 'TOEFL') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursTOEFL">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours SAT
    if( $rootScope.choixMatiere == 'SAT') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesSAT">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours FLE
    if( $rootScope.choixMatiere == 'FLE') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursFLE">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours English Beginner
    if( $rootScope.choixMatiere == 'Débutant' || $rootScope.choixMatiere == 'A1') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursEnglishBeginner">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours English intermédiare
    if( $rootScope.choixMatiere == 'A2' || $rootScope.choixMatiere == 'B1') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursEnglishInter">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours English advanced
    if( $rootScope.choixMatiere == 'B2' || $rootScope.choixMatiere == 'C1' || $rootScope.choixMatiere == 'C2') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursEnglishAdvanced">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours ELE
    if( $rootScope.choixMatiere == 'ELE') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursELE">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}

    // pour cours Business English
    if( $rootScope.choixMatiere == 'Business English') {
      $http.get('authentication/listeDispo.json').success(function (data) {
        $rootScope.dispo = data
      }).error(function (data) {
        $ionicLoading.hide()
        toastr.error('ECHEC', {displayDuration: 1000});
      });

      $scope.voirDispo = function (field) {
        $scope.data = {};


        var tab = []

        $http.get('authentication/listeDispo.json').success(function (data) {
          $rootScope.dispo = data


          var myPopup = $ionicPopup.show({
            template: '<ion-scroll style="height: 150px;" direction="y" ><div ng-repeat="dis in dispo.disponibilitesProf.disponibilitesCoursEnglishBusiness">' +
            '<ion-checkbox  ng-model="disponibility.indexD"  ng-checked="buttonChecked">{{dis.name}}</ion-checkbox>' +
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
                  console.log('vous avez selectionnez des elements !')
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

        }).error(function (data) {
          $ionicLoading.hide()
          toastr.error('ECHEC', {displayDuration: 1000});
        });
      };}


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

authentication.controller('SDispoCoursPartCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading',
  function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading) {

    $scope.recapitulatif1 = function (nomPrenomP, telP, emailP, choixParent, autreRaison, nomPrenomEnfant, telEnfant, emailEnfant, dateNaissanceEnfant, ecoleEnfant, coursParti, coursEnGpe,
                                      choixMission, choixSection, choixNiveau, choixMatiere, choixFiliere, datecours, heureDebut1, boutonR, jour1) {

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
      $rootScope.choixF = choixFiliere
      $rootScope.dateDebCours = datecours
      $rootScope.horaire1 = heureDebut1
      $rootScope.joursCoursNb = boutonR
      $rootScope.date1 = jour1
      console.log('date transmise !!'+$rootScope.dateDebCours)
      $location.path('/recapitulatifNonInscrit')
    }

    $scope.recapitulatif2 = function (nomPrenomP, telP, emailP, choixParent, autreRaison, nomPrenomEnfant, telEnfant, emailEnfant, dateNaissanceEnfant, ecoleEnfant, coursParti, coursEnGpe, choixMission,
                                      choixSection, choixNiveau, choixMatiere, choixFiliere, datecours, heureDebut1, heureDebut2, boutonR, jour1, jour2) {

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
      $rootScope.choixF = choixFiliere
      $rootScope.dateDebCours = datecours
      $rootScope.horaire1 = heureDebut1
      $rootScope.horaire2 = heureDebut2
      $rootScope.joursCoursNb = boutonR
      $rootScope.date1 = jour1
      $rootScope.date2 = jour2
      $location.path('/recapitulatifNonInscrit')
    }

    $scope.recapitulatif3 = function (nomPrenomP, telP, emailP, choixParent, autreRaison, nomPrenomEnfant, telEnfant, emailEnfant, dateNaissanceEnfant, ecoleEnfant, coursParti, coursEnGpe, choixMission,
                                      choixSection, choixNiveau, choixMatiere, choixFiliere, datecours, heureDebut1, heureDebut2, heureDebut3, boutonR, jour1, jour2, jour3) {

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
      $rootScope.choixF = choixFiliere
      $rootScope.dateDebCours = datecours
      $rootScope.horaire1 = heureDebut1
      $rootScope.horaire2 = heureDebut2
      $rootScope.horaire3 = heureDebut3
      $rootScope.joursCoursNb = boutonR
      $rootScope.date1 = jour1
      $rootScope.date2 = jour2
      $rootScope.date3 = jour3
      $location.path('/recapitulatifNonInscrit')
    }

    $scope.recapitulatif4 = function (nomPrenomP, telP, emailP, choixParent, autreRaison, nomPrenomEnfant, telEnfant, emailEnfant, dateNaissanceEnfant, ecoleEnfant, coursParti, coursEnGpe, choixMission,
                                      choixSection, choixNiveau, choixMatiere, choixFiliere, datecours, heureDebut1, heureDebut2, heureDebut3, heureDebut4, boutonR, jour1, jour2, jour3, jour4) {

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
      $rootScope.choixF = choixFiliere
      $rootScope.dateDebCours = datecours
      $rootScope.horaire1 = heureDebut1
      $rootScope.horaire2 = heureDebut2
      $rootScope.horaire3 = heureDebut3
      $rootScope.horaire4 = heureDebut4
      $rootScope.joursCoursNb = boutonR
      $rootScope.date1 = jour1
      $rootScope.date2 = jour2
      $rootScope.date3 = jour3
      $rootScope.date4 = jour4
      $location.path('/recapitulatifNonInscrit')
    }

    $scope.recapitulatif5 = function (nomPrenomP, telP, emailP, choixParent, autreRaison, nomPrenomEnfant, telEnfant, emailEnfant, dateNaissanceEnfant, ecoleEnfant, coursParti, coursEnGpe, choixMission,
                                      choixSection, choixNiveau, choixMatiere, choixFiliere, datecours, heureDebut1, heureDebut2, heureDebut3, heureDebut4, heureDebut5, boutonR, jour1, jour2, jour3, jour4, jour5) {

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
      $rootScope.choixF = choixFiliere
      $rootScope.dateDebCours = datecours
      $rootScope.horaire1 = heureDebut1
      $rootScope.horaire2 = heureDebut2
      $rootScope.horaire3 = heureDebut3
      $rootScope.horaire4 = heureDebut4
      $rootScope.horaire5 = heureDebut5
      $rootScope.joursCoursNb = boutonR
      $rootScope.date1 = jour1
      $rootScope.date2 = jour2
      $rootScope.date3 = jour3
      $rootScope.date4 = jour4
      $rootScope.date5 = jour5
      $location.path('/recapitulatifNonInscrit')
    }

    $scope.recapitulatif6 = function (nomPrenomP, telP, emailP, choixParent, autreRaison, nomPrenomEnfant, telEnfant, emailEnfant, dateNaissanceEnfant, ecoleEnfant, coursParti, coursEnGpe, choixMission,
                                      choixSection, choixNiveau, choixMatiere, choixFiliere, datecours, heureDebut1, heureDebut2, heureDebut3, heureDebut4, heureDebut5, heureDebut6, boutonR, jour1, jour2,
                                      jour3, jour4, jour5, jour6) {

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
      $rootScope.choixF = choixFiliere
      $rootScope.dateDebCours = datecours
      $rootScope.horaire1 = heureDebut1
      $rootScope.horaire2 = heureDebut2
      $rootScope.horaire3 = heureDebut3
      $rootScope.horaire4 = heureDebut4
      $rootScope.horaire5 = heureDebut5
      $rootScope.horaire6 = heureDebut6
      $rootScope.joursCoursNb = boutonR
      $rootScope.date1 = jour1
      $rootScope.date2 = jour2
      $rootScope.date3 = jour3
      $rootScope.date4 = jour4
      $rootScope.date5 = jour5
      $rootScope.date6 = jour6
      $location.path('/recapitulatifNonInscrit')
    }


    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
  }]);


authentication.controller('SChoixMatiereCoursGroupeCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading',
  function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading) {

    // $http.get('authentication/listeDispo.json', {timeout: 35000}).success(function (data) {
    //   $rootScope.cours = data
    //
    //   $scope.coursEx = $rootScope.cours.disponibilitesProf.disponibilitesCoursELE
    //
    // }).error(function (data) {
    //   $ionicLoading.hide()
    //   toastr.error('ECHEC', {displayDuration: 1000});
    // });

    $scope.missions = ["Mission Française", "Mission Belge", "Mission Espagnole", "Adulte"]
    $scope.sections = ["Maternelle", "Primaire", "Collège", "Lycée"]
    $scope.sectionsEsp = ["Primaria", "ESO", "Bachillerato"]
    $scope.niveaux1 = ["CE1", "CE2", "CM1", "CM2"]
    $scope.niveaux2 = ["6ème", "5ème", "4ème", "3ème"]
    $scope.niveaux3 = ["2nde", "1ère", "Terminale"]
    $scope.niveauxEsp1 = ["Primero de primaria", "Segundo de primaria", "Tercero de primaria", "Cuarto de primaria", "Quinto de primaria", "Sexto de primaria"]
    $scope.niveauxEsp2 = ["Primero de la ESO", "Segundo de la ESO", "Tercero de la ESO", "Cuarto de la ESO"]
    $scope.niveauxEsp3 = ["Primero de Bachillerato", "Segundo de Bachillerato"]

    $http.get('authentication/listeMatiereGroupe.json').success(function (data) {
      $rootScope.cours = data

      // $scope.exemple = $rootScope.cours.coursDispo.missionFR.maternelle

    }).error(function (data) {
      $ionicLoading.hide()
      toastr.error('ECHEC', {displayDuration: 1000});
    });

    // $scope.coursMaternelle = $rootScope.cours.coursDispo.missionFR.maternelle
    // $scope.coursCE1 = $rootScope.cours.coursDispo.missionFR.ce1
    // $scope.coursCE2 = $rootScope.cours.coursDispo.missionFR.ce2
    // $scope.coursCM1 = $rootScope.cours.coursDispo.missionFR.cm1
    // $scope.coursCM2 = $rootScope.cours.coursDispo.missionFR.cm2
    // $scope.cours6eme = $rootScope.cours.coursDispo.missionFR.sixieme
    // $scope.cours5eme = $rootScope.cours.coursDispo.missionFR.cinquieme
    // $scope.cours4eme = $rootScope.cours.coursDispo.missionFR.quatrieme
    // $scope.cours3eme = $rootScope.cours.coursDispo.missionFR.troisieme
    // $scope.cours2nde = $rootScope.cours.coursDispo.missionFR.seconde
    // $scope.cours1ere = $rootScope.cours.coursDispo.missionFR.premiere
    // $scope.cours1ereES = $rootScope.cours.coursDispo.missionFR.premiereES
    // $scope.coursTS = $rootScope.cours.coursDispo.missionFR.tS
    // $scope.coursTES = $rootScope.cours.coursDispo.missionFR.tES
    // $scope.coursTSTMG = $rootScope.cours.coursDispo.missionFR.tSTMG


    $scope.goNbJoursNnInsc = function(nomPrenomP, telP, emailP, choixParent, autreRaison, nomPrenomEnfant, telEnfant, emailEnfant, dateNaissanceEnfant, ecoleEnfant, coursParti, coursEnGpe,
                                      choixMission, choixSection, choixNiveau, choixMatiere, choixFiliere){
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
      $rootScope.chixF = choixFiliere
      $location.path('/nbJoursNnInscrit')
    }


    $scope.goBack = function(){
      $ionicHistory.goBack();
    }
  }]);

authentication.controller('TarifCoursCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading',
  function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading) {

    $http.get('authentication/prix.json').success(function (data) {
      $rootScope.prixCours = data



    }).error(function (data) {
      $ionicLoading.hide()
      toastr.error('ECHEC', {displayDuration: 1000});
    });

    $scope.goChxFreq = function (nomPrenomParent, telParent, choixP, raisonAutre, nomPrenomE, telE, ecoleE, coursParticulier, coursEnGroupe, choixMiss, choixS,
                                 choixN, choixMat, choixF) {

      $rootScope.nomPrenomP = nomPrenomParent
      $rootScope.telP = telParent
      $rootScope.choixParent = choixP
      $rootScope.autreRaison = raisonAutre
      $rootScope.nomPrenomEnfant = nomPrenomE
      $rootScope.ecoleEnfant = ecoleE
      $rootScope.coursParti = coursParticulier
      $rootScope.coursEnGpe = coursEnGroupe
      $rootScope.choixMission = choixMiss
      $rootScope.choixSection = choixS
      $rootScope.choixNiveau = choixN
      $rootScope.choixMatiere = choixMat
      $rootScope.choixFiliere = choixF
      $location.path('/frequenceCours')
    }


    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

  }]);

authentication.controller('FrequenceCoursCtrl', ['$scope','$rootScope','$http','$location','$ionicPopover','$ionicHistory','$ionicLoading',
  function ($scope,$rootScope,$http,$location,$ionicPopover,$ionicHistory,$ionicLoading) {



    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

  }]);

