import React, { useContext, useEffect } from "react";
import { gameData } from "../../gameData";
import { ACTIONS, shipData } from "./Main";
import { BsDot } from "react-icons/bs";
import { IoMdBoat } from "react-icons/io";
import "animate.css";
let coordinatesArr = [];
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    coordinatesArr.push(`${i}${j}`);
  }
}

export const Userbox = () => {
  const { state, dispatch, setcomputerBoard, computerBoard } =
    useContext(shipData);
  const { toggler } = state;
  let className =
    toggler === false
      ? "box box-left focus-right animate__animated animate__backInLeft"
      : "box box-left animate__animated animate__backInLeft";
  useEffect(() => {
    setTimeout(() => {
      boxHitter(dispatch, setcomputerBoard, toggler);
    }, 250);
  }, [computerBoard, toggler]);
  return (
    <div className={className}>
      {gameData.getBoard().map((k, i) => {
        return gameData.getBoard()[i].map((t, j) => {
          let data = gameData.getBoard()[i][j];
          if (data.isPlaced && data.isHit) {
            return (
              <div key={`${i}${j}`} id={`${i}${j}`} className="grid">
                <IoMdBoat
                  style={{ color: "red" }}
                  size={"50px"}
                  className="animate__animated animate__tada"
                />
              </div>
            );
          } else if (!data.isPlaced && data.isHit) {
            return (
              <div key={`${i}${j}`} id={`${i}${j}`} className="grid">
                <BsDot
                  size={"50px"}
                  className="animate__animated animate__faster animate__headShake"
                />
              </div>
            );
          } else if (data.isPlaced && !data.isHit) {
            return (
              <div key={`${i}${j}`} id={`${i}${j}`} className="grid">
                <IoMdBoat
                  style={{ color: "blue" }}
                  size={"50px"}
                  className="animate__animated animate__flash  animate__delay-1s"
                />
              </div>
            );
          } else {
            return <div key={`${i}${j}`} id={`${i}${j}`} className="grid" />;
          }
        });
      })}
    </div>
  );
};

function boxHitter(dispatch, setcomputerBoard, toggler) {
  if (toggler || toggler === null) return;
  let currCoordinate =
    coordinatesArr[Math.floor(Math.random() * coordinatesArr.length)];
  const [x, y] = currCoordinate.split("");
  const change = gameData.setHit(+x, +y, true);
  if (change && gameData.getBoard()[+x][+y].isPlaced) {
    dispatch({
      type: ACTIONS.TOGGLER,
      payload: {
        data: { toggler: false },
      },
    });
  } else if (change) {
    dispatch({
      type: ACTIONS.TOGGLER,
      payload: {
        data: { toggler: true },
      },
    });
  }
  coordinatesArr = [];
  gameData.getBoard().forEach((t, i) => {
    t.forEach((d, j) => {
      if (!d.isHit) {
        coordinatesArr.push(`${i}${j}`);
      }
    });
  });
  setcomputerBoard((prev) => {
    return [...prev];
  });
}
