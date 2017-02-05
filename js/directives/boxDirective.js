angular.module('ticTacToe').directive('boxDirective', function(){

    var winningCombos = [[1, 2, 3],
      [1, 4, 7],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
      [7, 8, 9],
      [2, 5, 8],
      [4, 5, 6]]

    var available = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    var userMoves = []
    var computerMoves = []
    var corners = [1, 3, 7, 9]
    var outSide = [2, 4, 6, 8]
    var two;
    var three;
    var nextMove;

    var winningCombosTwo = [].concat(winningCombos)

    var checkForWinnerComputer = function(movesArr){
    for(var j = 0; j < winningCombosTwo.length; j++){
          var count = 0;
          var val = winningCombosTwo[j]
          for(var i = 0; i < movesArr.length; i++){
            if(val.indexOf(movesArr[i]) !== -1){
              count++
              if(count === 3){
                alert('YOU LOSE')
                return
              }
            }
          }
      }
      return
    }
    var checkForWinner = function(movesArr){
    for(var j = 0; j < winningCombos.length; j++){
          var count = 0;
          var starting = 3;
          var val = winningCombos[j]
          for(var i = 0; i < movesArr.length; i++){
            if(val.indexOf(movesArr[i]) !== -1){
              count++
              starting -= val.indexOf(movesArr[i])
              if(count === 2){
                two = val[starting]
                winningCombos.splice(j, 1)
                j--
              }
            }
          }
      }
      return {
        two: two
      }
    }
  var computerTurn = function(){
    if(computerMoves.length === userMoves.length){
      return
    }
    if(nextMove && available.indexOf(nextMove) !== -1){
      $('[boxnum=' + nextMove + ']').css({'background': 'blue'})
      computerMoves.push(nextMove)
      available.splice(available.indexOf(nextMove), 1)
      nextMove = false
      checkForWinnerComputer(computerMoves)
    }
    else {
      if(available.length === 8){
        if(available.indexOf(5) !== -1){
          $('[boxnum=' + 5 + ']').css({'background': 'blue'})
          computerMoves.push(5)
          checkForWinnerComputer(computerMoves)
          available.splice(available.indexOf(5), 1)
        }
        else {
          var num = Math.floor(Math.random() * 4)
          $('[boxnum=' + corners[num] + ']').css({'background': 'blue'})
          computerMoves.push(corners[num])
          checkForWinnerComputer(computerMoves)
          available.splice(available.indexOf(corners[num]), 1)
        }
      }
      else {
        var p;
        var k = [];
        for (var i = 0; i < computerMoves.length; i++) {
          p = winningCombos.filter(function(v){
           if(v.indexOf(computerMoves[i]) !== -1 && v.indexOf(userMoves[i]) === -1){
             k.push(v)
             return v
           }
         })
        }
        if(available.length < 3){
          var lastNum = Math.floor(Math.random() * available.length)
          $('[boxnum=' + available[lastNum] + ']').css({'background': 'blue'})
          computerMoves.push(available[lastNum])
          checkForWinnerComputer(computerMoves)
          available.splice(available.indexOf(available[lastNum]), 1)
          return
        }
        var theOne
        if(!p.length){
          theOne = k[0]
        }
        else{
          console.log(p);
          theOne = p[0]
        }
        if(userMoves.length === 2 && userMoves.indexOf(6) !== -1 && userMoves.indexOf(8) !== -1){
          for(var i = theOne.length - 1; i >= 0; i--){
            if(available.indexOf(theOne[i]) !== -1){
              $('[boxnum=' + theOne[i] + ']').css({'background': 'blue'})
              computerMoves.push(theOne[i])
              checkForWinnerComputer(computerMoves)
              available.splice(available.indexOf(theOne[i]), 1)
                 var obj = checkForWinner(computerMoves)
                 nextMove = obj.two
              return
            }
          }
        }
        for(var i = 0; i < theOne.length; i++){
          if(available.indexOf(theOne[i]) !== -1){
            $('[boxnum=' + theOne[i] + ']').css({'background': 'blue'})
            computerMoves.push(theOne[i])
            checkForWinnerComputer(computerMoves)
            available.splice(available.indexOf(theOne[i]), 1)
               var obj = checkForWinner(computerMoves)
               nextMove = obj.two
            return
          }
        }
      }
    }
  }
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      element.on('click', function(){
        if(available.indexOf(Number(attrs.boxnum)) !== -1){
        element.css({'background': 'red'})
        userMoves.push(Number(attrs.boxnum))
        available.splice(available.indexOf(Number(attrs.boxnum)), 1)
        if(available.length < 2){
          alert('It\'s a draw')
          return
        }
        var checkObject = checkForWinner(userMoves)
        if(checkObject.two && computerMoves.indexOf(checkObject.two) === -1 && available.indexOf(nextMove) === -1 && available.indexOf(checkObject.two) !== -1){
          $('[boxnum=' + checkObject.two + ']').css({'background': 'blue'})
          computerMoves.push(checkObject.two)
          available.splice(available.indexOf(checkObject.two), 1)
          checkObject.two = false;
          var obj = checkForWinner(computerMoves)
          nextMove = obj.two
        }
        computerTurn()
        }
      })
    }
  }
})
