import React, { useContext, useRef } from "react";
import { ACTIONS, shipData } from "./Main";
import Grid from "./Grid";
import { gameData } from "../../gameData";

export default function Ship({ data }) {
  const name = data.name;
  const num = data.size;
  const type = data.type;
  const ref = useRef();
  let className = type === "vertical" ? "column ship " : "ship ";
  const {state,dispatch,gamestart} = useContext(shipData);
  if (gameData.getBoardShips()[name]) {
    className += "absolute";
  }
  return (
    <div
      className={className}
      ref={ref}
      draggable="true"
      onDragStart={(e) => {
        !gamestart && dragStart(e,data,dispatch);
      }}
      onDragEnd={(e) => {
        !gamestart && dragEnd(e,dispatch);
      }}
      onClick={(e) => {
        !gamestart && typeChanger(e, data,state,dispatch,ref);
      }}
    >
      {[...Array(num)].map((k, i) => (
        <Grid key={i} isId={false} />
      ))}
    </div>
  );
}

function typeChanger(e, data, state,dispatch, ref) {
  if (gameData.getBoardShips()[data.name]) {
    let shipData = gameData.getBoardShips()[data.name];
    let [x, y, r] = shipData.index;
    let diff = y - x;
    let type = data.type === "horizontal" ? "vertical" : "horizontal";
    gameData.removeShipfromBoard(x, y, r, shipData.type);
    let temp = r;
    r = x;
    x = temp;
    y = x + diff;
    if (gameData.setShipinBoard(+x, +y, +r, type)) {
      let newShipObj = {};
      let temp = { ...state.boardShip };
      temp[data.name] = { ...temp[data.name], type, index: [x, y, r] };
      newShipObj = temp[data.name];
      gameData.setShipObjinBoard(newShipObj, data.name);
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
      gameData.setShipinBoard(x, y, r, shipData.type);
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
  if (gameData.checkBoardShips(name)) {
    let shipObj = gameData.getBoardShips()[name];
    gameData.removeShipfromBoard(
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
  gameData.updateBoard();
}
