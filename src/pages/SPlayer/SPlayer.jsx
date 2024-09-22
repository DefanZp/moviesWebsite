import React from 'react'
import './SPlayer.css'
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { Link } from 'react-router-dom';
const SPlayer = () => {
  return (
    <div className="player">
    <div className="player-head">
      <Link to={"/"}>
        <img src={back_arrow_icon} alt="" />
      </Link>
      <iframe
        width="50%"
        height="50%"
        src={`https://www.youtube.com/embed/g4Hbz2jLxvQ`}
        title="trailer"
        frameBorder={0}
        allowFullScreen
      ></iframe>
    </div>

    <div className="player-info">
      <h2>Spiderman Into The Spider-Verse</h2>
      <table>
        <tr>
          <td>
            <p>Movie Name </p>
          </td>
          <td  className="ps">: </td>
          <td>
              <p className="ps">Spiderman Into The Spider-Verse</p>
          </td>
        </tr>

        <tr>
          <td>
            <p>Type </p>
          </td>
          <td  className="ps">: </td>
          <td>
            <p  className="ps">Trailer</p>
          </td>
        </tr>

        <tr>
          <td>
            <p>Published</p>
          </td>
          <td className="ps">:</td>
          <td>
            <p  className="ps">-</p>
          </td>
        </tr>

      </table>
    </div>
  </div>
  )
}

export default SPlayer
