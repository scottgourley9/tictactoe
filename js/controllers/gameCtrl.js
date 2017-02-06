angular.module('ticTacToe').controller('gameCtrl', function($scope){
  $scope.reset = function(){
    window.location.reload(true);
  }
})
