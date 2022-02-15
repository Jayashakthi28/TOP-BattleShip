import React, { useContext } from 'react'
import { computer, gameData } from '../../gameData';
import { shipData } from './Main'
import { staticShipsarr } from './Randomise';

export const StartGame = () => {
  const {setgameStart}=useContext(shipData);
  return (
    <div onClick={()=>{
        setgameStart(true);
        computer.randomizer(staticShipsarr);
        console.log(gameData.getBoard());
        console.log(computer.getBoard());
    }}>StartGame</div>
  )
}
