import React, { useState } from "react";
import Box from "./Box";
import Shipcont from "./ShipCont";
export const shipData = React.createContext(null);
export default function Main() {
  const [boardShip, setboardShip] = useState({});
  const [currShip, setcurrShip] = useState({});
  const [staticShips, setstaticShips] = useState({
    4: [{ name: "chakra", size: 4, type: "horizontal" }],
    3: [
      { name: "vikranth_1", size: 3, type: "horizontal" },
      { name: "vikranth_2", size: 3, type: "horizontal" },
    ],
    2: [
      { name: "marine_1", size: 2, type: "horizontal" },
      { name: "marine_2", size: 2, type: "horizontal" },
      { name: "marine_3", size: 2, type: "horizontal" },
    ],
    1: [
      { name: "doge_1", size: 1, type: "horizontal" },
      { name: "doge_2", size: 1, type: "horizontal" },
      { name: "doge_3", size: 1, type: "horizontal" },
      { name: "doge_4", size: 1, type: "horizontal" },
    ],
  });
  return (
    <shipData.Provider
      value={{
        boardShip,
        setboardShip,
        staticShips,
        setstaticShips,
        currShip,
        setcurrShip,
      }}
    >
      <div className="Main-cont">
        <div className="wrapper">
          <Box />
          <Shipcont />
        </div>
      </div>
    </shipData.Provider>
  );
}
