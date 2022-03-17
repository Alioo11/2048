import React , {useEffect, useState , useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import { setBoardSize } from './utils/commonFunctions';

import Board from './components/board/Board';
import Navbar from './components/navBar/Navbar';
import InitPage from './components/initPage/Initpage';


function App() {


  const [showInitPage , setShowInitPage] = useState(true)
  const [BoardSize , setBoardSize] = useState(0)

  useEffect(()=>{
    return ()=> setShowInitPage(false)
  },[BoardSize])

  return ( 
    <div className="App">
      <Navbar/>
      {!showInitPage && <Board BoardSize = {BoardSize}/>}
      {showInitPage && <InitPage setBoardSize = {setBoardSize}/>}
    </div>
    
  );
}

export default App;
