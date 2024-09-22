import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/Spiderman2.jpg'
import hero_title from '../../assets/Spiderman_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import { Link } from 'react-router-dom'
import SPlayer from '../SPlayer/SPlayer'

const Home = () => {
  return (
    <div className='home'>
      <Navbar/>
      <div className="hero">
        <img src={hero_banner} alt="" className='banner-img'/>
        <div className="hero-caption">
          <img src={hero_title} alt="" className='caption-img'/>
          <p>Enter the multiverse and discover different versions of Spider-Man. Spider-Man: Into the Spider-Verse delivers an exciting, dimension-hopping adventure with plenty of surprises.
          </p>
          <div className="hero-btns">
            <Link to={'/splayer'}>
            <button className='btn'><img src={play_icon} alt="" />Play</button>
            </Link>
          <button className='btn dark-btn'><img src={info_icon} alt="" />More Info</button>
          </div>
          <TitleCards title={"Now Playing"} category={"now_playing"}/>
        </div>
      </div>

      <div className="more-cards">
      <TitleCards title={"Popular"} category={"popular"}/>
      <TitleCards title={"Top Rated"} category={"top_rated"}/>
      <TitleCards title={"Upcoming"} category={"upcoming"}/>
      </div>
      
    </div>
  )
}

export default Home
