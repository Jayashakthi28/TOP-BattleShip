import React, { useContext } from 'react'
import { Players } from '../../Players';
import { ACTIONS, shipData } from './Main'
import { staticShipsarr } from './Randomise';

export const StartGame = () => {
  const {dispatch}=useContext(shipData);
  return (
    <div onClick={()=>{
        dispatch({
          type:ACTIONS.GAMESTART,
          payload:{
            data:{
              gameStart:true
            }
          }
        })
        Players.player2.randomizer(staticShipsarr);
    }}>StartGame</div>
  )
}
