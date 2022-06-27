import React from "react";

const Card = ({ props }) => {


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
    </div>
  );
};

export default Card;
