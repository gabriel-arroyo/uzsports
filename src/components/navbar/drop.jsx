import React from "react";
import "./drop.css";

const Drop = () => {
  return (
    <header>
      <nav>
        <ul className="menu">
          <li>
            <a href="#">About</a>
            <ul className="submenu">
              <li>
                <a href="#">Frontend</a>
                <ul className="submenu2">
                  <li>
                    <a href="#">HTML</a>
                  </li>
                  <li>
                    <a href="#">CSS</a>
                  </li>
                  <li>
                    <a href="#">Javascript</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Backend</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Projects</a>
          </li>
          <li>
            <a href="#">Articles</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Drop;
