import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaPlay, FaPause } from "react-icons/fa";
import Titlecards from "../../components/TitleCardsRecomend/TitleCardR"
import Actor from "../../components/Actor/Actor"

const Player = () => {
  const { id } = useParams();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
    original_title: "",
    overview: "",
  });
  const [genres, setGenres] = useState([]);
  const [productionCompanies, setProductionCompanies] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [player, setPlayer] = useState(null);

  const iframeRef = useRef(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjQ0YjM3M2U2MmY2Yjc1N2I5NDdjZDhjZWQxN2Q0OCIsIm5iZiI6MTcyNjUzNjAxOS40MjY5MjgsInN1YiI6IjY2ZGZjMmE2YTljYTIwMzE0OWYxYmVmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GXJQ2-lqw2TVBb73qAPasG3PuF0kPVXwcZQExh2omp8",
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => {
        const videos = response.results;
        const selectedVideo =
          videos.find((video) => video.type === "Trailer") ||
          videos.find((video) => video.type === "Teaser");
        setApiData(
          selectedVideo || { name: "", key: "", published_at: "", type: "" }
        );
      })
      .catch((err) => console.error(err));

    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((response) => response.json())
      .then((data) => {
        setApiData((prevData) => ({
          ...prevData,
          original_title: data.original_title,
          overview: data.overview,
          published_at: data.release_date,
        }));
        setGenres(data.genres || []);
        setProductionCompanies(data.production_companies || []);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const onPlayerStateChange = (event) => {
    if (event.data === 2) {
      setIsPaused(true);
    } else if (event.data === 1) {
      setIsPaused(false);
    }
  };

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player(iframeRef.current, {
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
      setPlayer(newPlayer);
    };
  }, []);

  // Fungsi untuk Play dan Pause
  const togglePlayPause = () => {
    if (player) {
      if (isPaused) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }
  };

  return (
    <div className="flex align-middle justify-center h-[100vh] relative">
      {/* Iframe YouTube */}
      <iframe
        ref={iframeRef}
        className={`w-full h-full transition-opacity duration-500 ease-in-out ${
          isPaused ? "opacity-40" : "opacity-100"
        }`}
        src={`https://www.youtube.com/embed/${apiData.key}?enablejsapi=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&fs=1`}
        title="trailer"
        frameBorder={0}
        allowFullScreen
      ></iframe>

      {/* Detail Video */}
      <div
        className={`flex flex-col p-4 absolute  justify-between w-[100%] h-[100%] bg-black bg-opacity-80 text-white transition-opacity duration-500 ease-in-out ${
          isPaused ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        id="detail"
      >
        <Link to={"/"}>
          <IoChevronBackOutline className="w-[40px] h-[40px] absolute top-9 left-9 bg-white bg-opacity-[20%] p-2 rounded-full hover:bg-opacity-[30%]"  />
        </Link>

        {/* Tombol Play/Pause di dalam detail */}
        <div className="w-[100%] flex justify-center">
        <button
            onClick={togglePlayPause}
            className=" w-[50px] h-[50px] text-white flex items-center justify-center gap-2 text-center bg-white bg-opacity-[10%] p-4 mt-[200px] rounded-full hover:bg-opacity-[20%]"
          >
            {isPaused ? (
              <>
                <FaPlay /> 
              </>
            ) : (
              <>
                <FaPause /> 
              </>
            )}
          </button>
          </div>

        <div className="flex flex-row overflow-x-hidden items-center">

        <div className="flex flex-col justify-center items-start pl-14 pb-9 pr-14 w-[50%]">
          
          <p className="text-lg uppercase font-medium">{genres.map((genre) => genre.name).join("  |  ")}</p>
          <p className="text-5xl font-bold mt-2">{apiData.original_title}</p>

          <div className="flex flex-row items-center font-medium gap-3 uppercase mt-3">
          <p>{apiData.published_at?.slice(0, 4)}</p>
          <p>|</p>
          {productionCompanies.length > 0 && (
            <p className="">{productionCompanies[0].name}</p>
          )}
          </div>

          <p className="text-sm text-gray-400 font-light mt-4 leading-relaxed">{apiData.overview}</p>
         
        </div>
          <div className="w-[50%] flex flex-col justify-between pr-14 pl-14 pb-9">
            <>
            <Titlecards></Titlecards>
            <Actor movieId={id}></Actor>
            </>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default Player;
