angular.module('ticTacToe').controller('gameCtrl', function($scope){
  $scope.reset = function(){
    window.location.reload(true);
  }
  var num = Math.floor(Math.random() * 6)
  var colors = ['red', 'yellow', 'orange', 'purple', 'blue', 'green']
  $scope.color = colors[num]
})
