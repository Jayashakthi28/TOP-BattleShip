import React, { useReducer} from "react";
import Box from "./Box";
import { Randomise } from "./Randomise";
import Shipcont from "./ShipCont";
export const shipData = React.createContext(null);

export const ACTIONS={
  BOARDSHIPS:'boardShip',
  CURRSHIP:'currShip',
  STATICSHIPS:'staticShips'
}

function reducer(state,action){
  switch(action.type){
    case ACTIONS.BOARDSHIPS:
      const {boardShip}=action.payload.data;
      return {...state,boardShip}
    case ACTIONS.CURRSHIP:
      const {currShip}=action.payload.data;
      return{...state,currShip}
    case ACTIONS.STATICSHIPS:
      const {staticShips}=action.payload.data;
      return{...state,staticShips}
    default:
      return state
  }
}

export default function Main() {
  const [state,dispatch]=useReducer(reducer,{boardShip:{},currShip:{},staticShips:{
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
  }});

  const {staticShips}=state;

  const shipRender=(staticShips[1].length===0 && staticShips[2].length===0 && staticShips[3].length===0 && staticShips[4].length===0);
  return (
    <shipData.Provider
      value={{
        state,
        dispatch
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
