'use strict';
angular.module('starter.services', [])

.factory('ConfigService', ['$http',
    function ($http) {
        return {
            getAreaSettings: function (country, callback) {
                return $http.get(String.format('data/{0}-settings.json', country)).then(callback);
            }
        }
}])

.factory('UtilityService', function () {
    return {
        getDataSetId: function (datasetName) {
            return datasetName.replace(/[\s\']/g, '-');
        }
    }
});