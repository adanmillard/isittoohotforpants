import React from "react";
import "../header/heading.css";

export const Heading = () => {
  return (
    <div className="header-container">
      <header>
        <h1>Is it too hot for pants?</h1>
        <p>
          A fun app to decide <b>WEATHER</b> or not you should wear long pants.
          Type in your city below to find out!
        </p>
      </header>
    </div>
  );
};
