angular.module('starter.controllers', [])

.controller('AppCtrl', ['$scope', function($scope) {}])

.controller('LoginCtrl', ["$scope", "$cordovaFile", "$ionicPlatform", 'loginService', 'commonService','fileSysService', function($scope, $cordovaFile, $ionicPlatform, loginService, commonService, fileSysService) {
  var vm = this;
  vm.showSpinner = false;
  vm.enableDisableLoginButton = loginService.enableDisableLoginButton;
  vm.authentication = loginService.authentication;

  document.addEventListener('deviceready', function () {
    var fileName = 'ofir.txt';
    var objectToSave = {name:'ofir',id:1};
    fileSysService.writeFile(fileName, objectToSave).then(function(){
      fileSysService.readFile(fileName).then(function(file){        
        vm.data = file;
      });
    });
  });

  vm.onLoginClick = function() {
    vm.showSpinner = true;
    vm.authentication(vm.username, vm.password).then(function() {
      vm.showSpinner = false;
      commonService.go('app.details');
    });
  };
}])

.controller('DetailsCtrl', ['detailsService', 'restService', function(detailsService, restService) {
  var vm = this;
  vm.showSpinner = true;
  vm.gender = detailsService.getGenderDropDown();
  restService.getHotels().then(function(hotels) {
    vm.showSpinner = false;
    vm.hotels = hotels;
  });


  vm.updateDetails = function() {

  };

}])

.controller('NfcCtrl', ['$cordovaNfc', '$cordovaNfcUtil', function($cordovaNfc, $cordovaNfcUtil) {

  var vm = this;
  init();

  vm.onRefreshClick = function() {
    init();
  };

  function init() {
    vm.nfcIsOn = false;
    $cordovaNfc.then(function(nfcInstance) {

      //Use the plugins interface as you go, in a more "angular" way
      nfcInstance.addNdefListener(function(event) {
          //Callback when ndef got triggered
        })
        .then(
          //Success callback
          function(event) {
            vm.nfcIsOn = true;
            console.log("bound success");
          },
          //Fail callback
          function(err) {
            console.log("error");
          });
    });

    $cordovaNfcUtil.then(function(nfcUtil) {
      console.log(nfcUtil.bytesToString("some bytes"));
    });
  }


}])

.controller('AttractionsCtrl', ['commonService', 'restService', function(commonService, restService) {
  var vm = this;
  vm.attractions = [];
  vm.showSpinner = true;

  restService.getAttractions().then(function(attractions) {
    vm.showSpinner = false;
    vm.attractions = attractions;
  });

  vm.onAttractionClick = function(attraction) {
    commonService.go('app.nfc');
  };
}]);
