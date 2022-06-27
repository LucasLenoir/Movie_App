import React from "react";

const Card = ({ props, setMovieId }) => {
  const addStorage = () => {
    let storedData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    if (!storedData.includes(props.id.toString())) {
      storedData.push(props.id);
      window.localStorage.movies = storedData;
    }
  };
  const deleteStorage = (id) => {
    let storedData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    let arrayStoredData = storedData.filter((Data) => Data !== id.toString());
    setMovieId(arrayStoredData);
    window.localStorage.movies = arrayStoredData.join();
  };
  return (
    <div className="card">
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
        onClick={(e) => (setMovieId ? deleteStorage(props.id) : addStorage())}
      >
        {setMovieId ? "Remove" : "Add to Favs"}
      </div>
    </div>
  );
};

export default Card;
