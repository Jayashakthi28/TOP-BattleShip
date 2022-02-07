import React, { useContext } from "react";
import { gameData } from "../../gameData";
import { shipData } from "./Main";

export const Randomise = () => {
  const { setboardShip, setstaticShips } = useContext(shipData);
  const staticShips = {
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
  };
  const staticShipsarr = [];
  let mainObj = {};
  for (let key in staticShips) {
    staticShips[key].forEach((element) => {
      staticShipsarr.push(element);
    });
  }
  return (
    <div
      onClick={(e) => {
        setTimeout(() => {
          setstaticShips({ 4: [], 3: [], 2: [], 1: [] });
          setboardShip({});
          mainObj=gameData.randomizer(staticShipsarr);
          setboardShip(mainObj);
        }, 0);
      }}
    >
      Randomise
    </div>
  );
};
