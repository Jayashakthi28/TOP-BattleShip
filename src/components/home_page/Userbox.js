import React, { useContext, useEffect} from "react";
import { ACTIONS, shipData } from "./Main";
import { BsDot } from "react-icons/bs";
import { IoMdBoat } from "react-icons/io";
import "animate.css";
import { Players } from "../../Players";

export const Userbox = () => {
  const { state, dispatch} =
    useContext(shipData);
  const { toggler,computerBoard } = state;
  let className =
    toggler === false
      ? "box box-left focus-right animate__animated animate__backInLeft"
      : "box box-left animate__animated animate__backInLeft";
  useEffect(() => {
    setTimeout(() => {
      boxHitter(state,dispatch,toggler);
    }, 1000);
    //eslint-disable-next-line
  }, [computerBoard, toggler]);
  return (
    <div className={className}>
      {Players.player1.getBoard().map((k, i) => {
        return Players.player1.getBoard()[i].map((t, j) => {
          let data = Players.player1.getBoard()[i][j];
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

function boxHitter(state,dispatch,toggler) {
  if (toggler || toggler === null) return;
  let val=Players.player1.randomHitter();
  dispatch({
    type: ACTIONS.TOGGLER,
    payload: {
      data: { toggler: val },
    },
  });
  dispatch({
    type:ACTIONS.COMPUTERBOARD,
    payload:{
      data:{computerBoard:[]}
    }
  })
}
