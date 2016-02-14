var chooseTeam = false;
var currentTeam = '';
var AITeam = '';
var currentScore = [0, 0];
var yourTurn = true;
var currentMove = 0;


var app = angular.module('tictactoe', ['ngAnimate']);
app.controller('Game', function($scope) {
  updateScore();

  $scope.WinnerX = function() {
    addWin('X');
    updateScore();
  }

  $scope.WinnerO = function() {
    addWin('O');
    updateScore();
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
        checkWin(currentTeam);
        yourTurn = false;

        //now it is the AI's turn. Sets block and check if won
        if(currentMove < 8) {
          setBlock(AIchoice(), false);
          currentMove++;
          checkWin(AITeam);
          yourTurn = true;
        }
      }
      else if(blockClass === 'X' || blockClass === 'O') {
        //alert("You can't play there, dummy!");
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

  function checkWin() {
    for(var i = 0; i < 8; i++) {

    }
  }

});
