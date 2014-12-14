// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

'use strict';

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

        $stateProvider

        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/sidemenu.html",
            controller: 'AppCtrl'
        })

        .state('app.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "templates/home.html",
                    controller: 'HomeCtrl'
                }
            }
        })

        .state('app.area', {
            url: "/area/:areaId",
            abstract: true,
            views: {
                'menuContent': {
                    templateUrl: "templates/area.html"
                }
            }
        })

        .state('app.area.home', {
            url: "",
            views: {
                'areaContent': {
                    templateUrl: "templates/area-home.html",
                    controller: 'AreaHomeCtrl'
                }
            }
        })

        .state('app.area.kp', {
            url: "/kp/:packId",
            views: {
                'areaContent': {
                    templateUrl: "templates/knowledge-pack.html",
                    controller: 'KnowledgePackCtrl'
                }
            }
        })

        .state('app.area.gp', {
            url: "/gp/:packId",
            views: {
                'areaContent': {
                    templateUrl: "templates/game-pack.html",
                    controller: 'GamePackCtrl'
                }
            }
        })

        .state('app.settings', {
            url: "/settings",
            views: {
                'menuContent': {
                    templateUrl: "templates/settings.html",
                    controller: 'SettingsCtrl'
                }
            }
        });

        // if none of the above states are matched, use this as the fallback        
        $urlRouterProvider.otherwise('/app/home');
}]);