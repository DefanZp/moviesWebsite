import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import React from 'react'
import Home from './pages/Home/Home'
import Player from './pages/Player/Player'
import Details from './pages/Details/Details'
import TvShows from './pages/TvShows/TvShows'
import Movies from './pages/Movies/Movies'
import SPlayer from './pages/SPlayer/SPlayer'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/player/:id' element={<Player/>}/>
        <Route path='/details' element={<Details/>}/>
        <Route path='/tvshows' element={<TvShows/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/splayer' element={<SPlayer/>}/>
      </Routes>
    </Router>
  )
}

export default App
