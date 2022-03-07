import { Players } from "../../../Players";

beforeAll(() => {
    return Players.player1;
});

describe('Random Hitter Surround Hit test', () => {
    it('Place 4 length ship from 32->35', () => {
        expect(Players.player1.setShipinBoard(2,5,3,'horizontal',"chakra")).toBe(true);
        expect(Players.player1.setShipObjinBoard({
            index: [2, 5, 3],
            name: "chakra",
            size: 4,
            type: "horizontal",
        },'chakra')).not.toBe(false);
        console.log(Players.player1.getBoardShips());
    });
    it('Hit surround the ship 32',()=>{
        expect(Players.player1.setHit(2,1,true)).toBe(true);
        expect(Players.player1.setHit(2,2,true)).toBe(true);
        expect(Players.player1.setHit(2,3,true)).toBe(true);
        expect(Players.player1.setHit(2,4,true)).toBe(true);
        expect(Players.player1.setHit(2,5,true)).toBe(true);
        expect(Players.player1.setHit(2,6,true)).toBe(true);
        expect(Players.player1.setHit(3,1,true)).toBe(true);
        expect(Players.player1.setHit(4,1,true)).toBe(true);
        expect(Players.player1.setHit(4,2,true)).toBe(true);
        expect(Players.player1.setHit(4,3,true)).toBe(true);
        expect(Players.player1.setHit(4,4,true)).toBe(true);
        expect(Players.player1.setHit(4,5,true)).toBe(true);
        expect(Players.player1.setHit(4,6,true)).toBe(true);
        expect(Players.player1.setHit(3,6,true)).toBe(true);
    });
    it('Hit the ship in 32',()=>{
        expect(Players.player1.setHit(3,2,true)).toBe(true);
        Players.player1.setPrevData(["31","33","22","42"]);
        let num=0;
        while(Players.player1.getBoardShips()["chakra"].size!==0){
            Players.player1.randomHitter();
            num++;
        }
        console.log(num);
        expect(num).toBe(3);
    })
});
describe('Random Hitter Function Test', () => {
    it('Place 4 length ship from 72->74', () => {
        expect(Players.player1.setShipinBoard(2,4,7,'horizontal',"marine")).toBe(true);
        expect(Players.player1.setShipObjinBoard({
            index: [2, 4, 7],
            name: "marine",
            size: 3,
            type: "horizontal",
        },'marine')).not.toBe(false);
        console.log(Players.player1.getBoardShips());
    });
    it('Hit the ship in 73',()=>{
        expect(Players.player1.setHit(7,3,true)).toBe(true);
        Players.player1.setPrevData(["72","74","63","83"]);
        let num=0;
        while(Players.player1.getBoardShips()["marine"].size!==0){
            Players.player1.randomHitter();
            num++;
        }
        console.log(num);
        expect(num).toBeLessThanOrEqual(4);
    })
});