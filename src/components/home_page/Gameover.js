import React, { useContext } from 'react'
import { Players } from '../../Players'
import { ACTIONS, shipData } from './Main';

export const Gameover = () => {
  const playerName=Players.checkwinner();
  const{dispatch}=useContext(shipData);
  return (
    <div className='Gameover'>
        <h2>Game Over</h2>
        <div>{playerName} wins</div>
        <button onClick={()=>{
            Players.resetGame();
            dispatch({
                type:ACTIONS.RESETGAME
            })
        }}>Main Menu</button>
    </div>
  )
}
