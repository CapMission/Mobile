/**
 * Created by MSIKA.SAFAA on 30/03/2016.
 */
angular.module('capMission')
  .factory('Account', function($http) {
    return {
      getProfile: function() {
        return $http.get('http://localhost:8182/users/20');
      },
      updateProfile: function(profileData) {
        return $http.put('/profile', profileData);
      }
    };
  });
