import React from "react";
import "../header/heading.css";
import { useState } from "react";
import { About } from "../about/About";

export const Heading = () => {
  const [open, setOpen] = useState(false);

  const openAbout = () => {
    setOpen(!open);
  };

  return (
    <div className="header-container">
      <header>
        <div className="header-title">
          <h1>Is it too hot for pants?</h1>
        </div>
        <div>
          <button onClick={openAbout} className="about-button">
            <h1>About</h1>
          </button>
          {open ? <About setOpen={setOpen} /> : null}
        </div>
      </header>
    </div>
  );
};
