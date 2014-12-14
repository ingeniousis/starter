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
}])

.controller('HomeCtrl', ['$scope',
    function ($scope) {}])

.controller('AreaHomeCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'ConfigService', 'UtilityService',
    function ($scope, $stateParams, $state, $timeout, ConfigService, UtilityService) {
        $scope.id = $stateParams.areaId;
        $scope.UtilityService = UtilityService;
        ConfigService.GetAreaSettings($scope.id, function (data) {
            $scope.settings = data;
            $scope.settings.packs.forEach(function (pack) {
                pack.selected = false;
            });
        });

        $scope.onPackSelected = function (pack) {
            $scope.$parent.showLoading();
            pack.selected = true;
            var params = {
                areaId: $scope.id,
                packId: UtilityService.GetPackId(pack.name)
            };

            var state = pack.type == 'kp' ? 'app.area.kp' : 'app.area.gp';

            $timeout(function () {
                $state.go(state, params);
            }, 0);
        };
}])

.controller('KnowledgePackCtrl', ['$scope', '$stateParams', '$timeout', 'ConfigService',
    function ($scope, $stateParams, $timeout, ConfigService) {
        $scope.areaId = $stateParams.areaId;
        ConfigService.GetAreaSettings($stateParams.areaId, function (data) {
            $scope.area = data;
            $scope.pack = ConfigService.GetPackSetting($scope.area, $stateParams.packId);

            // Timeout to load the DOM
            $timeout(InitializeMap, 0);
        });

        function InitializeMap() {
            simplemaps_usmap.hooks.click_state = function (id) {
                console.log('Region clicked: ' + id);
            };
            simplemaps_usmap.hooks.complete = function () {
                $scope.$parent.hideLoading();
            };

            // Timeout for the nav-view animation to complete
            $timeout(function () {
                simplemaps_usmap.load();
            }, 10);
        }
}])

.controller('GamePackCtrl', ['$scope', '$stateParams', 'ConfigService',
    function ($scope, $stateParams, ConfigService) {
        ConfigService.GetAreaSettings($stateParams.areaId, function (data) {
            $scope.area = data;
            $scope.pack = ConfigService.GetPackSetting($scope.area, $stateParams.packId);
            $scope.$parent.hideLoading();
        });
    }])

.controller('SettingsCtrl', ['$scope',
    function ($scope) {}]);