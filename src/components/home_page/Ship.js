import React, { useContext, useRef } from "react";
import { ACTIONS, shipData } from "./Main";
import Grid from "./Grid";
import { Players } from "../../Players";

export default function Ship({ data }) {
  const name = data.name;
  const num = data.size;
  const type = data.type;
  const ref = useRef();
  let className = type === "vertical" ? "column ship " : "ship ";
  const {state,dispatch} = useContext(shipData);
  const {gameStart}=state;
  if (Players.player1.getBoardShips()[name]) {
    className += "absolute";
  }
  return (
    <div
      className={className}
      ref={ref}
      draggable={gameStart?"false":"true"}
      onDragStart={(e) => {
        !gameStart && dragStart(e,data,dispatch);
      }}
      onDragEnd={(e) => {
        !gameStart && dragEnd(e,dispatch);
      }}
      onClick={(e) => {
        !gameStart && typeChanger(e, data,state,dispatch,ref);
      }}
    >
      {[...Array(num)].map((k, i) => (
        <Grid key={i} isId={false} />
      ))}
    </div>
  );
}

function typeChanger(e, data, state,dispatch, ref) {
  if (Players.player1.getBoardShips()[data.name]) {
    let shipData = Players.player1.getBoardShips()[data.name];
    let [x, y, r] = shipData.index;
    let diff = y - x;
    let type = data.type === "horizontal" ? "vertical" : "horizontal";
    Players.player1.removeShipfromBoard(x, y, r, shipData.type);
    let temp = r;
    r = x;
    x = temp;
    y = x + diff;
    if (Players.player1.setShipinBoard(+x, +y, +r, type,data.name)) {
      let newShipObj = {};
      let temp = { ...state.boardShip };
      temp[data.name] = { ...temp[data.name], type, index: [x, y, r] };
      newShipObj = temp[data.name];
      Players.player1.setShipObjinBoard(newShipObj, data.name);
      dispatch({
        type:ACTIONS.BOARDSHIPS,
        payload:{
          data:{
            boardShip:temp
          }
        }
      });
    } else {
      let [x, y, r] = shipData.index;
      Players.player1.setShipinBoard(x, y, r, shipData.type,data.name);
    }
  } else {
      let currData = { ...state.staticShips };
      currData[data.size] = currData[data.size].map((t) => {
        if (t.name === data.name) {
          const type = t.type === "horizontal" ? "vertical" : "horizontal";
          return { ...t, type };
        } else {
          return t;
        }
      });
      dispatch({
        type:ACTIONS.STATICSHIPS,
        payload:{
          data:{
            staticShips:currData
          }
        }
      })
  }
}

function dragStart(e,data,dispatch) {
  let type, name, size;
  name = data.name;
  size = data.size;
  if (e.target.classList.contains("column")) {
    type = "vertical";
  } else {
    type = "horizontal";
  }
  if (Players.player1.checkBoardShips(name)) {
    let shipObj = Players.player1.getBoardShips()[name];
    Players.player1.removeShipfromBoard(
      shipObj.index[0],
      shipObj.index[1],
      shipObj.index[2],
      shipObj.type
    );
  }
  dispatch({
    type:ACTIONS.CURRSHIP,
    payload:{
      data:{
        currShip:{name,type,size}
      }
    }
  })
  setTimeout(() => e.target.classList.add("none"), 0);
}

function dragEnd(e,dispatch) {
  dispatch({
    type:ACTIONS.CURRSHIP,
    payload:{
      data:{
        currship:null
      }
    }
  })
  e.target.classList.remove("none");
  document.querySelectorAll(".hover").forEach((t) => {
    t.classList.remove("hover");
  });
  document.querySelectorAll(".blocker").forEach((t) => {
    t.classList.remove("blocker");
  });
  Players.player1.updateBoard();
}
