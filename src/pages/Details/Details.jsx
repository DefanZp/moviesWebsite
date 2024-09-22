import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';


const Details = () => {

  const { id } = useParams();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjQ0YjM3M2U2MmY2Yjc1N2I5NDdjZDhjZWQxN2Q0OCIsIm5iZiI6MTcyNjUzNjAxOS40MjY5MjgsInN1YiI6IjY2ZGZjMmE2YTljYTIwMzE0OWYxYmVmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GXJQ2-lqw2TVBb73qAPasG3PuF0kPVXwcZQExh2omp8",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="details">
      <div className="details-hero">
      {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`}><div className="card" key={index}>
                  <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                   <p>{card.original_title}</p>
                </div>
                </Link>
        })}
      </div>

      <div className="details-rekomendation">
        
      </div>
    </div>
  );
};

export default Details

