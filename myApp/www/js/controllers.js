'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', ['$scope', '$state',
    function ($scope, $state) {
        $scope.getMenuItemClass = function (state, areaId) {
            if ($state.current.name.search(state) === 0) {
                if (areaId === null) {
                    return 'menu-selected';
                }

                if ($state.$current.locals.globals.$stateParams.areaId === areaId) {
                    return 'menu-selected';
                }
            }
        }
}])

.controller('HomeCtrl', ['$scope',
    function ($scope) {}])

.controller('AreaHomeCtrl', ['$scope', '$stateParams', 'ConfigService', 'UtilityService',
    function ($scope, $stateParams, ConfigService, UtilityService) {
        $scope.id = $stateParams.areaId;
        $scope.UtilityService = UtilityService;
        ConfigService.getAreaSettings($scope.id, function (response) {
            $scope.settings = response.data;
        });
}])

.controller('KnowledgePackCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {
        $scope.areaId = $stateParams.areaId;
        $scope.packId = $stateParams.packId;
    }])

.controller('GamePackCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {
        $scope.areaId = $stateParams.areaId;
        $scope.packId = $stateParams.packId;
    }])

.controller('SettingsCtrl', ['$scope',
    function ($scope) {}]);