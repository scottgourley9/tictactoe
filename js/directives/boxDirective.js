angular.module('ticTacToe').directive('boxDirective', function(){


  return {
    restrict: 'A',
    controller: function($scope){
      var winningCombos = [[1, 2, 3],
        [1, 4, 7],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
        [7, 8, 9],
        [2, 5, 8],
        [4, 5, 6]]

      $scope.available = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      $scope.userMoves = []
      $scope.computerMoves = []
      var corners = [1, 3, 7, 9]
      $scope.outSide = [2, 4, 6, 8]
      var two;
      var three;
      $scope.nextMove;
      var winningCombosTwo = [].concat(winningCombos)

      $scope.checkForWinnerComputer = function(movesArr){
      for(var j = 0; j < winningCombosTwo.length; j++){
            var count = 0;
            var val = winningCombosTwo[j]
            for(var i = 0; i < movesArr.length; i++){
              if(val.indexOf(movesArr[i]) !== -1){
                count++
                if(count === 3){
                  swal({
                    title: "Computer Wins...",
                    showCancelButton: false,
                    confirmButtonColor: "navy",
                    confirmButtonText: "Okay",
                    closeOnConfirm: false
                  },
                  function(){
                    window.location.reload(true)
                  });
                  return
                }
              }
            }
        }
        return
      }
      $scope.checkForWinner = function(movesArr){
      for(var j = 0; j < winningCombos.length; j++){
            var count = 0;
            var starting = 3;
            var val = winningCombos[j]
            for(var i = 0; i < movesArr.length; i++){
              if(val.indexOf(movesArr[i]) !== -1){
                count++
                starting -= val.indexOf(movesArr[i])
                if(count === 2){
                  if($scope.available.indexOf(val[starting]) !== -1){
                    two = val[starting]
                    winningCombos.splice(j, 1)
                    j--
                  }

                }
              }
            }
        }
        return {
          two: two
        }
      }
    $scope.computerTurn = function(){
      if($scope.computerMoves.length === $scope.userMoves.length){
        return
      }
      if($scope.nextMove && $scope.available.indexOf($scope.nextMove) !== -1){
        $('[boxnum=' + $scope.nextMove + ']').css({'display': 'none'})
        $('[cover2=' + $scope.nextMove + ']').css({'display': 'inherit'})
        $scope.computerMoves.push($scope.nextMove)
        $scope.available.splice($scope.available.indexOf($scope.nextMove), 1)
        $scope.nextMove = false
        $scope.checkForWinnerComputer($scope.computerMoves)
      }
      else {
        if($scope.available.length === 8){
          if($scope.available.indexOf(5) !== -1){
            $('[boxnum=' + 5 + ']').css({'display': 'none'})
            $('[cover2=' + 5 + ']').css({'display': 'inherit'})
            $scope.computerMoves.push(5)
            $scope.checkForWinnerComputer($scope.computerMoves)
            $scope.available.splice($scope.available.indexOf(5), 1)
          }
          else {
            var num = Math.floor(Math.random() * 4)
            $('[boxnum=' + corners[num] + ']').css({'display': 'none'})
            $('[cover2=' + corners[num] + ']').css({'display': 'inherit'})
            $scope.computerMoves.push(corners[num])
            $scope.checkForWinnerComputer($scope.computerMoves)
            $scope.available.splice($scope.available.indexOf(corners[num]), 1)
          }
        }
        else {
          var p;
          var k = [];
          for (var i = 0; i < $scope.computerMoves.length; i++) {
            p = winningCombos.filter(function(v){
             if(v.indexOf($scope.computerMoves[i]) !== -1 && v.indexOf($scope.userMoves[i]) === -1){
               k.push(v)
               return v
             }
           })
          }
          var theOne
          if($scope.userMoves.length === 2){
            var oppCorners = [[3, 7], [1, 9]]
            for(var i = 0; i < oppCorners.length; i++){
              count=0
              for(var j = 0; j < $scope.userMoves.length; j++){
                if(oppCorners[i].indexOf($scope.userMoves[j]) !== -1){
                  count++
                  if(count === 2){
                    if(!p.length){
                      theOne = k[k.length - 1]
                    }
                    else{
                      theOne = p[p.length - 1]
                    }
                  }
                }
              }
            }
            if(!theOne){
              if(!p.length){
                theOne = k[0]
              }
              else{
                theOne = p[0]
              }
            }
          }
          else {
            if(!p.length){
              theOne = k[0]
            }
            else{
              theOne = p[0]
            }
          }
          if($scope.userMoves.length === 2 && $scope.userMoves.indexOf(6) !== -1 && $scope.userMoves.indexOf(8) !== -1){
            for(var i = theOne.length - 1; i >= 0; i--){
              if($scope.available.indexOf(theOne[i]) !== -1){
                $('[boxnum=' + theOne[i] + ']').css({'display': 'none'})
                $('[cover2=' + theOne[i] + ']').css({'display': 'inherit'})
                $scope.computerMoves.push(theOne[i])
                $scope.checkForWinnerComputer($scope.computerMoves)
                $scope.available.splice($scope.available.indexOf(theOne[i]), 1)
                   var obj = $scope.checkForWinner($scope.computerMoves)
                   $scope.nextMove = obj.two
                return
              }
            }
          }
          for(var i = 0; i < theOne.length; i++){
            if($scope.available.indexOf(theOne[i]) !== -1){
              $('[boxnum=' + theOne[i] + ']').css({'display': 'none'})
              $('[cover2=' + theOne[i] + ']').css({'display': 'inherit'})
              $scope.computerMoves.push(theOne[i])
              $scope.checkForWinnerComputer($scope.computerMoves)
              $scope.available.splice($scope.available.indexOf(theOne[i]), 1)
                 var obj = $scope.checkForWinner($scope.computerMoves)
                 $scope.nextMove = obj.two
              return
            }
          }
        }
      }
    }


    },
    link: function(scope, element, attrs){
      element.on('click', function(){
        if(scope.available.indexOf(Number(attrs.boxnum)) !== -1){
        element.css({'display': 'none'})
        $('[cover=' + attrs.boxnum + ']').css({'display': 'inherit'})

        scope.userMoves.push(Number(attrs.boxnum))
        scope.available.splice(scope.available.indexOf(Number(attrs.boxnum)), 1)

        if(scope.available.length < 2){
          swal({
            title: "It's a Draw!",
            showCancelButton: false,
            confirmButtonColor: "navy",
            confirmButtonText: "Okay",
            closeOnConfirm: false
          },
          function(){
            window.location.reload(true)
          });
          return
        }
        var checkObject = scope.checkForWinner(scope.userMoves)
        if(checkObject.two && scope.computerMoves.indexOf(checkObject.two) === -1 && scope.available.indexOf(scope.nextMove) === -1 && scope.available.indexOf(checkObject.two) !== -1){
          
          $('[boxnum=' + checkObject.two + ']').css({'display': 'none'})
          $('[cover2=' + checkObject.two + ']').css({'display': 'inherit'})
          scope.computerMoves.push(checkObject.two)
          scope.available.splice(scope.available.indexOf(checkObject.two), 1)
          checkObject.two = false;
          var obj = scope.checkForWinner(scope.computerMoves)
          scope.nextMove = obj.two
        }
        else {
          if(scope.available.length < 3){
            var lastNum = Math.floor(Math.random() * scope.available.length)
            $('[boxnum=' + scope.available[lastNum] + ']').css({'display': 'none'})
            $('[cover2=' + scope.available[lastNum] + ']').css({'display': 'inherit'})

            scope.computerMoves.push(scope.available[lastNum])
            scope.available.splice(scope.available.indexOf(scope.available[lastNum]), 1)
            return
          }
        }

        scope.computerTurn()
        }
      })
    }
  }
})
