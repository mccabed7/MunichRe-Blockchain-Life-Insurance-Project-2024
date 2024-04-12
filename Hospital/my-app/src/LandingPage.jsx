import "./LandingPage.css";
import React, { useState } from "react";

function LandingPage() {
    return (
        <div className="landing-page">
            <div className="column">
                <h2 className="msg">Welcome to St. Anthony's Hospital!</h2>
                <p className="slogan">Where modern care, <br />meets medical excellence.</p>
            </div>
            <img className="hospital" src="https://images.pexels.com/photos/18301680/pexels-photo-18301680/free-photo-of-victorian-heart-hospital-modern-facade-in-black-and-white.jpeg" alt="hospital" />
        </div>
    );
}

export default LandingPage;