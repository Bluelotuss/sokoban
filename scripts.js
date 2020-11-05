"use strict";

var posPlayerY = getPlayerPosY(tileMap01.mapGrid);
var posPlayerX = getPlayerPosX(tileMap01.mapGrid);

function makeTable(array) {
  var table = document.createElement("div");
  for (var i = 0; i < array.length; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < array[i].length; j++) {
      if (array[i][j] == "W") {
        var cell = document.createElement("td");
        cell.setAttribute("class", "wall");
        cell.setAttribute("id", "y" + i + "x" + j);
        //cell.textContent = array[i][j];
        row.appendChild(cell);
      } else if (array[i][j] == " ") {
        var cell = document.createElement("td");
        cell.setAttribute("class", "emptyTile");
        cell.setAttribute("id", "y" + i + "x" + j);
        //cell.textContent = array[i][j];
        row.appendChild(cell);
      } else if (array[i][j] == "B") {
        var cell = document.createElement("td");
        cell.setAttribute("class", "movableBlock");

        cell.setAttribute("id", "y" + i + "x" + j);
        //cell.textContent = array[i][j];
        row.appendChild(cell);
      } else if (array[i][j] == "P") {
        var cell = document.createElement("td");
        cell.setAttribute("class", "player");
        cell.setAttribute("id", "y" + i + "x" + j);
        //cell.textContent = array[i][j];
        row.appendChild(cell);
      } else if (array[i][j] == "G") {
        var cell = document.createElement("td");
        cell.setAttribute("class", "goalArea");
        cell.setAttribute("id", "y" + i + "x" + j);
        //cell.textContent = array[i][j];
        row.appendChild(cell);
      }
    }
    table.appendChild(row);
    sokoban_map.appendChild(table);
  }
  //return table;
}

makeTable(tileMap01.mapGrid);

function getPlayerPosY(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] == "P") {
        var posPlayerY = i;
        return posPlayerY;
      }
    }
  }
}

function getPlayerPosX(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] == "P") {
        var posPlayerX = j;
        return posPlayerX;
      }
    }
  }
}

function movePlayer(yPos, xPos) {
  posPlayerY = posPlayerY + yPos;
  posPlayerX = posPlayerX + xPos;
}

// function checkIfBlocksAtG(goalArray) {
// for (let i = 0; i < goalArray.length; i++) {
//   const element = array[index];

// }
// }

// function findPlayerAddEmptyTile() {
//   var els = document.getElementsByClassName("player");
//   for (var i = 0; i < els.length; i++) {
//     els[i].classList.add("emptyTile");
//   }
// }
// findPlayerAddEmptyTile();

// function findBlocksAddEmptyTile() {
//   var els = document.getElementsByClassName("movableBlock");
//   for (var i = 0; i < els.length; i++) {
//     els[i].classList.add("emptyTile");
//   }
// }
// findBlocksAddEmptyTile();

function findAllG() {
  let goalPos = [];
  var els = document.getElementsByClassName("goalArea");
  for (var i = 0; i < els.length; i++) {
    goalPos.push(els[i]);
  }
  return goalPos;
}

function isWin() {
  let win = true;
  var goalArray = findAllG();
  for (let i = 0; i < goalArray.length; i++) {
    if (!goalArray[i].classList.contains("movableBlock")) {
      win = false;
      break;
    }
  }
  if (win) {
    window.alert("you won");
  }
} //end of isWin

