import React, { useState } from 'react';
import logo from '../../assets/ClickFilm.png';
import search_icon from '../../assets/search_icon.png';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { Link } from 'react-router-dom';
import SearchMovies from '../Search/Search';
import './Navbar.css';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full py-[25px] px-[6%] flex justify-between text-gray-300 text-sm bg-gradient-to-b from-black/70 to-transparent z-10">
      <div className="flex items-start gap-[50px] mt-[20px]">
        < img src={logo} alt="Logo" className="w-[100px]" />
        <ul className="flex list-none gap-[20px]">
          <Link to={'/'}>
            <li className="cursor-pointer hover:text-white">Home</li>
          </Link>
          <Link to={'/tvshows'}>
            <li className="cursor-pointer hover:text-white">TvShows</li>
          </Link>
          <Link to={'/movies'}>
            <li className="cursor-pointer hover:text-white">Movies</li>
          </Link>
          <li className="cursor-pointer hover:text-white">New & Popular</li>
          <li className="cursor-pointer hover:text-white">My List</li>
        </ul>
      </div>

      <div className="flex items-center gap-[20px]">
        <SearchMovies />
        <img src={bell_icon} alt="Notification" className="w-[20px] cursor-pointer" />
        <div className="navbar-profile">
          <img src={profile_img} alt="Profile" className="rounded w-[35px]" />
          <img src={caret_icon} alt="Caret" />
          <div className="dropdown">
            <p>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
