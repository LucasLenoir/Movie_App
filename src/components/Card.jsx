import axios from "axios";
import React, { useState, useEffect } from "react";

const Card = ({ props, setMovieId, setKeyVideo, setActive }) => {
 
  const addStorage = () => {
    let storedData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];
    setFav(true);

    if (!storedData.includes(props.id.toString())) {
      storedData.push(props.id);
      window.localStorage.movies = storedData;
    }
  };
  const deleteStorage = (id) => {
    let storedData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];
    setFav(false);

    let arrayStoredData = storedData.filter((Data) => Data !== id.toString());
    setMovieId ? setMovieId(arrayStoredData) : "";
    window.localStorage.movies = arrayStoredData.join();
  };
  const [fav, setFav] = useState(false);
  useEffect(() => {
    let storedData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    storedData.forEach((d) => {
      if (d === props.id.toString()) {
        setFav(true);
      }
    });
  }, []);

  return (
    <div className="card">
      <div
        className={fav ? "active" : ""}
        id="favs"
        onClick={(e) => (fav ? deleteStorage(props.id) : addStorage())}
      ></div>

      <img
        src={
          props.poster_path
            ? `https://image.tmdb.org/t/p/w500/${props.poster_path}`
            : "./img/poster.jpg"
        }
        alt="movie poster"
      />
      <h2>{props.title ?? props.name}</h2>
      {props.release_date ? <h5>Released on : {props.release_date}</h5> : ""}
      <h4>
        {props.vote_average}/10 <span>&#11088;</span>
      </h4>
      <h3>{props.results ? props.results : props.cast}</h3>
      <p>{props.overview}</p>
      <div
        className="btn"
        id="trailer"
        onClick={() => {
          axios
            .get(
              `https://api.themoviedb.org/3/movie/${props.id}?api_key=06aed854c0bb71522c688e9d7119e01a&append_to_response=videos`
            )
            .then((res) => {
              
              const teaser = res.data.videos.results.filter((r) => {
                return r.type === "Teaser" || "Trailer";
              })[0];

              setKeyVideo(teaser.key);
              setActive(true);
            });
        }}
      >
        Watch Trailer
      </div>
    </div>
  );
};

export default Card;
