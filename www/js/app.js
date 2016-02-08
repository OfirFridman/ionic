// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ngCordova.plugins.nfc'])

.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
    .state('app.login', {
      url: '/login',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl as login'
        }
      }
    })
    .state('app.details', {
      url: '/details',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: "templates/details.html",
          controller: 'DetailsCtrl as details'
        }
      }
    })
    .state('app.nfc', {
      url: '/nfc',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: "templates/nfc.html",
          controller: 'NfcCtrl as nfc'
        }
      }
    })
    .state('app.attractions', {
      url: '/attractions',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: "templates/attractions.html",
          controller: 'AttractionsCtrl as attractions'
        }
      }
    });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');

});
