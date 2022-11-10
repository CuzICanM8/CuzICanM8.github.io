var targetNum;
var guesses = 0;
var correctNums = [];

function createNewNumber() {
  let min = Math.ceil(1);
  let max = Math.floor(100);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
targetNum = createNewNumber();

function checkAns(input) {
  if(input === "New Number") {
    targetNum = createNewNumber();
    guesses = 0;
    return ('New number generated, give it a guess!')
  }
  if(input < targetNum) {
    return ('Too low');
  }
  if(input > targetNum) {
    return ('Too high');
  }
  if(input == targetNum) {
    var soln = {
      num: targetNum,
      guesses: guesses,
    };
    correctNums.push(soln);
    return ('You got it! Enter "New Number" for a new number to guess.')
  }
  return ('ERROR');
}

document.getElementById('playerSubmit').onclick = function () {
  guesses++;
  document.getElementById('outputResult').innerHTML = checkAns(document.getElementById('playerInput').value);
}
document.getElementById('showLeaderboardButton').onclick = function () {

  var tableDiv = document.getElementById("dynTable");

    var table = document.createElement('TABLE');
    table.border = '1';

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    for (var i = 0; i < correctNums.length; i++) {
      var tr = document.createElement('TR');
      tableBody.appendChild(tr);

      for (var j = 0; j < 2; j++) {
        var td = document.createElement('TD');
        td.width = '75';
        td.appendChild(document.createTextNode("Cell " + i + "," + j));
        if(j == 0) {
          td.innerHTML = 'guesses: ' + correctNums[i].guesses;
        }
        else {
          td.innerHTML = 'number: ' + correctNums[i].num;
        }
        tr.appendChild(td);
      }
    }
    dynTable.appendChild(table);
}
document.getElementById('hideLeaderboardButton').onclick = function () {
  document.getElementById('dynTable').replaceChildren();
}
