import React from "react";
import Header from "../components/Header";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "../components/Card";
import Iframe from "../components/Iframe";

const Category = () => {
  const [keyVideo, setKeyVideo] = useState("");
  const [active, setActive] = useState(false);
  const [listCat, setListCat] = useState([]);
  const [result, setResult] = useState([]);
  const [sortGoodBad, setSortGoodBad] = useState(null);
  const [idCategory, setIdCategory] = useState("");
  const [page, setPage] = useState();
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const getMovieByCat = (e, id) => {
    setResult([]);
    setIdCategory(id);
    setPage(2);
    e.target.style.className + "active";

    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie/?api_key=06aed854c0bb71522c688e9d7119e01a&with_genres=${id}
    `
      )
      .then((res) => setResult(res.data.results));
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=06aed854c0bb71522c688e9d7119e01a`
      )
      .then((res) => setListCat(res.data.genres));
  }, []);

  const loadAnotherPage = (e) => {
    setIndex((index) => index + 1);

    if (index === 6) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie/?api_key=06aed854c0bb71522c688e9d7119e01a&with_genres=${idCategory}&page=${page}
       `
        )
        .then((res) => setResult((result) => [...result, ...res.data.results]))
        .then(setIndex(0));
      setPage((page) => page + 1);
    }
  };
  return (
    <>
      <Iframe keyVideo={keyVideo} setActive={setActive} active={active} />
      <div className="category-page">
        <Header />
        <div className="btn-sort-container">
          <div
            className="btn-sort"
            id="goodToBadCat"
            onClick={() => setSortGoodBad("goodToBad")}
          >
            Top <span>&#10141;</span>
          </div>
          <div
            className="btn-sort"
            id="badToGoodCat"
            onClick={() => setSortGoodBad("badToGood")}
          >
            Bottom<span>&#10141;</span>
          </div>
        </div>
        <div className="btn-cat-container">
          {listCat.map((cat, index) => {
            return (
              <button
                className="btn-cat"
                key={index}
                onClick={(e) => {
                  getMovieByCat(e, cat.id);
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
        <div
          className="result"
          ref={ref}
          onWheel={loadAnotherPage}
          onTouchMove={loadAnotherPage}
        >
          {result
            .sort((a, b) => {
              if (sortGoodBad === "goodToBad") {
                return b.vote_average - a.vote_average;
              } else if (sortGoodBad === "badToGood") {
                return a.vote_average - b.vote_average;
              }
            })
            .map((res, index) => {
              return (
                <Card
                  key={index}
                  props={res}
                  setKeyVideo={setKeyVideo}
                  setActive={setActive}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Category;
