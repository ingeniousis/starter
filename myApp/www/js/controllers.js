'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', ['$scope',
    function ($scope) {}])

.controller('HomeCtrl', ['$scope',
    function ($scope) {}])

.controller('AreaCtrl', ['$scope', '$stateParams', 'ConfigService', 'UtilityService',
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