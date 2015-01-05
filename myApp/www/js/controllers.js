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

            var state = pack.type == 'kp' ? 'app.area.kp' : 'app.area.gp';

            $timeout(function () {
                $state.go(state, params);
            }, 50);
        };
}])

.controller('KnowledgePackCtrl', ['$scope', '$stateParams', '$timeout', 'MapService', 'areaSetting', 'packSetting', 'packData',
    function ($scope, $stateParams, $timeout, MapService, areaSetting, packSetting, packData) {

        $scope.areaId = $stateParams.areaId;
        $scope.areaSetting = areaSetting;
        $scope.packSetting = packSetting;

        var map = MapService.GetMap($scope.areaId);

        map.hooks.click_state = function (id) {
            console.log('Region clicked: ' + id);
            $scope.selectedRegionData = packData[id];
            $scope.$apply();
        };

        map.hooks.complete = function () {
            $scope.$parent.hideLoading();
        };
}])

.controller('GamePackCtrl', ['$scope', '$stateParams', 'areaSetting', 'packSetting', 'packData',
    function ($scope, $stateParams, areaSetting, packSetting, packData) {
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