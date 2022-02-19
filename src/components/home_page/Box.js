import React, { useContext} from "react";
import Grid from "./Grid";
import Ship from "./Ship";
import { ACTIONS, shipData } from "./Main";
import { gameData } from "../../gameData";

let coordinatesArr=[];
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    coordinatesArr.push(`${i}${j}`);
  }
}
export default function Box() {
  const box = [];
  const shiparr = [];
  const {state,dispatch}=useContext(shipData);
  const {boardShip,currShip,gameStart}=state;
  for (let i = 0; i < 10; i++) {
    box.push([]);
    for (let j = 0; j < 10; j++) {
      box[i].push(j);
    }
  }
  for (let key in boardShip) {
    shiparr.push(boardShip[key]);
  }

  return (
    <div
      className="box box-left"
      onDragEnter={(e) => {
        !gameStart&&dragEnter(e, currShip);
      }}
      onDragOver={(e) => {
        !gameStart&&dragEnter(e, currShip);
      }}
      onDragLeave={(e) => {
        !gameStart&&dragLeave(e, currShip);
      }}
      onDrop={(e) => {
        !gameStart&&dragDrop(e,state,dispatch);
      }}
    >
      {box.map((k, i) => {
        return box[i].map((t, j) => {
          let temp = shiparr.filter((t) => {
            if (t.type === "horizontal") {
              return `${t.index[2]}${t.index[0]}` === `${i}${j}`;
            } else {
              return `${t.index[0]}${t.index[2]}` === `${i}${j}`;
            }
          });
          temp = temp[0] ? temp[0] : [];
          if (temp.length === 0) {
            return <Grid key={`${i}${j}`} isId={`${i}${j}`} />;
          } else {
            return (
              <div className="grid" id={`${i}${j}`} key={`${i}${j}`}>
                <Ship
                  data={{
                    name: temp.name,
                    size: temp.size,
                    type: temp.type,
                  }}
                />
              </div>
            );
          }
        });
      })}
    </div>
  );
}

function highlighter(x, y, r, type, val) {
  if (type === "horizontal") {
    for (let i = +x; i <= +y; i++) {
      if (i >= 0 && i <= 9) {
        if (val === true) {
          document.getElementById(`${r}${i}`).classList.remove("blocker");
          document.getElementById(`${r}${i}`).classList.add("hover");
        } else {
          document.getElementById(`${i}${r}`).classList.remove("hover");
          document.getElementById(`${r}${i}`).classList.add("blocker");
        }
      }
    }
  } else {
    for (let i = +x; i <= +y; i++) {
      if (i >= 0 && i <= 9) {
        if (val === true) {
          document.getElementById(`${i}${r}`).classList.remove("blocker");
          document.getElementById(`${i}${r}`).classList.add("hover");
        } else {
          document.getElementById(`${i}${r}`).classList.remove("hover");
          document.getElementById(`${i}${r}`).classList.add("blocker");
        }
      }
    }
  }
}

function unhighlighter(x, y, r, size, type) {
  if (type === "horizontal") {
    for (let i = +x; i <= +y; i++) {
      if (i >= 0 && i <= 9) {
        document.getElementById(`${r}${i}`).classList.remove("hover");
        document.getElementById(`${r}${i}`).classList.remove("blocker");
      }
    }
  } else {
    for (let i = +x; i <= +y; i++) {
      if (i >= 0 && i <= 9) {
        document.getElementById(`${i}${r}`).classList.remove("hover");
        document.getElementById(`${i}${r}`).classList.remove("blocker");
      }
    }
  }
}

function coordinatesFinder(x, y, size, type) {
  let r;
  if (type === "horizontal") {
    r = x;
    x = y;
    y = +y + size - 1;
  } else {
    r = y;
    y = +x + size - 1;
  }
  return [+x, +y, +r];
}

function dragEnter(e, currShip) {
  if (e.type !== "dragenter") {
    e.preventDefault();
  }
  let [x, y] = e.target.id.split("");
  const size = currShip.size;
  const type = currShip.type;
  let r;
  [x, y, r] = coordinatesFinder(+x, +y, +size, type);
  if (gameData.checkPlacement(x, y, r, type)) {
    highlighter(x, y, r, type, true);
  } else {
    highlighter(x, y, r, type, false);
  }
}

function dragLeave(e, currShip) {
  let [x, y] = e.target.id.split("");
  const size = currShip.size;
  const type = currShip.type;
  let r;
  [x, y, r] = coordinatesFinder(x, y, size, type);
  unhighlighter(x, y, r, size, type);
}

function dragDrop(e,state,dispatch) {
  const {currShip}=state;
  const name = currShip.name;
  const size = +currShip.size;
  let [x, y] = e.target.id.split("");
  let r;
  [x, y, r] = coordinatesFinder(x, y, size, currShip.type);
  let res = gameData.setShipinBoard(x, y, r, currShip.type,name);
  if (!res) return;
  let data = {...state.staticShips};
  data[size] = data[size].filter((t) => t.name !== name);
  dispatch({
    type:ACTIONS.STATICSHIPS,
    payload:{
      data:{staticShips:data}
    }
  });
  const shipData = {
    index: [x, y, r],
    name: name,
    size: +size,
    type: currShip.type,
  };
  gameData.setShipObjinBoard(shipData, name);
  gameData.updateBoard();
  dispatch({
    type:ACTIONS.BOARDSHIPS,
    payload:{
      data:{boardShip:gameData.getBoardShips()}
    }
  })
  //removes all highlighted boxes
  document.querySelectorAll(".hover").forEach((t) => {
    t.classList.remove("hover");
  });
  document.querySelectorAll(".blocker").forEach((t) => {
    t.classList.remove("blocker");
  });
}

