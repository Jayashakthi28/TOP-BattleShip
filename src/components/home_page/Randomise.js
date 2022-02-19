import React, { useContext } from "react";
import { Players } from "../../Players";
import { ACTIONS, shipData } from "./Main";
export const staticShipsarr = [
  { name: "chakra", size: 4, type: "horizontal" },
  { name: "vikranth_1", size: 3, type: "horizontal" },
  { name: "vikranth_2", size: 3, type: "horizontal" },
  { name: "marine_1", size: 2, type: "horizontal" },
  { name: "marine_2", size: 2, type: "horizontal" },
  { name: "marine_3", size: 2, type: "horizontal" },
  { name: "doge_1", size: 1, type: "horizontal" },
  { name: "doge_2", size: 1, type: "horizontal" },
  { name: "doge_3", size: 1, type: "horizontal" },
  { name: "doge_4", size: 1, type: "horizontal" }
];
export const Randomise = () => {
  const { dispatch } = useContext(shipData);
  let mainObj = {};
  return (
    <div
      onClick={(e) => {
        setTimeout(() => {
          dispatch({
            type: ACTIONS.STATICSHIPS,
            payload: {
              data: {
                staticShips: { 4: [], 3: [], 2: [], 1: [] },
              },
            },
          });
          dispatch({
            type: ACTIONS.BOARDSHIPS,
            payload: {
              data: {
                boardShip: {},
              },
            },
          });
          mainObj = Players.player1.randomizer(staticShipsarr);
          dispatch({
            type: ACTIONS.BOARDSHIPS,
            payload: {
              data: {
                boardShip: mainObj,
              },
            },
          });
        }, 0);
      }}
    >
      Randomise
    </div>
  );
};
