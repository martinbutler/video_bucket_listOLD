'use strict';

angular.module('vimeoMartinApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
    $scope.searchResults = [];
    var currentUser = Auth.getCurrentUser();
    $scope.bucketList = currentUser.bucketList;
    $scope.addToBucket = false;
    $scope.selectVideo = false;
    $scope.singleword = /^\s*\w*\s*$/;
    $scope.tag = "skydiving";
    $scope.bucketTitle = "Go Skydiving";


    $scope.addItem = function(item) {
      item.bucketTitle = $scope.bucketTitle;
      $http.put('/api/users/' + currentUser._id + '/setItem', { item: item}).success(function(response) {
        $scope.addToBucket = false;
        $scope.selectVideo = false;
        $scope.bucketList.push(item);
      });
    };

    $scope.search = function(tag) {
      $scope.addToBucket = true;
      $scope.searchResults = [];
      $http.get('/api/vimeo/'+ currentUser.accessToken + '/' + tag).success(function(response) {
        var data = JSON.parse(response);

        data.data.forEach(function (result) {
          $scope.searchResults.push({uri: result.uri,
              videoNum: parseInt(result.uri.split("").reverse().join("")).toString().split("").reverse().join(""),
              description: result.desription,
              link: result.link,
              name: result.name,
              src: "http://player.vimeo.com/video/" + parseInt(result.uri.split("").reverse().join("")).toString().split("").reverse().join("") + "?api=1&player_id=player1",
              image: result.pictures.sizes[3].link
          });
          $scope.selectVideo = true;
        });
      });
    };
  });
