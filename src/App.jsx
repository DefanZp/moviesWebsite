import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import React from 'react'
import Home from './pages/Home/Home'
import Player from './pages/Player/Player'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/player/:id' element={<Player/>}/>
      </Routes>
    </Router>
  )
}

export default App
