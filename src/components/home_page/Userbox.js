import React, { useContext, useEffect} from "react";
import { gameData } from "../../gameData";
import { ACTIONS, shipData } from "./Main";
import { BsDot } from "react-icons/bs";
import { IoMdBoat } from "react-icons/io";
import "animate.css";

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
    }, 1000);
    //eslint-disable-next-line
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
  // console.log(prevData);
  // let currCoordinate =(prevData.length===0)?coordinatesArr[Math.floor(Math.random() * coordinatesArr.length)]:prevData[Math.floor(Math.random()*prevData.length)];
  // let [x, y] = currCoordinate.split("");
  // x=+x;
  // y=+y;
  // const change = gameData.setHit(+x, +y, true);
  // if (change && gameData.getBoard()[+x][+y].isPlaced) {
  //   let tempArr=[];
  //   let boardArr=gameData.getBoard();
  //   for(let i=0;i<=1;i++){
  //     if((x+i)<=9&&!boardArr[x+i][y].isHit){
  //       tempArr.push(`${x+i}${y}`)
  //     }
  //     if((x-i)>=0&&!boardArr[x-i][y].isHit){
  //       tempArr.push(`${x-i}${y}`)
  //     }
  //     if((y+i)<=9&&!boardArr[x][y+i].isHit){
  //       tempArr.push(`${x}${y+i}`)
  //     }
  //     if((y-i)>=0&&!boardArr[x][y-i].isHit){
  //       tempArr.push(`${x}${y-i}`)
  //     }
  //   }
  //   setprevData(tempArr);
  //   dispatch({
  //     type: ACTIONS.TOGGLER,
  //     payload: {
  //       data: { toggler: false },
  //     },
  //   });
  // } else if (change) {
  //   if(prevData.length!==0){
  //     setprevData((t)=>{
  //       let temp=[...t];
  //       temp=temp.filter(d=>d!==`${x}${y}`);
  //       return temp;
  //     })
  //   }
  //   dispatch({
  //     type: ACTIONS.TOGGLER,
  //     payload: {
  //       data: { toggler: true },
  //     },
  //   });
  // }
  // coordinatesArr = [];
  // gameData.getBoard().forEach((t, i) => {
  //   t.forEach((d, j) => {
  //     if (!d.isHit) {
  //       coordinatesArr.push(`${i}${j}`);
  //     }
  //   });
  // });
  let val=gameData.randomHitter();
  dispatch({
    type: ACTIONS.TOGGLER,
    payload: {
      data: { toggler: val },
    },
  });
  setcomputerBoard((prev) => {
    return [...prev];
  });
}
