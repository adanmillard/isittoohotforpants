import React from "react";
import "../footer/footer.css";

export const Footer = () => {
  return (
    <footer className="footer-main-container">
      <div className="footer-container">
        <p>
          Is it too hot for pants is created by{" "}
          <a
            href="https://github.com/adanmillard"
            target="_blank"
            rel="noreferrer"
          >
            Adan Millard
          </a>{" "}
          2023.
        </p>
      </div>
    </footer>
  );
};
