'use strict';

angular.module('vimeoMartinApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
    $scope.awesomeThings = [];
    $scope.searchResults = [];
    var currentUser = Auth.getCurrentUser();

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.search = function() {
      $http.get('/api/vimeo/'+ currentUser.accessToken).success(function(response) {
        var data = JSON.parse(response);

        $scope.searchResults = data.data;

      });
    };
  });
