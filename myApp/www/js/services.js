'use strict';
angular.module('starter.services', [])

.factory('FileStorageService', ['$http', '$q', 'UtilityService',

    function ($http, $q, UtilityService) {
        var areaSettings = {};
        var packData = {};

        return {
            GetAreaSetting: function (areaId) {
                var deferred = $q.defer();
                if (areaSettings[areaId] !== undefined) {
                    deferred.resolve(areaSettings[areaId]);
                } else {
                    $http.get(String.format('data/settings/{0}-settings.json', areaId)).then(function (response) {
                        var areaSetting = response.data;
                        areaSettings[areaId] = areaSetting;
                        deferred.resolve(areaSetting);
                    });
                }

                return deferred.promise;
            },

            GetPackData: function (areaId, packId) {
                var deferred = $q.defer();
                if (packData[packId] !== undefined) {
                    deferred.resolve(packData[packId]);
                } else {
                    $http.get(String.format('data/packs/{0}/{1}.json', areaId, packId)).then(function (response) {
                            var packData = response.data;
                            packData[packId] = packData;
                            deferred.resolve(packData);
                        },
                        function (response) {
                            deferred.resolve({});
                        });
                }

                return deferred.promise;
            }
        }
    }])

.factory('AppData', function () {
    var appData = {};
    return {
        GetStateData: function (key) {
            var stateData = appData[key];
            if (stateData === undefined) {
                return {};
            }

            return stateData;
        },

        PutStateData: function (key, data) {
            appData[key] = data;
        }
    }
})

.factory('MapService', ['$timeout',
    function ($timeout) {

        return {
            GetMap: function (areaId) {
                switch (areaId) {
                case 'usa':
                    return simplemaps_usmap;
                    break;

                default:
                    break;
                }
            },

            GetMapData: function (areaId) {
                switch (areaId) {
                case 'usa':
                    return simplemaps_usmap_mapdata;
                    break;

                default:
                    break;
                }
            },

            SelectState: function (stateId) {
                var className = 'sm_state_' + stateId;
                $timeout(function () {
                    document.getElementsByClassName(className)[0].setAttribute('fill', '#4c8585');
                }, 100);
            },

            DeSelectState: function (stateId) {
                var className = 'sm_state_' + stateId;
                $timeout(function () {
                    document.getElementsByClassName(className)[0].setAttribute('fill', '#99b9b9');
                }, 100);
            }
        }
}])

.factory('UtilityService', function () {
    return {
        GetPackSetting: function (areaSetting, packId) {
            for (var index in areaSetting.packs) {
                var pack = areaSetting.packs[index];
                if (pack.id === packId) {
                    return pack;
                }
            }
        }
    }
});