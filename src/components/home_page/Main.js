import React, { useReducer} from "react";
import { Players } from "../../Players";
import Box from "./Box";
import { ComputerBox } from "./ComputerBox";
import { Gameover } from "./Gameover";
import { Lifebox } from "./Lifebox";
import { Randomise } from "./Randomise";
import Shipcont from "./ShipCont";
import { StartGame } from "./StartGame";
import { Userbox } from "./Userbox";
export const shipData = React.createContext(null);

export const ACTIONS = {
  BOARDSHIPS: "boardShip",
  CURRSHIP: "currShip",
  STATICSHIPS: "staticShips",
  TOGGLER: "toggler",
  GAMESTART: "gameStart",
  COMPUTERBOARD: "computerBoard",
  GAMEOVER:"gameOver",
  RESETGAME:"resetGame"
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.BOARDSHIPS:
      const { boardShip } = action.payload.data;
      return { ...state, boardShip };
    case ACTIONS.CURRSHIP:
      const { currShip } = action.payload.data;
      return { ...state, currShip };
    case ACTIONS.STATICSHIPS:
      const { staticShips } = action.payload.data;
      return { ...state, staticShips };
    case ACTIONS.TOGGLER:
      const { toggler } = action.payload.data;
      return { ...state, toggler };
    case ACTIONS.GAMESTART:
      const { gameStart } = action.payload.data;
      return { ...state, gameStart };
    case ACTIONS.COMPUTERBOARD:
      const { computerBoard } = action.payload.data;
      return { ...state, computerBoard };
    case ACTIONS.GAMEOVER:
      const {gameOver}=action.payload.data;
      return {...state,gameOver}
    case ACTIONS.RESETGAME:
      const newState={
        boardShip: {},
        currShip: {},
        staticShips: {
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
        },
        toggler: true,
        gameStart: false,
        computerBoard: [],
        gameOver: false,
      }
      return newState;
    default:
      return state;
  }
}

