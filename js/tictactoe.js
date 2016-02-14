var chooseTeam = false;
var currentTeam = '';
var AITeam = '';
var yourTurn = true;
var currentMove = 0;
var currentScore = [0, 0];
var WinningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

var app = angular.module('tictactoe', ['ngAnimate']);
app.controller('Game', function($scope) {
  updateScore();

  if(yourTurn === false) { /* AI plays first */

  }

  $scope.ChooseTeam = function(team) {
    setUserTeam(team);
  }

  $scope.blockChoice = function(item) {
    var blockID = item.target.id;              /* Get ID from block */
    var blockClass = item.target.classList[2]; /* Get class from block */

    if(yourTurn === true) {
      if(blockClass === 'empty') {
        //Sets block chosen and checks if user has a winning combo
        setBlock("#" + blockID, true);
        currentMove++;
        if(checkWin(currentTeam)) {
          addWin(currentTeam);
        }
        else if (currentMove === 9) { //If all blocks are set and no winners was found, it's a draw.
          alert('Draw! ' + currentScore[0] + '-' + currentScore[1]);
          cleanBoard();
        }
        else {
          yourTurn = false;
          //now it is the AI's turn. Sets block and check if won
          setBlock(AIchoice(), false);
          currentMove++;
          if(checkWin(AITeam)) {
            addWin(AITeam);
          }
          else if (currentMove === 9){ //If all blocks are set and no winners was found, it's a draw.
            alert('Draw! ' + currentScore[0] + '-' + currentScore[1]);
            cleanBoard();
          }
          yourTurn = true;
        }
      }
      else if(blockClass === 'X' || blockClass === 'O') {
        alert("You can't play there, dummy!");
      }
      else {
        /* bad behavior*/
        console.log("Error 002");
      }
    }
  }

  function setBlock(id, isPlayer) {
    $(id).removeClass('empty');

    if(isPlayer) {
      $(id).addClass(currentTeam);
    }
    else {
      $(id).addClass(AITeam);
    }
  }

  function addWin(Team) {
    if(Team === 'X') {
      currentScore[0]++;
    }
    else if(Team === 'O') {
      currentScore[1]++;
    }
    else {
      console.log("Error 001");
    }

    updateScore();
    alert('Player ' + Team + ' won! ' + currentScore[0] + '-' + currentScore[1]);
    cleanBoard();
  }

  function updateScore() {
    $scope.X = currentScore[0];
    $scope.O = currentScore[1];

    if(chooseTeam === false) {
      $scope.choice = true;
    }
  }

  function setUserTeam(team) {
    chooseTeam = true;
    currentTeam = team;
    $scope.choice = false;

    if(team === 'X') {
      AITeam = 'O'
    }
    else if (team === 'O') {
      AITeam = 'X'
    }
    else { //bad behavior
      chooseTeam = false;
      $scope.choice = true;
    }
  }

  function AIchoice() {
    var flag = true;
    var id;

    while(flag) {
      id = '#' + Math.floor((Math.random() * 8) + 0);

      if ( $(id).hasClass('empty') ) {
        flag = false;
        return id;
      }
    }
  }

  function checkWin(team) {
    var currentWin;
    var hasCombo = false;

    for(var i = 0; i < WinningCombos.length && hasCombo === false; i++) {
      currentWin = WinningCombos[i];

      if( $('#' + currentWin[0]).hasClass(team) && $('#' + currentWin[1]).hasClass(team) && $('#' + currentWin[2]).hasClass(team)) {
        hasCombo = true;
        console.log(team + ' won! Combo is ' + currentWin);
      }
    }

    return hasCombo;
  }

  function cleanBoard() {
    // Goes through all block pieces and removes added classes and resets block.
    for(var i = 0; i < 9; i++) {
      if(!$('#' + i).hasClass('empty')) {
        $('#' + i).removeClass('X');
        $('#' + i).removeClass('O');
        $('#' + i).addClass('empty');
      }
    }

    currentMove = 0;
  }
});
