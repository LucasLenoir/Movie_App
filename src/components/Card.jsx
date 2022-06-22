import React from "react";

const Card = ({ props }) => {
  return (
    <div className="card">
      <h2>{props.title ?? props.name}</h2>
      <h3>{props.results ? props.results : props.cast}</h3>
      <p>{props.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`}
        alt=""
      />
    </div>
  );
};

export default Card;
