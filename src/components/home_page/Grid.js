import React from "react";
import shipsvg from "../../assets/ship.svg";
import { gameData } from "../../gameData";

export default function Grid({ isId }) {
  if (isId) {
    let i,j;
    [i,j]=isId.split("");
    i=+i;
    j=+j;
    let data=gameData.getBoard()[i][j];
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
    return <div className={classname} id={isId}></div>;
  }
  return (
    <div className="grid">
      <img src={shipsvg} alt="" draggable="false" />
    </div>
  );
}
