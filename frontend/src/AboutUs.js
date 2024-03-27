import React from 'react';
import './AboutUs.css';
import nicoleta from "./img/member1.png";
import ellen from "./img/member2.png";
import ava from "./img/member3.png";
import seb from "./img/member4.png";
import declan from "./img/member5.png";
import michael from "./img/member6.png";
import liam from "./img/member7.png";
import joe from "./img/member8.png";
import roy from "./img/member9.png";
import sean from "./img/member10.png";
import taufiq from "./img/member11.png";

function AboutUs() {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>Munich Re Automation Solutions specializes in 
        providing automated underwriting solutions for the 
        life insurance industry.​

        Their products are aimed at streamlining the 
        underwriting process, enhancing efficiency, and 
        improving customer experiences in the insurance application 
        and management process.​</p>

      <p>The objective of our project is to remove the need for 
        underwriting in life insurance companies, provide policyholders 
        with a portable risk contract​ and allow for risk 
        assessment to be constantly re-evaluated based on life events. ​​</p>

      <div className="team-members">
        <div className="row">
          <div className="member">
            <img src={nicoleta} alt="Nicoleta" />
            <h2>Nicoleta</h2>
            <p>Team Lead</p>
          </div>
          <div className="member">
            <img src={ellen} alt="Ellen" />
            <h2>Ellen</h2>
            <p>3rd Year Frontend</p>
          </div>
          <div className="member">
            <img src={ava} alt="Ava" />
            <h2>Ava</h2>
            <p>2nd Year Frontend</p>
          </div>
        </div>

        <div className="row">
          <div className="member">
            <img src={seb} alt="Seb" />
            <h2>Seb</h2>
            <p>2nd Year Frontend</p>
          </div>
          <div className="member">
            <img src={declan} alt="Declan" />
            <h2>Declan</h2>
            <p>Technical Lead</p>
          </div>
          <div className="member">
            <img src={michael} alt="Michael" />
            <h2>Michael</h2>
            <p>2nd Year Testing</p>
          </div>
        </div>

        <div className="row">
          <div className="member">
            <img src={liam} alt="liam" />
            <h2>Liam</h2>
            <p>3rd Year Blockchain</p>
          </div>
          <div className="member">
            <img src={joe} alt="Joe" />
            <h2>Joe</h2>
            <p>2nd Year Backend</p>
          </div>
          <div className="member">
            <img src={roy} alt="Roy" />
            <h2>Roy</h2>
            <p>3rd Year Backend</p>
          </div>
        </div>

        <div className="row">
          <div className="member">
            <img src={sean} alt="Sean" />
            <h2>Sean</h2>
            <p>3rd Year Blockchain</p>
          </div>
          <div className="member">
            <img src={taufiq} alt="Taufiq" />
            <h2>Taufiq</h2>
            <p>2nd Year Blockchain</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;