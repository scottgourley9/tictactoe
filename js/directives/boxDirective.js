angular.module('ticTacToe').directive('boxDirective', function(){

  var winningCombos = [[1, 2, 3],
    [1, 4, 7],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
    [7, 8, 9],
    [2, 5, 8],
    [4, 5, 6]]
    // [3, 2, 1],
    // [7, 4, 1],
    // [9, 6, 3],
    // [9, 5, 1],
    // [7, 5, 3],
    // [9, 8, 7]]

  var available = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  var runOnce = 1;
  var computerMoves = []
  var userMoves = []
  var block;
  var possibleWinners = []
  var winnerChosen = false;
  var haveAWinner = false
  var blockIt = function(arr){
    if(haveAWinner){
      computerTurn()
      return
    }
      for(var i = 0; i < arr.length; i++){
        var val = arr[i]
      if(available.indexOf(val) !== -1){
      $('[boxnum=' + val + ']').css({'background': 'blue'})
      available.splice(available.indexOf(val), 1)
      computerMoves.push(val)
      checkForWinnerComputer(computerMoves)
      return
      }
      // computerTurn()
    }
  }
  var checkForWinner = function(movesArr){
      for(var j = 0; j < winningCombos.length; j++){
            var count = 0;
            var val = winningCombos[j]
            for(var i = 0; i < movesArr.length; i++){
              if(val.indexOf(movesArr[i]) !== -1){
                count++
                if(count === 2){
                  winningCombos.splice(j, 1)
                  blockIt(val);
                  return
                }
                else if(count === 3){
                  return true
                }
              }
            }
        }
            computerTurn()

        return false
  }

  var checkForWinnerComputer = function(movesArr){
    console.log('checking for winner computer');
    console.log(movesArr);
      for(var j = 0; j < winningCombos.length; j++){
            var count = 0;
            var val = winningCombos[j]
            for(var i = 0; i < movesArr.length; i++){
              if(val.indexOf(movesArr[i]) !== -1){
                count++
                if(count === 2){
                console.log('at two');
                fillInFinalIfAvailable(val)
                }
                else if(count === 3){
                  return true
                }
              }
            }
        }
        return false
  }
  var fillInFinalIfAvailable = function(arr){
    computerMoves.forEach(function(val){
      arr.splice(arr.indexOf(val), 1)
    })
    console.log('winner', arr[0]);
    haveAWinner = arr[0]
  }


  var computerFirst = function(){
    console.log('first');
    var num = Math.floor(Math.random() * available.length - 1) + 1
    computerMoves.push(available[num])
    var newNum = available[num]
    available.splice(available.indexOf(available[num]), 1)
    $('[boxnum=' + newNum + ']').css({'background': 'blue'})
  }
  var computerTurn = function(){
    console.log('computer turn');
    if(haveAWinner && available.indexOf(haveAWinner) !== -1){
      $('[boxnum=' + haveAWinner + ']').css({'background': 'blue'})
      alert('YOU LOSE')
      return
    }
    if(!winnerChosen){
    winningCombos.forEach(function(val){
      for(var i = 0; i < computerMoves.length; i++){
        if(val.indexOf(computerMoves[i]) !== -1){
          possibleWinners.push(val)
        }
      }

    })

    for(var i = 0; i < userMoves.length; i++){
      for(var j = 0; j < possibleWinners.length; j++){

        if(possibleWinners[j].indexOf(userMoves[i]) !== -1){
          possibleWinners.splice(j, 1)
        }
      }
    }

    if(!possibleWinners.length){
      computerFirst()
      return
    }
    var num = Math.floor(Math.random() * possibleWinners.length - 1) + 1
    var winnerChickenDinner = possibleWinners[num]
    console.log('winner',winnerChickenDinner);
    winnerChickenDinner.splice(winnerChickenDinner.indexOf(computerMoves[0]), 1)
    var num2 = Math.floor(Math.random() * winnerChickenDinner.length - 1) + 1

    computerMoves.push(winnerChickenDinner[num2])
    var newNum = winnerChickenDinner[num2]
    winnerChickenDinner.splice(winnerChickenDinner.indexOf(winnerChickenDinner[num2]), 1)
    winnerChosen = winnerChickenDinner[0]
    available.splice(available.indexOf(winnerChickenDinner[num2]), 1)
    $('[boxnum=' + newNum + ']').css({'background': 'blue'})
    if(checkForWinnerComputer(computerMoves)){
      alert('YOU LOSE')
      return
    }
  }
  else {


    computerMoves.push(winnerChosen)
    available.splice(available.indexOf(winnerChosen), 1)
    $('[boxnum=' + winnerChosen + ']').css({'background': 'blue'})
    console.log(computerMoves);
    if(checkForWinnerComputer(computerMoves)){
      alert('YOU LOSE')
      return
    }
  }
  }

  return {
    restrict: 'A',
    link: function(scope, element, attrs){

      element.on('click', function(){

        element.css({'background': 'red'})
        userMoves.push(Number(attrs.boxnum))
        available.splice(available.indexOf(Number(attrs.boxnum)), 1)
        if(userMoves.length > 1){
          if(checkForWinner(userMoves)){
            alert('WINNER')
            return
          }

        }
        if(runOnce < 2){
          computerFirst()
          runOnce++
        }

        // else {
        //
        //     computerTurn()
        //
        //
        //
        // }
      })

    }
  }
})
