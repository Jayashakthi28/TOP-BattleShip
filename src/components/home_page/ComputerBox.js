import React, { useContext } from "react";
import { computer, gameData } from "../../gameData";
import Grid from "./Grid";
import { shipData } from "./Main";

export const ComputerBox = () => {
  const box = [];
  for (let i = 0; i < 10; i++) {
    box.push([]);
    for (let j = 0; j < 10; j++) {
      box[i].push(j);
    }
  }
  const computerBoxes=[];
  const {setcomputerBoard}=useContext(shipData)
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

  return (
    <div className="box box-right" onClick={(e)=>{
      let [x,y]=e.target.id.split("");
      x=+x;
      y=+y;
      const change=computer.setHit(x,y,true);
      if(change){
        setcomputerBoard((prev)=>{return [...prev]});
      }
    }}>
      {computer.getBoard().map((k, i) => {
        return computer.getBoard()[i].map((t, j) => {
          let data=computer.getBoard()[i][j];
          let classname;
          if(data.isPlaced && data.isHit){
            classname="grid hit"
          }
          else if(!data.isPlaced && data.isHit){
            classname="grid sunk"
          }
          else{
            classname="grid";
          }
          return <div 
          key={`${i}${j}`} 
          id={`${i}${j}`}
          className={classname}
          />;
        });
      })}
    </div>
  );
};
