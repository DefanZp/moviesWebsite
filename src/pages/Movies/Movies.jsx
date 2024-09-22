import React from 'react'
import TitleCards from '../../components/TitleCards/TitleCards'
import './Movies.css'
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { Link } from 'react-router-dom';

const Movies = () => {
  return (
    <div>
        <div className="back">
        <Link to={"/"}>
          <img src={back_arrow_icon} alt="" />
        </Link>
        </div>
     <h1 className='Header'>Movies</h1>
      <div className="more-cards">
      <TitleCards title={"Popular"} category={"popular"}/>
      <TitleCards title={"Top Rated"} category={"top_rated"}/>
      <TitleCards title={"Upcoming"} category={"upcoming"}/>
      </div>
    </div>
  )
}

export default Movies
