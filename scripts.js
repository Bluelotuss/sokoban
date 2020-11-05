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
  let oldID = "y" + posPlayerY + "x" + posPlayerX;
  let newID = "y" + (posPlayerY + yPos) + "x" + (posPlayerX + xPos);
  let secondNewID =
    "y" + (posPlayerY + yPos * 2) + "x" + (posPlayerX + xPos * 2);
  let thirdNewID =
    "y" + (posPlayerY + yPos * 3) + "x" + (posPlayerX + xPos * 3);
  let currentPos = document.getElementById(oldID);
  let newPos = document.getElementById(newID);
  let secondNewPos = document.getElementById(secondNewID);
  let thirdNewPos = document.getElementById(thirdNewID);

  if (newPos.classList.contains("emptyTile")) {
    if (currentPos.classList.contains("goalArea")) {
      currentPos.classList.remove("player");
      newPos.classList.add("player");
      newPos.classList.remove("emptyTile");

      posPlayerY = posPlayerY + yPos;
      posPlayerX = posPlayerX + xPos;
    } else {
      currentPos.classList.remove("player");
      currentPos.classList.add("emptyTile");
      newPos.classList.add("player");
      newPos.classList.remove("emptyTile");

      posPlayerY = posPlayerY + yPos;
      posPlayerX = posPlayerX + xPos;
    }
  } else if (
    newPos.classList.contains("movableBlock") &&
    secondNewPos.classList.contains("emptyTile")
  ) {
    currentPos.classList.remove("player");
    currentPos.classList.add("emptyTile");
    newPos.classList.remove("movableBlock");
    newPos.classList.add("player");
    secondNewPos.classList.add("movableBlock");
    secondNewPos.classList.remove("emptyTile");

    posPlayerY = posPlayerY + yPos;
    posPlayerX = posPlayerX + xPos;
  } else if (
    newPos.classList.contains("movableBlock") &&
    secondNewPos.classList.contains("goalArea") &&
    !secondNewPos.classList.contains("movableBlock")
  ) {
    if (
      newPos.classList.contains("movableBlock") &&
      secondNewPos.classList.contains("goalArea") &&
      thirdNewPos.classList.contains("wall")
    ) {
      currentPos.classList.remove("player");
      currentPos.classList.add("emptyTile");
      newPos.classList.add("player");
      newPos.classList.remove("movableBlock");
      secondNewPos.classList.add("movableBlock");

      posPlayerY = posPlayerY + yPos;
      posPlayerX = posPlayerX + xPos;
    } else {
      currentPos.classList.remove("player");
      currentPos.classList.add("emptyTile");

      newPos.classList.add("player");
      newPos.classList.remove("movableBlock");

      secondNewPos.classList.add("movableBlock");

      posPlayerY = posPlayerY + yPos;
      posPlayerX = posPlayerX + xPos;
    }
  } else if (
    newPos.classList.contains("goalArea") &&
    !newPos.classList.contains("movableBlock")
  ) {
    if (secondNewPos.classList.contains("goalArea")) {
      currentPos.classList.remove("player");
      currentPos.classList.add("emptyTile");
      newPos.classList.add("player");
      posPlayerY = posPlayerY + yPos;
      posPlayerX = posPlayerX + xPos;
    } else {
      currentPos.classList.remove("player");
      newPos.classList.add("player");

      posPlayerY = posPlayerY + yPos;
      posPlayerX = posPlayerX + xPos;
    }
  }
}

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
    let text = document.createElement("h1");
    text.innerText = "Congratulations, you made it";
    document.body.appendChild(text);
  }
} //end of isWin

document.onkeydown = KD;
function KD(e) {
  e.returnValue = false;
}

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      movePlayer(0, -1);
      isWin();
      break;
    case "ArrowRight":
      movePlayer(0, 1);
      isWin();
      break;
    case "ArrowUp":
      movePlayer(-1, 0);
      isWin();
      break;
    case "ArrowDown":
      movePlayer(1, 0);
      isWin();
      break;
  }
});
