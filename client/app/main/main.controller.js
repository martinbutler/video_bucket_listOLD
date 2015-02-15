'use strict';

angular.module('vimeoMartinApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
    $scope.awesomeThings = [];
    $scope.searchResults = [];
    var currentUser = Auth.getCurrentUser();
    $scope.addToBucket = false;
    $scope.singleword = /^\s*\w*\s*$/;
    $scope.tag = "skydiving";
    $scope.bucketTitle = "Go Skydiving";

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

    $scope.search = function(tag) {
      $scope.addToBucket = true;
      $scope.searchResults = [];
      $http.get('/api/vimeo/'+ currentUser.accessToken + '/' + tag).success(function(response) {
        var data = JSON.parse(response);

        data.data.forEach(function (result) {
          console.log(result.pictures.sizes[3].link);
          $scope.searchResults.push({uri: result.uri,
              videoNum: parseInt(result.uri.split("").reverse().join("")).toString().split("").reverse().join(""),
              description: result.desription,
              link: result.link,
              name: result.name,
              src: "http://player.vimeo.com/video/" + parseInt(result.uri.split("").reverse().join("")).toString().split("").reverse().join("") + "?api=1&player_id=player1",
              image: result.pictures.sizes[3].link || "temp"
          });
        });

      });
    };
  });
