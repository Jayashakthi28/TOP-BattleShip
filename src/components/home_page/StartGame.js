import React, { useContext } from 'react'
import { computer} from '../../gameData';
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
        computer.randomizer(staticShipsarr);
    }}>StartGame</div>
  )
}
