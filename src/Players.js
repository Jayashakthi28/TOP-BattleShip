import { game } from "./gameData"

const Player=()=>{
    const player1=game();
    const player2=game();
    player1.name="Computer";
    player2.name="User";
    const checkwinner=()=>{
        if(player1.checkWinner()){
            return player1.name
        }
        else if(player2.checkWinner()){
            return player2.name
        }
        else{
            return false;
        }
    }
    const resetGame=()=>{
        player1.flushData();
        player2.flushData();
    }
    return {player1,player2,checkwinner,resetGame}
}

export const Players=Player();