import React from "react";
import "../about/about.css";

export const About = ({ setOpen }) => {
  return (
    <div className="about-container">
      <div className="about-content-style">
        <div className="about-content-header">
          <h1>About:</h1>
          <button className="close-button" onClick={() => setOpen(false)}>
            &times;
          </button>
        </div>
        <article>
          <p>
            The origin of this web/app came to me after searching trying to see
            if it was too hot to wear pants, after googling all that came back
            was buzzfeed articles, I just wanted to know if it was too hot /
            cold to wear pants!
          </p>
          <p>Thus, is it too hot for pants? was born.</p>
          <p>
            A fun app to decide <b>WEATHER</b> or not you should wear long
            pants.
          </p>
          <p>
            Hopefully this has solved your problem of trying to decided if you
            should wear pants or shorts, long dress or short skirt.
          </p>
          <p>
            Disclaimer: As a Kiwi I refer to pants as, long pants, trousers,
            jeans, etc..
          </p>
        </article>
      </div>
    </div>
  );
};
