// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('recordsApp', ['ionic', 'firebase'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('records', {
                url: '/records',
                templateUrl: 'templates/RecordList.html',
                controller: 'RecordListCtrl as rlCtrl'
            })
            .state('records-form', {
                url: '/records/:id',
                templateUrl: 'templates/RecordForm.html',
                controller: 'RecordFormCtrl as rfCtrl'
            });
        $urlRouterProvider.otherwise('/records');
    })

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
