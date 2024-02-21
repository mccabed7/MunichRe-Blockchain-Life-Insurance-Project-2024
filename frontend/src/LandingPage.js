import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import computer from "./img/computer.png";
import moonIcon from "./img/moon.png";
import sunIcon from "./img/sun.png";
import shape from "./img/shape.png";

function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const toggle_btn = document.querySelector(".toggle-btn");
    const big_wrapper = document.querySelector(".big-wrapper");

    function toggleAnimation() {
      setDarkMode(!darkMode);
    }

    toggle_btn.addEventListener("click", toggleAnimation);

    return () => toggle_btn.removeEventListener("click", toggleAnimation);
  }, [darkMode]);

  return (
  <div className='home'>
    <div className={`big-wrapper ${darkMode ? 'dark' : 'light'}`}>
      <img src="./img/shape.png" alt="" className="shape" />
      <img src="./img/shape.png" alt="" className="shape2" />

      <header>
        <div className="container">
          <div className="logo">
            <h1>SmartAssurance</h1>
          </div>

          <div className="links">
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><Link to="/registration"><a href="#" className="btn">Register</a></Link></li>
            </ul>
          </div>
        </div>
      </header>

      <div className="showcase-area">
        <div className="container">
          <div className="left">
            <div className="big-title">
              <h1>Empowering Your Future with Smart Contracts in Life Insurance</h1>
            </div>
            <p className="text">
              Welcome to a smarter, faster, and more accessible era of life insurance solutions.
            </p>
            <div className="cta">
              <a href="#" className="btn">Get A Quote</a>
            </div>
          </div>

          <div className="right">
            <img src={computer} alt="Computer" className="computer" />
          </div>
          
          <div className="shape">
            <img src={shape} alt="shape" className="shape"/>
          </div>
          <div className="shape2">
            <img src={shape} alt="shape" className="shape2"/>
          </div>
        </div>
      </div>
      
      <div className="bottom-area">
        <div className="container">
          <button className="toggle-btn">
            <img src={darkMode ? sunIcon : moonIcon} alt={darkMode ? "Sun Icon" : "Moon Icon"} />
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default LandingPage;

