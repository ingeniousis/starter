'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', ['$scope', '$state', '$ionicLoading',
    function ($scope, $state, $ionicLoading) {
        $scope.getMenuItemClass = function (state, areaId) {
            if ($state.current.name.search(state) === 0) {
                if (areaId === null) {
                    return 'menu-selected';
                }

                if ($state.$current.locals.globals.$stateParams.areaId === areaId) {
                    return 'menu-selected';
                }
            }

            return 'stable-bg';
        }

        $scope.showLoading = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
        };

        $scope.hideLoading = function () {
            $ionicLoading.hide();
        };

        $scope.showLoading();
        $scope.hideLoading();
}])

.controller('HomeCtrl', ['$scope',
    function ($scope) {}])

.controller('AreaCtrl', ['$scope', 'areaSetting',
    function ($scope, areaSetting) {
        $scope.areaName = areaSetting.name;
    }])

.controller('AreaHomeCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'areaSetting',
    function ($scope, $stateParams, $state, $timeout, areaSetting) {
        $scope.id = $stateParams.areaId;
        $scope.areaSetting = areaSetting;
        $scope.areaSetting.packs.forEach(function (pack) {
            pack.selected = false;
        });

        $scope.onPackSelected = function (pack) {
            $scope.$parent.showLoading();
            pack.selected = true;
            var params = {
                areaId: $scope.id,
                packId: pack.id
            };

            var state;
            switch (pack.type) {
            case 'kp':
                state = 'app.area.kp';
                break;

            case 'pp':
                state = 'app.area.pp';
                break;

            case 'gp':
                state = 'app.area.gp';
                break;
            }

            $timeout(function () {
                $state.go(state, params);
            }, 50);
        };
}])

.controller('KnowledgePackCtrl', ['$scope', '$stateParams', '$timeout', 'MapService', 'areaSetting', 'packSetting', 'packData', 'appStateData',
    function ($scope, $stateParams, $timeout, MapService, areaSetting, packSetting, packData, appStateData) {

        $scope.areaId = $stateParams.areaId;
        $scope.areaSetting = areaSetting;
        $scope.packSetting = packSetting;

        var map = MapService.GetMap($scope.areaId);
        var mapData = MapService.GetMapData($scope.areaId);
        var mapType = MapService.GetMapType($scope.areaId);

        map.hooks.click_state = function (id) {
            console.log('State clicked: ' + id);
            clickSector(id);
        };

        map.hooks.complete = function () {
            $scope.$parent.hideLoading();

            if (appStateData.selectedSectorId !== undefined) {
                MapService.SelectSector(mapType, appStateData.selectedSectorId);
                $scope.selectedSectorData = packData[appStateData.selectedSectorId];
            }

            if (appStateData.regionZoomed !== undefined) {
                map.region_zoom(appStateData.regionZoomed);
            }
        };

        map.hooks.zoomable_click_region = function (id) {
            appStateData.regionZoomed = id;

            if (appStateData.selectedSectorId !== undefined) {
                MapService.DeSelectSector(mapType, appStateData.selectedSectorId);
                appStateData.selectedSectorId = undefined;
            }

            $scope.selectedSectorData = undefined;
            $scope.$apply();
        };

        map.hooks.back = function () {
            appStateData.regionZoomed = undefined;
        };

        map.hooks.zooming_complete = function () {
            if (appStateData.selectedSectorId !== undefined) {
                MapService.SelectSector(mapType, appStateData.selectedSectorId, 200);
            }
        };

        function clickSector(id) {
            if (appStateData.selectedSectorId !== undefined) {
                MapService.DeSelectSector(mapType, appStateData.selectedSectorId)
            }

            appStateData.selectedSectorId = id;
            MapService.SelectSector(mapType, appStateData.selectedSectorId)

            $scope.selectedSectorData = packData[id];
            $scope.$apply();
        }
}])

.controller('PracticePackCtrl', ['$scope', '$stateParams', '$timeout', 'MapService', 'areaSetting', 'packSetting', 'packData', 'appStateData',
    function ($scope, $stateParams, $timeout, MapService, areaSetting, packSetting, packData, appStateData) {
        $scope.areaId = $stateParams.areaId;
        $scope.packSetting = packSetting;
        $scope.appStateData = appStateData;

        var map = MapService.GetMap($scope.areaId);
        var mapData = MapService.GetMapData($scope.areaId);
        var mapType = MapService.GetMapType($scope.areaId);

        if (appStateData.sectors === undefined) {
            appStateData.sectors = {};
            appStateData.sectorsLeft = 0;

            for (var sectorId in packData) {
                appStateData.sectors[sectorId] = {
                    attempted: false,
                    attemptsLeft: 3
                };

                appStateData.sectorsLeft++;
            }

            appStateData.score = 123;
            appStateData.maxScore = appStateData.sectorsLeft * 3;
        }

        map.hooks.complete = function () {
            $scope.$parent.hideLoading();
        };
    }])

.controller('GamePackCtrl', ['$scope', '$stateParams', '$timeout', 'MapService', 'areaSetting', 'packSetting', 'packData', 'appStateData',
    function ($scope, $stateParams, $timeout, MapService, areaSetting, packSetting, packData, appStateData) {
        $scope.areaSetting = areaSetting;
        $scope.packSetting = packSetting;
        $scope.$parent.hideLoading();
    }])

.controller('SettingsCtrl', ['$scope',
    function ($scope) {}])

.directive('maptype', ['MapService',
    function (MapService) {
        return {
            restrict: 'A',
            link: function ($scope, $element, attr) {
                var map = MapService.GetMap(attr.maptype);
                map.load();
            }
        }
}]);