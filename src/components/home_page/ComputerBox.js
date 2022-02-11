import React from "react";
import Grid from "./Grid";

export const ComputerBox = () => {
  const box = [];
  for (let i = 0; i < 10; i++) {
    box.push([]);
    for (let j = 0; j < 10; j++) {
      box[i].push(j);
    }
  }
  return (
    <div className="box box-right">
      {box.map((k, i) => {
        return box[i].map((t, j) => {
          return <Grid key={`${i}${j}`} isId={`${i}${j}`} />;
        });
      })}
    </div>
  );
};
