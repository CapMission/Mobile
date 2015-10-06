angular.module("ngCordovaOauth.canvas", ["oauth.utils"])
  .factory("$cordovaOauth", ["$q", '$http', "$cordovaOauthUtility", function ($q, $http, $cordovaOauthUtility) {

    return {

      /*
       * Sign into the Canvas Authentication Library
       *
       * @param    string clientId (client registered in ADFS, with redirect_uri configured to: http://localhost/callback)
       * @param    string clientSecret (the tenants UUID, can be found in oauth endpoint)
       * @param    string resourceURL (This is your APP ID URI in Canvas Config)
       * @return   promise
       */
      canvas: function (clientId, clientSecret, canvasURL) {
        var deferred = $q.defer();
        if (window.cordova) {
          var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
          if ($cordovaOauthUtility.isInAppBrowserInstalled(cordovaMetadata) === true) {

            var a = 'https://' + canvasURL + '/login/oauth2/auth?client_id=' + clientId + '&response_type=code&redirect_uri=http://localhost/callback';

            console.warn(a);

            var browserRef = window.open('http://' + canvasURL + '/login/oauth2/auth?client_id=' + clientId + '&response_type=code&redirect_uri=http://localhost/callback', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
            browserRef.addEventListener("loadstart", function (event) {
              if ((event.url).indexOf('http://localhost/callback') === 0) {
                var requestToken = (event.url).split("code=")[1];
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


                $http({
                  method: "post", url: "http://" + canvasURL + "/login/oauth2/token", data: "client_id=" + clientId +
                  "&code=" + requestToken +
                  "&client_secret=" + clientSecret
                })
                  .success(function (data) {
                    deferred.resolve(data);
                  })
                  .error(function (data, status) {
                    deferred.reject("Problem authenticating");
                  })
                  .finally(function () {
                    setTimeout(function () {
                      browserRef.close();
                    }, 10);
                  });
              }
            });
            browserRef.addEventListener('exit', function (event) {
              deferred.reject("The sign in flow was canceled");
            });
          } else {
            deferred.reject("Could not find InAppBrowser plugin");
          }
        } else {
          deferred.reject("Cannot authenticate via a web browser");
        }
        return deferred.promise;
      }
    }
  }]);
