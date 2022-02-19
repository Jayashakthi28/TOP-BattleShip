import { game } from "./gameData"

const Player=()=>{
    const player1=game();
    const player2=game();
    return {player1,player2}
}

export const Players=Player();