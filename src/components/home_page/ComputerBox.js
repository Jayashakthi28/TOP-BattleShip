import React, { useContext } from "react";
import { computer } from "../../gameData";
import { BsDot } from "react-icons/bs";
import { IoMdBoat } from "react-icons/io";
import { ACTIONS, shipData } from "./Main";

export const ComputerBox = () => {
  const box = [];
  for (let i = 0; i < 10; i++) {
    box.push([]);
    for (let j = 0; j < 10; j++) {
      box[i].push(j);
    }
  }
  const computerBoxes = [];
  const { setcomputerBoard, state, dispatch } = useContext(shipData);
  // const computerShips=computer.getBoardShips();
  // for(let key in computerShips){
  //   let data=computerShips[key];
  //   for(let i=data.index[0];i<=data.index[1];i++){
  //     if(data.type==="horizontal"){
  //       computerBoxes.push(`${data.index[2]}${i}`);
  //     }
  //     if(data.type==="vertical"){
  //       computerBoxes.push(`${i}${data.index[2]}`);
  //     }
  //   }
  // }
  let className=(state.toggler===true)?"box box-right focus animate__animated animate__backInRight":"box box-right animate__animated animate__backInRight";
  return (
    <div
      className={className}
      onClick={(e) => {
        if (state.toggler === false || state.toggler===null) return;
        let [x, y] = e.target.id.split("");
        x = +x;
        y = +y;
        const change = computer.setHit(x, y, true);
        if (change && computer.getBoard()[x][y].isPlaced) {
          dispatch({
            type: ACTIONS.TOGGLER,
            payload: {
              data: { toggler: true },
            },
          });
        } else if (change) {
          setTimeout(()=>{
            dispatch({
              type: ACTIONS.TOGGLER,
              payload: {
                data: { toggler: false },
              },
            });
          },250);
        }
        setcomputerBoard((prev) => {
          return [...prev];
        });
      }}
    >
      {computer.getBoard().map((k, i) => {
        return computer.getBoard()[i].map((t, j) => {
          let data = computer.getBoard()[i][j];
          if (data.isPlaced && data.isHit) {
            return (
              <div key={`${i}${j}`} id={`${i}${j}`} className="grid">
                  <IoMdBoat style={{ color: "red" }} size={"50px"} className="animate__animated animate__tada"/>
              </div>
            );
          } else if (!data.isPlaced && data.isHit) {
            return (
              <div key={`${i}${j}`} id={`${i}${j}`} className="grid">
                  <BsDot size={"50px"} className="animate__animated animate__faster animate__headShake"/>
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
