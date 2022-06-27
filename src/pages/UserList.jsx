import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import Card from "../components/Card";

const UserList = () => {
  const [movieIdList, setMovieList] = useState([]);
  const [moviesId, setMoviesId] = useState([]);
  useEffect(() => {
    setMoviesId(
      window.localStorage.movies ? window.localStorage.movies.split(",") : []
    );
  }, []);

  useEffect(() => {
    setMovieList([])
    for (let i = 0; i < moviesId.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=06aed854c0bb71522c688e9d7119e01a`
        )
        .then((res) => setMovieList((movieList) => [...movieList, res.data]));
    }
  }, [moviesId]);

  return (
    <div className="user-list-page">
      <Header />
      <h2>Watch List</h2>
      <div className="result">
        {movieIdList.map((movie, index) => {
          return <Card key={index} props={movie} setMovieId={setMoviesId} />;
        })}
      </div>
    </div>
  );
};

export default UserList;
