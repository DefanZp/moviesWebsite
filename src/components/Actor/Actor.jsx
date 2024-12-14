import React, { useEffect, useState } from 'react';

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjQ0YjM3M2U2MmY2Yjc1N2I5NDdjZDhjZWQxN2Q0OCIsIm5iZiI6MTcyNjUzNjAxOS40MjY5MjgsInN1YiI6IjY2ZGZjMmE2YTljYTIwMzE0OWYxYmVmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GXJQ2-lqw2TVBb73qAPasG3PuF0kPVXwcZQExh2omp8',
    },
  };

  // Fungsi untuk mengambil data aktor
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.cast) {
          setCast(data.cast.slice(0, 5)); // Ambil 10 aktor teratas
        }
      })
      .catch((err) => console.error(err));
  }, [movieId]);

  return (
    <div className="">
      <h2 className="font-semibold text-base text-white mb-4">Actor</h2>
      <div className="flex flex-row gap-8">
        {cast.map((actor) => (
          <div key={actor.id} className=" flex flex-col items-center text-center w-[50px]">
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className=" w-[50px] h-[50px] rounded-full mb-2"
            />
            <p className=" text-white mt-2 text-xs font-light">{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCast;
