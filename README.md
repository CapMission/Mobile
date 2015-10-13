# Cap Mission | Mobile 

_Application mobile de Cap Mission_

- Application codé avec l'aide du framework **[ionic](http://ionicframework.com)**
      - Utilisation d'**[AngularJS](http://angularjs.org)**
      - Utilisation d'**[Apache Cordova](http://cordova.apache.org)**
- Utilisation du gestionnaire de paquet **[Bower](http://bower.io/)**

_Note : Les lignes précédées d'un **$** sont à tapper dans l'invite de commande. Pour les utilisateurs de windows, il est préférable d'utiliser **l'invite de commande Git (Git Bash)**_

##Prérequis

- Git installé ([Lien Installation](https://git-scm.com))
- NodeJS installé ([Lien Installation](https://nodejs.org))
- Bower installé _[via npm/nodeJS]_ ([Lien Installation](http://bower.io/#install-bower))
- Apache cordova installé _[via npm/nodeJS]_ ([Lien Installation](http://cordova.apache.org/#getstarted))
- Ionic installé _[via npm/nodeJS]_ ([Lien Installation](http://ionicframework.com/getting-started))


##Installation et lancement en Local

**1.** Clonage du projet :

```bash
$ git clone https://github.com/CapMission/CapMission-Mobile.git
```

**2.** Se placer dans le dossier nouvellement cloné/créé par la commande précédente

```bash
$ cd CapMission-Mobile
```

**3.** Ajout des plugins et des platforms Cordova

```bash
$ ionic state restore
```

**4.** Installation des dépendences bower

```bash
$ bower install
```


**5.** Lancement de l'application

```bash
#Remplacer <platform> par le système voulu (ios/android...)
$ ionic run <platform>

#Ou pour lancer dans un nvaigateur web
$ ionic serve
```
