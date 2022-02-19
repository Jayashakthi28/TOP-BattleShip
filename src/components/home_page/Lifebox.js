import React from 'react'
import {AiFillHeart} from "react-icons/ai"
import { Players } from '../../Players';
export const Lifebox = ({user,className}) => {
  let data=(user==="bot")?(Players.player1.getBoardShips()):(Players.player2.getBoardShips());
  let lifeArr=[];
  let newClassName=className+" lifebox";
  for(let i=0;i<=3;i++){
      lifeArr[i]=[];
  }
  for(let key in data){
    let start=data[key].index[0];
    let end=data[key].index[1];
    let num=end-start+1
    lifeArr[num-1].push(data[key].size);
  }
  return (
    <div className={newClassName}>
        {
        lifeArr.map((t,i)=>{
            return <Heart key={i} data={t} size={i+1}/>
        })
        }
    </div>
  )
}


const Heart = ({data,size}) => {
  return (
    <div className='wrapper'>
        {
            data.map((t,i)=>{
                return <Shape key={i} size={size} color={(t<=0)?"grey":"red"}/>
            })
        }
    </div>
  )
}

const Shape=({size,color})=>{
    let temp=[...new Array(size)];
    return <div>
        {
        temp.map((t,i)=>{
           return <AiFillHeart key={i} color={color}/>
        })
        }
    </div>
}