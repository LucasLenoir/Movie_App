import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Form = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("");
  // const [searchArtist, setSearchArtist] = useState("");

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
          console.log(res);
          setMoviesData([]);
          if (res.data.results) {
            res.data.results.forEach((movie) => {
              movie.media_type !== "person"
                ? setMoviesData((movies) => {
                    const clone = movies;
                    clone.push(movie);
                    return clone;
                  })
                : axios
                    .get(
                      `https://api.themoviedb.org/3/person/${movie.id}/movie_credits?api_key=06aed854c0bb71522c688e9d7119e01a`
                    )
                    .then((res) => {
                      setMoviesData(res.data.cast);
                    });
            });
          }
        });
    }
  }, [search]);
  // useEffect(() => {
  //   if (searchArtist !== "") {
  //     axios
  //       .get(
  //         `https://api.themoviedb.org/3/search/person?api_key=06aed854c0bb71522c688e9d7119e01a&query=${searchArtist}`
  //       )
  //       .then((res) => res.data.results[0].id)
  //       .then((id) => {
  //         axios
  //           .get(
  //             `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=06aed854c0bb71522c688e9d7119e01a`
  //           )
  //           .then((res) => setMoviesData(res.data.cast));
  //       });
  //   }
  // }, [searchArtist]);
  return (
    <div className="form-component">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="Enter a movie name"
            id="search-input"
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <input type="submit" value="Research" /> */}
        </form>
        <form>
          {/* <input
              type="text"
              placeholder="Enter an actor name"
              id="search-input"
              onChange={(e) => setSearchArtist(e.target.value)}
            /> */}
          {/* <input type="submit" value="Research" /> */}
        </form>

        <div className="btn-sort-container">
          <div className="btn-sort" id="goodToBad">
            Top <span>&#10141;</span>
          </div>
          <div className="btn-sort" id="badToGood">
            Bottom<span>&#10141;</span>
          </div>
        </div>
      </div>
      <div className="result">
        {moviesData.slice(0, 100).map((movie) => (
          <Card key={movie.id} props={movie} />
        ))}
      </div>
    </div>
  );
};

export default Form;
