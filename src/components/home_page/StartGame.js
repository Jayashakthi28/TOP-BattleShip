import React, { useContext } from 'react'
import { shipData } from './Main'

export const StartGame = () => {
  const {setgameStart}=useContext(shipData);
  return (
    <div onClick={()=>{
        setgameStart(true);
    }}>StartGame</div>
  )
}
