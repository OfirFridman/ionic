angular.module('starter.services', [])
  .service('commonService', ['$state', function($state) {

    var self = this;

    self.isNulUnOrEmpty = function(val) {
      return val === undefined || val === null || val.trim() === "";
    };

    self.go = function(to) {
      $state.go(to);
    };

  }])
  .service('loginService', ['commonService', '$q', '$timeout', function(commonService, $q, $timeout) {
    var self = this;
    var isNulUnOrEmpty = commonService.isNulUnOrEmpty;

    self.authentication = function(username, password) {
      var defer = $q.defer();
      $timeout(function() {
        defer.resolve();
      }, 1000);

      return defer.promise;
    };

    self.enableDisableLoginButton = function(username, password) {
      return isNulUnOrEmpty(username) || isNulUnOrEmpty(password);
    };
  }])
  .service('detailsService', ['enums', function(enums) {
    var self = this;

    self.getGenderDropDown = function() {
      return enums.gender;
    };

  }])
  .service('restService', ['enums', '$q', '$timeout', function(enums, $q, $timeout) {
    var self = this;

    self.getHotels = function() {

      var defer = $q.defer();

      $timeout(function() {
        defer.resolve(enums.hotels);
      }, 1000);

      return defer.promise;
    };

    self.getAttractions = function() {

      var defer = $q.defer();
      var attractions = [];
      $timeout(function() {

        // TODO Remove this it just for debug until we have server
        for (var i = 0; i < 50; i++) {
          attractions.push({
            name: "Cazino" + i,
            id: i,
            total: i
          });
        }

        defer.resolve(attractions);
      }, 1000);

      return defer.promise;
    };

  }])
  .service('fileSysService', ['$cordovaFile', '$q',function($cordovaFile, $q) {
    var self = this;

    self.readFile = function(fileName) {

      var defer = $q.defer();

      $cordovaFile.readAsText(cordova.file.dataDirectory, fileName)
        .then(function(result) {
          defer.resolve(result);
        }, function(error) {
          // error
        });

      return defer.promise;
    };

    self.writeFile = function(fileName, objectToSave) {

      var defer = $q.defer();

      $cordovaFile.writeFile(cordova.file.dataDirectory, fileName, JSON.stringify(objectToSave), true).then(function(result) {
        defer.resolve(result);
      }, function(err) {
        alert('Write to file fail. error: ' + err.message);
      });

      return defer.promise;
    };

  }]);
