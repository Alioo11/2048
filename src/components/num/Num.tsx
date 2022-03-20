import {memo ,forwardRef, ForwardedRef , useRef} from 'react'
import { Coor } from '../../utils/commonFunctions'

import "./num.css"

const numColors = [
    "#DAC970",
    "#E8D056",
    "#E8B256",
    "#E8A456",
    "#E85656",
    "#E8568D",
    "#E856B7",
    "#DE56E8",
    "#B856E8",
    "#8656E8",
    "#56A4E8",
    "#56CFE8",
    "#56E85B",
    "#B23100",
]


const Num =  ( {num}:{num:number} )=>{

    //console.log('%crunning Num' , "background:red")

    const numRef:any = useRef(null)

    const numState = Math.floor(Math.log2(num))
    const numStateLength = num.toString().length

    const fontSize = (10 - numStateLength) /10 +1

    window.addEventListener('click',()=>{
        moveMe({x:130 , y:0})
    })


    //console.log(numRef?.current)
    const moveMe = (Cor :Coor):void=>{
        if(!numRef) return
        numRef.current.style.transform = `translateX${Cor.x}`
    }

    return<div ref={numRef} className='num'
        style={{backgroundColor : numColors[numState%numColors.length] ,
            fontSize:`${fontSize}rem`  
        }}
    >
        {num}
        {/* {numStateLength} */}

    </div>
}

export default memo(Num) 