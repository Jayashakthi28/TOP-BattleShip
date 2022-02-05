import React, { useState } from "react";
import Box from "./Box";
import { Randomise } from "./Randomise";
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
  
  const shipRender=(staticShips[1].length===0 && staticShips[2].length===0 && staticShips[3].length===0 && staticShips[4].length===0);
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
          <Randomise/>
          <Box />
          {(shipRender)?null:<Shipcont />}
        </div>
      </div>
    </shipData.Provider>
  );
}
