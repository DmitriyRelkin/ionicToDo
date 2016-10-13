// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular
.module('ToDO', [
  'ionic'
]);

// __________________________________________________________________________

angular
.module('ToDO')
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

// __________________________________________________________________________

angular
.module('ToDO')
.controller('ToDoCtrl', ToDoCtrl);
ToDoCtrl.$inject = ['$scope', '$ionicModal']
function ToDoCtrl($scope, $ionicModal) {

  var vm = this;

  vm.addNewTask = addNewTask;

  vm.tasks = [
    { title: 'testTitle1', description: 'testDescription1', done:false },
    { title: 'testTitle2', description: 'testDescription2', done:true },
    { title: 'testTitle3', description: 'testDescription3', done:false }
  ];

  $ionicModal.fromTemplateUrl('views/task.html', function(modal) {
    vm.taskModal = modal;
  },{
    scope: $scope,
    animation: 'slide-in-up'
  });

  function addNewTask() {
    vm.taskModal.show();
  };

  $scope.closeTask = function() {
    vm.taskModal.hide();
  };
};
