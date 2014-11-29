'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', ['$scope',
    function ($scope) {}])

.controller('HomeCtrl', ['$scope',
    function ($scope) {}])

.controller('AreaCtrl', ['$scope', '$stateParams', 'ConfigService',
    function ($scope, $stateParams, ConfigService) {
        $scope.id = $stateParams.areaId;
        ConfigService.getAreaSettings($scope.id, function (response) {
            $scope.settings = response.data;
        });
}])

.controller('KnowledgePackCtrl', ['$scope',
    function ($scope) {}])

.controller('GamePackCtrl', ['$scope',
    function ($scope) {}])

.controller('SettingsCtrl', ['$scope',
    function ($scope) {}]);