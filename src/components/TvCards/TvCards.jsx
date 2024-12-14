import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjQ0YjM3M2U2MmY2Yjc1N2I5NDdjZDhjZWQxN2Q0OCIsIm5iZiI6MTcyNjUzNjAxOS40MjY5MjgsInN1YiI6IjY2ZGZjMmE2YTljYTIwMzE0OWYxYmVmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GXJQ2-lqw2TVBb73qAPasG3PuF0kPVXwcZQExh2omp8',
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  const handleCardClick = () => {
    // Memaksa browser reload saat card diklik
    window.location.reload();
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${category ? category : 'Airing Today'}?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel);
  }, [category]);

  return (
    <div className="mt-[50px] mb-8">
      <h2 className="font-semibold text-2xl text-white mb-2">
        {title ? title : 'Popular On Netflix'}
      </h2>
      <div className="flex flex-row overflow-x-hidden gap-2" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <div
              key={index}
              onClick={handleCardClick} // Memanggil handleCardClick saat card diklik
            >
              <Link to={`/player/${card.id}`}>
                <div className="w-60 relative">
                  <img
                    className="object-cover rounded-md"
                    src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                    alt=""
                  />
                  <p className="absolute bottom-2 right-3 text-white drop-shadow-[0_0_2px_rgba(0,0,0,1)]">
                    {card.original_title}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
