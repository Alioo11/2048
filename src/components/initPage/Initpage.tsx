import react from 'react'
import './initPage.css'

const InitPage = ({setBoardSize}:{setBoardSize:Function})=>{
    console.log('%crendering initPage','background:green')
    return <div>
        <h2>select board size</h2>
            <div className='grid'>
            <div onClick={()=>setBoardSize(3)} className='grid_item'>3x3</div>
            <div onClick={()=>setBoardSize(4)} className='grid_item'>4x4</div>
            <div onClick={()=>setBoardSize(5)} className='grid_item'>5x5</div>
            <div onClick={()=>setBoardSize(6)} className='grid_item'>6x6</div>
            <div onClick={()=>setBoardSize(7)} className='grid_item'>7x7</div>
            <div onClick={()=>setBoardSize(8)} className='grid_item'>8x8</div>
            <div onClick={()=>setBoardSize(9)} className='grid_item'>9x9</div>
            <div onClick={()=>setBoardSize(10)} className='grid_item'>10x10</div>
        </div>
    </div>

}

export default InitPage