document.onkeydown = KD;
function KD(e) {
  e.returnValue = false;
}

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      let oldIDL = "y" + posPlayerY + "x" + posPlayerX;
      let newIDL = "y" + posPlayerY + "x" + (posPlayerX - 1);
      let secondNewIDL = "y" + posPlayerY + "x" + (posPlayerX - 2);
      let prevIDL = "y" + posPlayerY + "x" + (posPlayerX + 1);
      let secondPrevIDL = "y" + posPlayerY + "x" + (posPlayerX + 2);
      let upperIDL = "y" + (posPlayerY - 1) + "x" + posPlayerX;

      let currentPosL = document.getElementById(oldIDL);
      let newPosL = document.getElementById(newIDL);
      let secondNewPosL = document.getElementById(secondNewIDL);
      let prevPosL = document.getElementById(prevIDL);
      let secondPrevPosL = document.getElementById(secondPrevIDL);
      let upperPosL = document.getElementById(upperIDL);
      if (
        newPosL.classList.contains("movableBlock") &&
        secondNewPosL.classList.contains("emptyTile")
      ) {
        currentPosL.classList.remove("player");
        currentPosL.classList.add("emptyTile");
        newPosL.classList.remove("movableBlock");
        newPosL.classList.add("player");

        secondNewPosL.classList.add("movableBlock");
        secondNewPosL.classList.remove("emptyTile");
        movePlayer(0, -1);
        break;
      } else if (newPosL.classList.contains("emptyTile")) {
        if (currentPosL.classList.contains("goalArea")) {
          currentPosL.classList.remove("player");
          newPosL.classList.add("player");
          newPosL.classList.remove("emptyTile");

          movePlayer(0, -1);
          break;
        }
        currentPosL.classList.remove("player");
        currentPosL.classList.add("emptyTile");
        newPosL.classList.add("player");
        newPosL.classList.remove("emptyTile");

        movePlayer(0, -1);
        break;
      } else if (newPosL.classList.contains("goalArea")) {
        currentPosL.classList.remove("player");
        newPosL.classList.add("player");

        movePlayer(0, -1);
        break;
      }

      break;
    case "ArrowRight":
      let oldIDR = "y" + posPlayerY + "x" + posPlayerX;
      let newIDR = "y" + posPlayerY + "x" + (posPlayerX + 1);
      let secondNewIDR = "y" + posPlayerY + "x" + (posPlayerX + 2);
      let thirdNewIDR = "y" + posPlayerY + "x" + (posPlayerX + 3);
      let prevIDR = "y" + posPlayerY + "x" + (posPlayerX - 1);

      let currentPosR = document.getElementById(oldIDR);
      let newPosR = document.getElementById(newIDR);
      let secondNewPosR = document.getElementById(secondNewIDR);
      let thirdNewPosR = document.getElementById(thirdNewIDR);
      let prevPosR = document.getElementById(prevIDR);
      if (
        newPosR.classList.contains("movableBlock") &&
        secondNewPosR.classList.contains("emptyTile")
      ) {
        currentPosR.classList.remove("player");
        currentPosR.classList.add("emptyTile");

        newPosR.classList.add("player");
        newPosR.classList.remove("movableBlock");
        secondNewPosR.classList.add("movableBlock");
        secondNewPosR.classList.remove("emptyTile");

        movePlayer(0, 1);
        break;
      } else if (newPosR.classList.contains("emptyTile")) {
        currentPosR.classList.remove("player");
        currentPosR.classList.add("emptyTile");
        newPosR.classList.add("player");
        newPosR.classList.remove("emptyTile");

        movePlayer(0, 1);
        break;
      } else if (
        newPosR.classList.contains("movableBlock") &&
        secondNewPosR.classList.contains("wall")
      ) {
        break;
      } else if (
        newPosR.classList.contains("movableBlock") &&
        secondNewPosR.classList.contains("movableBlock")
      ) {
        break;
      } else if (
        newPosR.classList.contains("movableBlock") &&
        secondNewPosR.classList.contains("goalArea")
      ) {
        if (
          newPosR.classList.contains("movableBlock") &&
          secondNewPosR.classList.contains("goalArea") &&
          thirdNewPosR.classList.contains("wall")
        ) {
          currentPosR.classList.remove("player");
          currentPosR.classList.add("emptyTile");
          newPosR.classList.add("player");
          newPosR.classList.remove("movableBlock");
          secondNewPosR.classList.add("movableBlock");
          movePlayer(0, 1);
          break;
        }
        currentPosR.classList.remove("player");
        currentPosR.classList.add("emptyTile");

        newPosR.classList.add("player");
        newPosR.classList.remove("movableBlock");

        secondNewPosR.classList.add("movableBlock");
        //secondNewPosR.classList.remove("goalArea");

        movePlayer(0, 1);
        break;
      } else if (newPosR.classList.contains("goalArea")) {
        if (secondNewPosR.classList.contains("goalArea")) {
          currentPosR.classList.remove("player");
          currentPosR.classList.add("emptyTile");
          newPosR.classList.add("player");
          movePlayer(0, 1);
          break;
        }
        currentPosR.classList.remove("player");
        //currentPosR.classList.add("emptyTile");
        //newPosR.classList.remove("goalArea");
        newPosR.classList.add("player");

        movePlayer(0, 1);
        break;
      } else if (newPosR.classList.contains("goalArea")) {
        currentPosR.classList.remove("player");
        newPosR.classList.add("player");

        movePlayer(0, 1);
        break;
      }

      break;
    case "ArrowUp":
      let oldIDU = "y" + posPlayerY + "x" + posPlayerX;
      let newIDU = "y" + (posPlayerY - 1) + "x" + posPlayerX;
      let secondNewIDU = "y" + (posPlayerY - 2) + "x" + posPlayerX;

      let currentPosU = document.getElementById(oldIDU);
      let newPosU = document.getElementById(newIDU);
      let secondNewPosU = document.getElementById(secondNewIDU);
      if (
        newPosU.classList.contains("movableBlock") &&
        secondNewPosU.classList.contains("emptyTile")
      ) {
        currentPosU.classList.remove("player");
        currentPosU.classList.add("emptyTile");
        newPosU.classList.remove("movableBlock");
        newPosU.classList.add("player");

        secondNewPosU.classList.add("movableBlock");
        secondNewPosU.classList.remove("emptyTile");

        movePlayer(-1, 0);
        break;
      } else if (newPosU.classList.contains("emptyTile")) {
        currentPosU.classList.remove("player");
        currentPosU.classList.add("emptyTile");
        newPosU.classList.add("player");
        newPosU.classList.remove("emptyTile");

        movePlayer(-1, 0);
        break;
      } else if (newPosU.classList.contains("goalArea")) {
        currentPosU.classList.remove("player");
        newPosU.classList.add("player");

        movePlayer(-1, 0);
        break;
      }
      // if (newPosU.classList.contains("goalArea")) {
      //   currentPosU.classList.remove("player");
      //   currentPosU.classList.add("goalArea");
      //   newPosU.classList.remove("goalArea");
      //   newPosU.classList.add("player");

      //   posPlayerY = posPlayerY - 1;
      //   posPlayerX = posPlayerX;
      // }

      break;
    case "ArrowDown":
      let oldIDD = "y" + posPlayerY + "x" + posPlayerX;
      let newIDD = "y" + (posPlayerY + 1) + "x" + posPlayerX;
      let secondNewIDD = "y" + (posPlayerY + 2) + "x" + posPlayerX;

      let currentPosD = document.getElementById(oldIDD);
      let newPosD = document.getElementById(newIDD);
      let secondNewPosD = document.getElementById(secondNewIDD);
      if (newPosD.classList.contains("emptyTile")) {
        currentPosD.classList.remove("player");
        currentPosD.classList.add("emptyTile");
        newPosD.classList.add("player");

        movePlayer(1, 0);
      } else if (
        newPosD.classList.contains("movableBlock") &&
        secondNewPosD.classList.contains("emptyTile")
      ) {
        currentPosD.classList.remove("player");
        currentPosD.classList.add("emptyTile");

        newPosD.classList.add("player");
        newPosD.classList.remove("movableBlock");
        secondNewPosD.classList.add("movableBlock");
        secondNewPosD.classList.remove("emptyTile");

        movePlayer(1, 0);
      } else if (newPosD.classList.contains("goalArea")) {
        currentPosD.classList.remove("player");
        newPosD.classList.add("player");

        movePlayer(1, 0);
        break;
      }
      break;
  }
  isWin();
});
