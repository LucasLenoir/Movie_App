import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Iframe from "./Iframe";

const Form = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortGoodBad, setSortGoodBad] = useState(null);
  const [keyVideo, setKeyVideo] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=06aed854c0bb71522c688e9d7119e01a`
      )
      .then((res) => setMoviesData(res.data.results));
  }, []);

  useEffect(() => {
    if (search !== "") {
      axios
        .get(
          `https://api.themoviedb.org/3/search/multi?api_key=06aed854c0bb71522c688e9d7119e01a&query=${search}`
        )
        .then((res) => {
          setMoviesData([]);

          if (res.data.results) {
            res.data.results.forEach((movie) => {
              movie.media_type !== "person"
                ? setMoviesData((movies) => [...movies, movie])
                : axios
                    .get(
                      `https://api.themoviedb.org/3/person/${movie.id}/movie_credits?api_key=06aed854c0bb71522c688e9d7119e01a`
                    )
                    .then((res) => {
                      setMoviesData((movies) => [...movies, ...res.data.cast]);
                    });
            });
          }
        });
    }
  }, [search]);

  return (
    <>
      <Iframe keyVideo={keyVideo} setActive={setActive} active={active} />
      <div className="form-component">
        <div className="form-container">
          <form>
            <input
              type="text"
              placeholder="Enter a movie or an Actor "
              id="search-input"
              autoCorrect="off"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <div className="btn-sort-container">
            <div
              className="btn-sort"
              id="goodToBad"
              onClick={() => setSortGoodBad("goodToBad")}
            >
              Top <span>&#10141;</span>
            </div>
            <div
              className="btn-sort"
              id="badToGood"
              onClick={() => setSortGoodBad("badToGood")}
            >
              Bottom<span>&#10141;</span>
            </div>
          </div>
        </div>
        <div className="result">
          {moviesData
            .sort((a, b) => a.id - b.id)
            .slice(0, 100)
            .sort((a, b) => {
              if (sortGoodBad === "goodToBad") {
                return b.vote_average - a.vote_average;
              } else if (sortGoodBad === "badToGood") {
                return a.vote_average - b.vote_average;
              }
            })
            .map((movie, index) => {
              if (movie.id !== moviesData[index + 1]?.id) {
                return (
                  <Card
                    key={index}
                    props={movie}
                    setKeyVideo={setKeyVideo}
                    setActive={setActive}
                  />
                );
              }
            })}
        </div>
      </div>
    </>
  );
};

export default Form;
