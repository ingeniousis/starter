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

.controller('KnowledgePackCtrl', ['$scope', '$stateParams', '$timeout', 'MapService', 'areaSetting', 'packSetting', 'packData', 'stateData',
    function ($scope, $stateParams, $timeout, MapService, areaSetting, packSetting, packData, stateData) {

        $scope.areaId = $stateParams.areaId;
        $scope.areaSetting = areaSetting;
        $scope.packSetting = packSetting;

        var map = MapService.GetMap($scope.areaId);
        var mapData = MapService.GetMapData($scope.areaId);

        map.hooks.click_state = function (id) {
            console.log('State clicked: ' + id);
            if (stateData.selectedStateId !== undefined) {
                MapService.DeSelectState(stateData.selectedStateId)
            }

            stateData.selectedStateId = id;
            MapService.SelectState(stateData.selectedStateId)

            $scope.selectedRegionData = packData[id];
            $scope.$apply();
        };

        map.hooks.complete = function () {
            $scope.$parent.hideLoading();

            if (stateData.selectedStateId !== undefined) {
                MapService.SelectState(stateData.selectedStateId);
                $scope.selectedRegionData = packData[stateData.selectedStateId];
            }

            if (stateData.regionZoomed !== undefined) {
                map.region_zoom(stateData.regionZoomed);
            }
        };

        map.hooks.zoomable_click_region = function (id) {
            stateData.regionZoomed = id;

            if (stateData.selectedStateId !== undefined) {
                MapService.DeSelectState(stateData.selectedStateId);
                stateData.selectedStateId = undefined;
            }

            $scope.selectedRegionData = undefined;
            $scope.$apply();
        };

        map.hooks.back = function () {
            stateData.regionZoomed = undefined;
        };
}])

.controller('PracticePackCtrl', ['$scope', '$stateParams', '$timeout', 'MapService', 'areaSetting', 'packSetting', 'packData', 'stateData',
    function ($scope, $stateParams, $timeout, MapService, areaSetting, packSetting, packData, stateData) {
        $scope.areaSetting = areaSetting;
        $scope.packSetting = packSetting;
        $scope.$parent.hideLoading();
    }])

.controller('GamePackCtrl', ['$scope', '$stateParams', '$timeout', 'MapService', 'areaSetting', 'packSetting', 'packData', 'stateData',
    function ($scope, $stateParams, $timeout, MapService, areaSetting, packSetting, packData, stateData) {
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