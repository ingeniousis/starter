'use strict';
angular.module('starter.services', [])

.factory('ConfigService', ['$http', 'UtilityService',

    function ($http, UtilityService) {
        var areaSettings = {};
        return {
            GetAreaSettings: function (areaId, callback) {
                if (areaSettings[areaId] !== undefined) {
                    callback(areaSettings[areaId]);
                } else {
                    $http.get(String.format('data/{0}-settings.json', areaId)).then(function (response) {
                        var areaSetting = response.data;
                        areaSetting.packs.forEach(function (pack) {
                            pack.id = UtilityService.GetPackId(pack.name);
                        });

                        areaSettings[areaId] = areaSetting;
                        callback(areaSettings[areaId]);
                    });
                }
            },

            GetPackSetting: function (areaSetting, packId) {
                for (var index in areaSetting.packs) {
                    var pack = areaSetting.packs[index];
                    if (pack.id === packId) {
                        return pack;
                    }
                }
            }
        }
    }])

.factory('UtilityService', function () {
    return {
        GetPackId: function (packName) {
            return packName.replace(/[\s\']/g, '-');
        }
    }
});