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
ToDoCtrl.$inject = ['$scope', '$ionicModal', '$window']
function ToDoCtrl($scope, $ionicModal, $window) {

  var vm = this;

  vm.addNewTask = addNewTask;
  vm.openTask = openTask;
  vm.deleteTask = deleteTask;

  if(!angular.isUndefined($window.localStorage.getItem['tasks'])) {
    vm.tasks = JSON.parse($window.localStorage.getItem['tasks']);
  } else {
    vm.tasks = [
      { title: 'testTitle1', description: 'testDescription1', done:false },
    ];
  }

  $ionicModal.fromTemplateUrl('views/task.html', function(modal) {
    vm.taskModal = modal;
  },{
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.currentTaskId = -1;

  function addNewTask() {
    vm.taskModal.show();
    $scope.activeTask = {
      title: '',
      description: '',
      done: false
    }
    $scope.currentTaskId = -1;
  };

  $scope.closeTask = function() {
    vm.taskModal.hide();
  };

  function openTask(id) {
    var task = vm.tasks[id];
    $scope.currentTaskId = id;
    $scope.activeTask = {
      title: task.title,
      description: task.description,
      done: task.done
    }
    vm.taskModal.show();
  };

  function deleteTask(id) {
    vm.tasks.splice(id, 1);
    $window.localStorage.setItem['tasks'] = angular.JSON.stringify(vm.tasks);
  };

  $scope.submitTask = function(task) {
    if ($scope.currentTaskId == -1) {
      vm.tasks.push({
        title: task.title,
        description: task.description,
        done: task.done
      });
    } else {
      var id = $scope.currentTaskId;
      vm.tasks[id].title = task.title;
      vm.tasks[id].description = task.description;
      vm.tasks[id].done = task.done;
    }
    $window.localStorage.setItem['tasks'] = angular.toJson(vm.tasks);
    console.log( localStorage.getItem('tasks') );
    vm.taskModal.hide();
  }
};
