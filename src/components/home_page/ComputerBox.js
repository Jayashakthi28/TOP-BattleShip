import React, { useContext } from "react";
import { BsDot } from "react-icons/bs";
import { IoMdBoat } from "react-icons/io";
import { Players } from "../../Players";
import { ACTIONS, shipData } from "./Main";

export const ComputerBox = () => {
  const box = [];
  for (let i = 0; i < 10; i++) {
    box.push([]);
    for (let j = 0; j < 10; j++) {
      box[i].push(j);
    }
  }
  const { state, dispatch } = useContext(shipData);
  // if(Players.checkwinner()){
  //   setTimeout(() => {
  //     dispatch({
  //       type:ACTIONS.GAMEOVER,
  //       payload:{
  //         data:{
  //           gameOver:true
  //         }
  //       }
  //     })
  //   }, 2000);
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
        const change = Players.player2.setHit(x, y, true);
        if (change && Players.player2.getBoard()[x][y].isPlaced) {
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
        // setcomputerBoard((prev) => {
        //   return [...prev];
        // });
        dispatch({
          type:ACTIONS.COMPUTERBOARD,
          payload:{
            data:{
              computerBoard:[]
            }
          }
        });
      }}
    >
      {Players.player2.getBoard().map((k, i) => {
        return Players.player2.getBoard()[i].map((t, j) => {
          let data = Players.player2.getBoard()[i][j];
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