export default function Main() {
  const [state, dispatch] = useReducer(reducer, {
    boardShip: {},
    currShip: {},
    staticShips: {
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
    },
    toggler: true,
    gameStart: false,
    computerBoard: [],
    gameOver: false,
  });
  const { staticShips, gameStart, gameOver } = state;
  const shipRender =
    staticShips[1].length === 0 &&
    staticShips[2].length === 0 &&
    staticShips[3].length === 0 &&
    staticShips[4].length === 0;
  console.log(Players.checkwinner());
  if(gameStart && Players.checkwinner() && gameOver===false){
      setTimeout(() => {
        dispatch({
          type:ACTIONS.GAMEOVER,
          payload:{
            data:{
              gameOver:true
            }
          }
        })
      }, 500);
  }
  return (
    <shipData.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div className="Main-cont">
        {gameOver ? (
          <Gameover />
        ) : (
          <div className="wrapper">
            {!gameStart ? (
              <div className="menu">
                {shipRender ? <StartGame /> : null}
                <Randomise />
              </div>
            ) : null}
            {gameStart ? (
              <Lifebox
                user={"bot"}
                className={"animate__animated animate__backInLeft"}
              />
            ) : null}
            {gameStart ? <Userbox /> : <Box />}
            {gameStart ? (
              <svg
                className="animate__animated animate__backInDown"
                width="156"
                height="156"
                viewBox="0 0 156 156"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M117 58.5C135.281 43.3875 140.644 27.0562 142.106 17.0625C147.712 13.1625 151.125 9.75 151.125 9.75C151.125 9.75 154.294 36.3188 125.531 60.2063C88.2375 91.4062 51.1875 110.906 51.1875 110.906L48.0187 106.275C59.475 99.6937 88.2375 82.3875 117 58.5Z"
                  fill="#96A7A8"
                />
                <path
                  d="M47.775 106.275L44.85 101.887C104.325 52.1625 105.544 29.25 105.544 29.25C120.9 29.4938 133.819 22.6688 142.106 16.8188C140.644 26.5688 135.281 42.9 117 58.2563C88.2375 82.3875 59.475 99.6937 47.775 106.275Z"
                  fill="#B8C2C4"
                />
                <path
                  d="M30.225 111.881C28.0312 113.831 28.275 117.487 30.9562 119.925C33.6375 122.362 37.5375 122.606 39.7312 120.656C41.925 118.706 41.6812 115.05 39 112.613C36.5625 110.175 32.4187 109.931 30.225 111.881Z"
                  fill="#C19A61"
                />
                <path
                  d="M31.4437 112.125C29.4937 113.831 29.7375 117 32.175 118.95C34.3687 121.144 37.7812 121.387 39.7312 119.437C41.6812 117.731 41.4375 114.562 39 112.612C36.8062 110.662 33.3937 110.175 31.4437 112.125Z"
                  fill="#DBB471"
                />
                <path
                  d="M24.8625 116.513C22.6687 118.463 22.9125 122.119 25.5937 124.556C28.275 126.994 32.175 127.238 34.3687 125.288C36.5625 123.338 36.3187 119.681 33.6375 117.244C30.9562 114.806 27.0562 114.563 24.8625 116.513Z"
                  fill="#C19A61"
                />
                <path
                  d="M26.0812 116.512C24.1312 118.219 24.375 121.387 26.8125 123.337C29.0063 125.531 32.4188 125.775 34.3688 123.825C36.3188 122.119 36.075 118.95 33.6375 117C31.4438 115.05 28.0312 114.806 26.0812 116.512Z"
                  fill="#DBB471"
                />
                <path
                  d="M19.5 121.144C17.0625 123.094 17.55 126.75 20.2312 129.188C22.9125 131.625 26.8125 131.869 29.0062 129.919C31.2 127.969 30.9562 124.312 28.275 121.875C25.5937 119.437 21.6937 118.95 19.5 121.144Z"
                  fill="#C19A61"
                />
                <path
                  d="M20.475 121.144C18.525 122.85 18.7687 126.019 21.2062 127.969C23.4 130.163 26.8125 130.406 28.7625 128.456C30.7125 126.75 30.4687 123.581 28.0312 121.631C25.8375 119.681 22.425 119.437 20.475 121.144Z"
                  fill="#DBB471"
                />
                <path
                  d="M13.8938 125.531C11.7 127.725 12.1875 131.138 14.625 133.575C17.3063 136.012 21.2063 136.256 23.4 134.306C25.5938 132.356 25.35 128.7 22.6688 126.263C20.2313 123.825 16.3313 123.581 13.8938 125.531Z"
                  fill="#C19A61"
                />
                <path
                  d="M15.1125 125.775C13.1625 127.481 13.4063 130.65 15.8437 132.6C18.0375 134.794 21.45 135.037 23.4 133.087C25.35 131.381 25.1062 128.212 22.6687 126.262C20.475 124.069 17.0625 123.825 15.1125 125.775Z"
                  fill="#DBB471"
                />
                <path
                  d="M7.31249 131.138C14.8687 124.556 11.4562 129.188 16.3312 134.062C30.4687 148.688 54.3562 126.994 38.2687 114.319C29.0062 107.006 35.5875 97.5 40.2187 93.3562C43.1437 90.9187 40.95 95.3062 49.4812 105.3C58.0125 115.537 54.1125 131.625 42.9 141.131C31.2 150.881 17.0625 144.788 11.7 138.206C7.79999 133.819 1.21874 136.013 7.31249 131.138Z"
                  fill="#89664C"
                />
                <path
                  d="M26.8125 141.619C30.7125 141.619 36.075 140.4 40.4625 136.256C45.5812 131.138 47.5312 124.8 46.0687 118.462C49.4812 125.531 48.5062 133.087 42.9 138.45C39 142.35 33.8812 143.081 30.225 142.837C27.0562 142.837 23.8875 142.106 20.9625 140.887C22.9125 141.619 24.8625 141.862 26.8125 141.619Z"
                  fill="#DBB471"
                />
                <path
                  d="M39 58.5C20.7187 43.1437 15.3562 26.8125 13.8937 17.0625C8.2875 13.1625 4.875 9.75 4.875 9.75C4.875 9.75 1.95 36.3188 30.4687 60.2063C67.7625 91.4062 104.812 110.906 104.812 110.906L107.981 106.275C96.525 99.6937 67.7625 82.3875 39 58.5Z"
                  fill="#B0BFC1"
                />
                <path
                  d="M108.225 106.275L111.15 101.887C51.675 52.1625 50.4562 29.25 50.4562 29.25C35.1 29.4937 22.1812 22.6687 13.8937 17.0625C15.3562 26.8125 20.7187 43.1437 39 58.5C67.7625 82.3875 96.525 99.6937 108.225 106.275Z"
                  fill="#C9D1D3"
                />
                <path
                  d="M125.775 111.881C127.969 113.831 127.725 117.487 125.044 119.925C122.362 122.362 118.462 122.606 116.269 120.656C114.075 118.706 114.319 115.05 117 112.613C119.437 110.175 123.581 109.931 125.775 111.881Z"
                  fill="#C19A61"
                />
                <path
                  d="M124.556 112.125C126.506 113.831 126.262 117 123.825 118.95C121.631 121.144 118.219 121.387 116.269 119.437C114.319 117.731 114.562 114.562 117 112.612C119.194 110.662 122.606 110.175 124.556 112.125Z"
                  fill="#DBB471"
                />
                <path
                  d="M131.137 116.513C133.331 118.463 133.087 122.119 130.406 124.556C127.725 126.994 123.825 127.238 121.631 125.288C119.437 123.338 119.681 119.681 122.362 117.244C125.044 114.806 128.944 114.563 131.137 116.513Z"
                  fill="#C19A61"
                />
                <path
                  d="M129.919 116.512C131.869 118.219 131.625 121.387 129.187 123.337C126.994 125.531 123.581 125.775 121.631 123.825C119.681 122.119 119.925 118.95 122.362 117C124.556 115.05 127.969 114.806 129.919 116.512Z"
                  fill="#DBB471"
                />
                <path
                  d="M136.5 121.144C138.694 123.094 138.45 126.75 135.769 129.188C133.087 131.625 129.187 131.869 126.994 129.919C124.8 127.969 125.044 124.312 127.725 121.875C130.406 119.437 134.306 118.95 136.5 121.144Z"
                  fill="#C19A61"
                />
                <path
                  d="M135.525 121.144C137.475 122.85 137.231 126.019 134.794 127.969C132.6 130.163 129.188 130.406 127.238 128.456C125.288 126.75 125.531 123.581 127.969 121.631C130.162 119.681 133.575 119.437 135.525 121.144Z"
                  fill="#DBB471"
                />
                <path
                  d="M142.106 125.531C144.3 127.481 144.056 131.138 141.375 133.575C138.694 136.012 134.794 136.256 132.6 134.306C130.406 132.356 130.65 128.7 133.331 126.263C135.769 123.825 139.669 123.581 142.106 125.531Z"
                  fill="#C19A61"
                />
                <path
                  d="M140.887 125.775C142.837 127.481 142.594 130.65 140.156 132.6C137.962 134.794 134.55 135.037 132.6 133.087C130.65 131.381 130.894 128.212 133.331 126.262C135.525 124.069 138.937 123.825 140.887 125.775Z"
                  fill="#DBB471"
                />
                <path
                  d="M148.687 131.138C140.887 124.8 144.544 129.188 139.669 134.062C125.531 148.688 101.644 126.994 117.731 114.319C126.994 107.006 120.412 97.5 115.781 93.3562C112.856 90.9187 115.05 95.3062 106.519 105.3C97.9875 115.537 101.887 131.625 113.1 141.131C124.8 150.881 138.937 144.788 144.3 138.206C148.2 133.819 154.781 136.013 148.687 131.138Z"
                  fill="#89664C"
                />
                <path
                  d="M129.187 141.619C125.287 141.619 119.925 140.4 115.537 136.256C110.419 131.138 108.469 124.8 109.931 118.462C106.519 125.531 107.494 133.087 113.1 138.45C117 142.35 122.119 143.081 125.775 142.837C128.944 142.837 132.112 142.106 135.037 140.887C133.087 141.619 131.137 141.862 129.187 141.619Z"
                  fill="#DBB471"
                />
              </svg>
            ) : null}
            {gameStart ? <ComputerBox /> : null}
            {gameStart ? (
              <Lifebox
                user={"user"}
                className={"animate__animated animate__backInRight"}
              />
            ) : null}
            {shipRender ? null : <Shipcont />}
          </div>
        )}
      </div>
    </shipData.Provider>
  );
}
