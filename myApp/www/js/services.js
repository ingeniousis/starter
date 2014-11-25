angular.module('starter.services', [])

.factory('ConfigService', function ($http) {
    return {

        getAreaSettings: function (country) {
            return $http.get('/data');

        }

    }
});