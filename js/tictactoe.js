var chooseTeam = false;
var currentTeam = '';
var currentScore = [0, 0];

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
    console.log(item);

    var blockID = item.target.id;              /* Get ID from block */
    var blockClass = item.target.classList[2]; /* Get class from block */

    if(blockClass === 'empty') {
      $("#" + blockID).removeClass('empty');
      $("#" + blockID).addClass(currentTeam);
    }
    else if(blockClass === 'X' || blockClass === 'O') {
      alert("You can't play there, dummy!");
    }
    else {
      /*bad behavior*/
      console.log("Error 002");
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
    if(team === 'X' || team === 'O') {
      chooseTeam = true;
      currentTeam = team;
      $scope.choice = false;
      console.log(currentTeam);
    }
  }

});
