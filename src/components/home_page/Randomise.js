import React, { useContext } from 'react';
import { gameData } from '../../gameData';
import { shipData } from './Main';

export const Randomise = () => {
   const {setboardShip,setstaticShips}=useContext(shipData);
   const staticShips={
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
    ]
   }
   const staticShipsarr=[];
   for(let key in staticShips){
       staticShips[key].forEach(element => {
           staticShipsarr.push(element);
       });
   }
   return <div onClick={(e)=>{
    setTimeout(() => {
        randomizer(setboardShip,setstaticShips,staticShipsarr)
    }, 500);   
    }}>Randomise</div>;
};

function randomizer(setboardShip,setstaticShips,staticShipsarr){
    setstaticShips({4:[],3:[],2:[],1:[]});
    gameData.flushData();
    setboardShip({});
    staticShipsarr.forEach(d=>{
        let typeArr=["horizontal","vertical"];
        let x=+Math.floor(Math.random()*10);
        let y=x+d.size-1;
        let r=+Math.floor(Math.random()*10);
        let type=typeArr[Math.floor(Math.random()*2)];
        let obj={
            name:d.name,
            type:typeArr[Math.floor(Math.random()*2)],
            size:d.size,
            index:[x,y,r]
        }
        while(gameData.setShipinBoard(x,y,r,type)===false){
            x=+Math.floor(Math.random()*10);
            y=x+d.size-1;
            r=+Math.floor(Math.random()*10);
            type=typeArr[Math.floor(Math.random()*2)];
            obj={
                name:d.name,
                type:type,
                index:[x,y,r],
                size:d.size
            }
        }
        obj={
            name:d.name,
            type:type,
            index:[x,y,r],
            size:d.size
        }
        console.log("Entering here");
        gameData.setShipObjinBoard(obj,d.name);
        setboardShip((prev)=>{
            let newData={...prev};
            newData[d.name]=obj;
            return newData;
        });
    })
}
