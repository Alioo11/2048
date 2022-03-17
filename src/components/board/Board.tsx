import React ,{useEffect, useState , useRef, useDebugValue}from 'react'
import { directions , slide , addRandomItemtoBoard} from '../../utils/commonFunctions'
import "./Board.css"
import Num from '../num/Num'


const initBoard = (size :number) :Array<Array<number>> =>{
    const matrix = [];
    for(let i=0 ;i<size ; i++){
        const row =[]
        for(let j=0 ; j<size ; j++){
            if( i*size +j === Math.floor((size**2)/2) || 
             i*size +j === Math.floor((size**2)/2) +3 ||
            i*size +j === Math.floor((size**2)/2) +4  ||
            i*size +j === Math.floor((size**2)/2) +5){
                row.push(2)
            }else{row.push(-1)}
        }
        matrix.push(row)
    }
    return matrix
}


const Board = ({BoardSize}:{BoardSize:number})=>{
    const overLayRef:any = useRef(null)

    const [touchStartX , setTouchStartX] = useState(0)
    const [touchEndX , setTouchEndX] = useState(0)

    const [touchStartY , setTouchStartY] = useState(0)
    const [touchEndY , setTouchEndY] = useState(0)


    const [startTouchCOR , setStartTouchCOR] = useState({X : 0 , Y :0})
    const [endTouchCOR , setEndTouchCOR] = useState({X: 0 , Y:0})

    useEffect(()=>{
       const {X:startX , Y:startY} = startTouchCOR
       const {X:endX , Y:endY} = endTouchCOR

       const horDif = Math.abs(endX - startX)
       const varDif = Math.abs(endY - startY)


        if(horDif <50 && varDif<50) return
        console.log(horDif)
        console.log(varDif)

        if(horDif>varDif){
        if (endX < startX) {
            console.log('left')
            defineTouchEvents(directions.left)
        }
        if (endX > startX){
            console.log('right')
            defineTouchEvents(directions.right)}
        }else{
        if (endY < startY) {
            console.log('up')
            defineTouchEvents(directions.up)}
        if (endY > startY) {
            console.log('down')
            defineTouchEvents(directions.down)}
        }

    },[endTouchCOR])

    useEffect(()=>{
        document.addEventListener('keydown', defineEvent )
        return ()=> document.removeEventListener('keydown', defineEvent)
    },[])

    useEffect(()=>{
        if(overLayRef && overLayRef.current){
            overLayRef.current.addEventListener('touchstart', startTouch )
            overLayRef.current.addEventListener('touchend', endTouch )

            return ()=> {

                overLayRef.current.removeEventListener('touchstart', startTouch )
                overLayRef.current.removeEventListener('touchend', endTouch )
            }
        }
    },[])

    const [board, setBoard] = useState(initBoard(BoardSize))

    const defineEvent = (e:KeyboardEvent)=>{
        switch(e.key){
            case "ArrowUp":{
                setBoard((board)=>slide(board , directions.up))
                setBoard(board => addRandomItemtoBoard(board))
                 break;
            }
            case "ArrowRight":{
                setBoard((board)=>slide(board , directions.right))
                setBoard(board => addRandomItemtoBoard(board))
                break;
            }
            case "ArrowDown":{
                setBoard((board)=>slide(board , directions.down))
                setBoard(board => addRandomItemtoBoard(board))
                break;
            }
            case "ArrowLeft":{
                setBoard((board)=>slide(board , directions.left))
                setBoard(board => addRandomItemtoBoard(board))
                break;
            }
            default:{
                console.log('unknown key')
            }
        }
    }
    const defineTouchEvents = (direction : directions)=>{
        setBoard((board)=>slide(board , direction))
        setBoard(board => addRandomItemtoBoard(board))
    }

    const startTouch = (e:TouchEvent)=>{
        setStartTouchCOR({ X: e.changedTouches[0].screenX , Y :e.changedTouches[0].screenY})

    }
    const endTouch = (e:TouchEvent)=>{
        setEndTouchCOR({ X: e.changedTouches[0].screenX , Y :e.changedTouches[0].screenY})
    }


    useEffect(()=>{
        setBoard(initBoard(BoardSize))
    },[BoardSize])

    return <div className='boardContainer'> 
        <div ref={overLayRef} className='overLay'></div>
        <div className='board' 
        style={{gridTemplateColumns:`repeat(${BoardSize}, 1fr)` ,
        gridTemplateRows:`repeat(${BoardSize}, 1fr)`}}>
            {board.map((row , rowIndex)=>{
               return row.map((cell , cellIndex)=>{
                    return (
                        <div key={rowIndex * BoardSize + cellIndex} className='cell'>
                            {cell !== -1 && <Num num={cell}/>}
                        </div>
                    )
                })
            })}
    </div>
    </div>
}

export default Board