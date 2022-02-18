import React from "react";
import shipsvg from "../../assets/ship.svg";

export default function Grid({ isId }) {
  if (isId) {
    return <div className="grid" id={isId}></div>;
  }
  return (
    <div className="grid">
      <img src={shipsvg} alt="" draggable="false" />
    </div>
  );
}
