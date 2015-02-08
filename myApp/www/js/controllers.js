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
        var selectedSectorId = undefined;

        map.hooks.complete = function () {
            $scope.$parent.hideLoading();
        };

        map.hooks.click_state = function (id) {
            console.log('State clicked: ' + id);
            clickSector(id);
        };

        function clickSector(id) {
            if (appStateData.currentSectorIndex === undefined) {
                return;
            }

            if (selectedSectorId !== undefined) {
                MapService.DeSelectSector(mapType, selectedSectorId);
            }

            selectedSectorId = id;
            MapService.SelectSector(mapType, selectedSectorId);

            var sector = $scope.getCurrentSector();
            if (sector.id === selectedSectorId) {
                onSectorDone();
            } else {
                sector.attemptsLeft--;
                if (sector.attemptsLeft === 0) {
                    onSectorDone();
                }
            }

            $scope.$apply();
        }

        function onSectorDone() {
            appStateData.score += $scope.getCurrentSector().attemptsLeft;
            appStateData.sectorsDone++;
            appStateData.sectorsLeft--;
        }

        $scope.reset = function () {
            appStateData.sectors = [];
            appStateData.currentSectorIndex = undefined;
            appStateData.sectorsLeft = 0;
            appStateData.sectorsDone = 0;
            appStateData.score = 0;

            for (var sectorId in packData) {
                appStateData.sectors.push({
                    id: sectorId,
                    attemptsLeft: 3,
                    name: packData[sectorId].Name.toUpperCase()
                });

                appStateData.sectorsLeft++;
            }

            appStateData.sectors.shuffle();
            appStateData.maxScore = appStateData.sectorsLeft * 3;
        };

        $scope.skip = function () {
            $scope.getCurrentSector().attemptsLeft = 0;
            onSectorDone();
            $scope.next();
        };

        $scope.getCurrentSector = function () {
            return appStateData.sectors[appStateData.currentSectorIndex];
        };

        $scope.start = function () {
            appStateData.currentSectorIndex = 0;
        };

        $scope.next = function () {
            appStateData.currentSectorIndex++;
            if (selectedSectorId !== undefined) {
                MapService.DeSelectSector(mapType, selectedSectorId);
            }
        };

        $scope.isBegin = function () {
            return (appStateData.currentSectorIndex === undefined) && (appStateData.sectorsDone === 0);
        };

        $scope.isEnd = function () {
            return (appStateData.currentSectorIndex === undefined) && (appStateData.sectorsLeft === 0);
        };

        $scope.hasNext = function () {
            return (appStateData.currentSectorIndex !== undefined) && (appStateData.currentSectorIndex !== appStateData.sectorsDone);
        };

        $scope.isInProgress = function () {
            return appStateData.currentSectorIndex !== undefined;
        };

        $scope.showStats = function () {};

        if (appStateData.sectors === undefined) {
            $scope.reset();
        }
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