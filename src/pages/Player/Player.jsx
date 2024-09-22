import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { Link, useNavigate, useParams } from "react-router-dom";

const Player = () => {
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
    <div className="player">
      <div className="player-head">
        <Link to={"/"}>
          <img src={back_arrow_icon} alt="" />
        </Link>
        <iframe
          width="50%"
          height="50%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="trailer"
          frameBorder={0}
          allowFullScreen
        ></iframe>
      </div>

      <div className="player-info">
        <h2>{apiData.name}</h2>
        <table>
          <tr>
            <td>
              <p>Movie Name </p>
            </td>
            <td  className="ps">: </td>
            <td>
                <p className="ps">{apiData.name}</p>
            </td>
          </tr>

          <tr>
            <td>
              <p>Type </p>
            </td>
            <td  className="ps">: </td>
            <td>
              <p  className="ps">{apiData.type}</p>
            </td>
          </tr>

          <tr>
            <td>
              <p>Published</p>
            </td>
            <td className="ps">:</td>
            <td>
              <p  className="ps">{apiData.published_at.slice(0, 10)}</p>
            </td>
          </tr>

        </table>
      </div>
    </div>
  );
};

export default Player;
