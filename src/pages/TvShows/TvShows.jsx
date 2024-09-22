import React, { useEffect, useState, useRef } from 'react';
import './TvShows.css';
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { Link } from 'react-router-dom';

const TvShows = () => {
  const [airingToday, setAiringToday] = useState([]);
  const [onTheAir, setOnTheAir] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const scrollRef = useRef(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjQ0YjM3M2U2MmY2Yjc1N2I5NDdjZDhjZWQxN2Q0OCIsIm5iZiI6MTcyNzAzNjMxMi44MzExOTcsInN1YiI6IjY2ZGZjMmE2YTljYTIwMzE0OWYxYmVmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WoL3HHZDQxG2zaPtdwZSJi79z7BH4vNCakIqr9ttNa4'
    }
  };

  useEffect(() => {
    // Fetch Airing Today
    fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => setAiringToday(data.results))
      .catch(err => console.error(err));

    // Fetch On The Air
    fetch('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => setOnTheAir(data.results))
      .catch(err => console.error(err));

    // Fetch Popular
    fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => setPopular(data.results))
      .catch(err => console.error(err));

    // Fetch Top Rated
    fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => setTopRated(data.results))
      .catch(err => console.error(err));
  }, []);

  const handleWheel = (e) => {
    e.preventDefault();
    scrollRef.current.scrollLeft += e.deltaY;
  };

  const renderTvShows = (tvShows) => {
    return tvShows.map(show => (
      <div className="tv-card" key={show.id}>
        <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} />
        <p>{show.name}</p>
      </div>
    ));
  };

  return (
    <div className="tv-shows">
        <div className="back">
        <Link to={"/"}>
          <img src={back_arrow_icon} alt="" />
        </Link>
        </div>
           
    <h1 className='Header'>TvShows</h1>
      <h2>Airing Today</h2>
      <div className="tv-show-row" ref={scrollRef} onWheel={handleWheel}>
        {renderTvShows(airingToday)}
      </div>

      <h2>On The Air</h2>
      <div className="tv-show-row" ref={scrollRef} onWheel={handleWheel}>
        {renderTvShows(onTheAir)}
      </div>

      <h2>Popular</h2>
      <div className="tv-show-row" ref={scrollRef} onWheel={handleWheel}>
        {renderTvShows(popular)}
      </div>

      <h2>Top Rated</h2>
      <div className="tv-show-row" ref={scrollRef} onWheel={handleWheel}>
        {renderTvShows(topRated)}
      </div>
    </div>
  );
};

export default TvShows;
