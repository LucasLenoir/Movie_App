import React, { useEffect, useState } from "react";

const Iframe = ({ keyVideo, active, setActive }) => {
  return (
    <div
      className={active ? "active" : ""}
      id={"iframe"}
      onClick={(e) => {
        setActive(false);
      }}
    >
      {" "}
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${active ? keyVideo : ""}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Iframe;
