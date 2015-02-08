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

            GetPackData: function (areaId, data) {
                var deferred = $q.defer();
                var path = String.format('data/packs/{0}/{1}.json', areaId, data);

                if (packData[path] !== undefined) {
                    deferred.resolve(packData[path]);
                } else {
                    $http.get(path).then(function (response) {
                            var data = response.data;
                            packData[path] = data;
                            deferred.resolve(data);
                        },
                        function (response) {
                            deferred.resolve({});
                        });
                }

                return deferred.promise;
            }
        }
    }])

.factory('AppStateService', function () {
    var appStateData = {};
    return {
        GetData: function (key) {
            var stateData = appStateData[key];
            if (stateData === undefined) {
                return {};
            }

            return stateData;
        },

        PutData: function (key, data) {
            appStateData[key] = data;
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

            MapType: {
                Continent: 0,
                Country: 1
            },

            GetMapType: function (areaId) {
                switch (areaId) {
                case 'usa':
                    return this.MapType.Country;

                default:
                    return this.MapType.Continent;
                }
            },

            SelectSector: function (mapType, sectorId, delay) {
                var className;
                if (mapType === this.MapType.Country) {
                    className = 'sm_state_' + sectorId;
                } else {
                    className = 'sm_country_' + sectorId;
                }

                if (delay === undefined) {
                    delay = 100;
                }

                $timeout(function () {
                    document.getElementsByClassName(className)[0].setAttribute('fill', '#4c8585');
                }, delay);
            },

            DeSelectSector: function (mapType, sectorId) {
                var className;
                if (mapType === this.MapType.Country) {
                    className = 'sm_state_' + sectorId;
                } else {
                    className = 'sm_country_' + sectorId;
                }

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