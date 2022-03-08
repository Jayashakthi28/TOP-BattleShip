import React from 'react'
import dnd from "../../assets/drag_and_drop.gif";
import gameplay from "../../assets/gameplay.gif";
import rnd from "../../assets/randomize.gif";
import sg from "../../assets/start_game.gif";

export const Howto = () => {
  return (
    <div className='howto none'>
        <div className='section'>
            <h2>Place Your Ships</h2>
            <div className='content'>
                <div className='instrunctions'>
                    <ul>
                        <li>You need to place your ships for the computers</li>
                        <li>You can place your ships by dragging and dropping the ships in your board</li>
                        <li>Additionally you can change the orientation by clicking on the ship</li>
                    </ul>
                </div>
                <img src={dnd} alt=""/>
            </div>
        </div>
        <div className='section section2'>
            <h2>Randomize Ship Arrangement</h2>
            <div className='content'>
            <img src={rnd} alt=""/>
                <div className='instrunctions'>
                    <ul>
                        <li>You can also randomize the ship arrangement instead of drag and drop</li>
                        <li>Click on the randomize button for the random arrangement of ships</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='section'>
            <h2>Start Game</h2>
            <div className='content'>
                <div className='instrunctions'>
                    <ul>
                        <li>After placing your Ships click on start game to start the game</li>
                        <li>The box on the left is your box and the box on the right is the computer's box</li>
                    </ul>
                </div>
                <img src={sg} alt=""/>
            </div>
        </div>
        <div className='section section2'>
            <h2>Gameplay</h2>
            <div className='content'>
            <img src={gameplay} alt=""/>
                <div className='instrunctions'>
                    <ul>
                        <li>You need to click on the computer's box to hit the computer's ship</li>
                        <li>If there is a ship found in your hit it will be marked as red ship else a black dot</li>
                        <li>If a ship is found a player can hit until a hit where there is no ship</li>
                        <li>After the user the computer hits on the User's board</li>
                        <li>The hearts on both sides shows the hitted ships and the remaining ships</li>
                        <li>The one who hits all the ships of their opponent is considered as winner</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='more-info'>
        For more info about the game <a href='https://en.wikipedia.org/wiki/Battleship_(game)' target="_blank" rel='noreferrer'>Click here</a>
        </div>
    </div>
  )
}
