import "./Navbar.css";
import { GiHospitalCross } from "react-icons/gi";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    
        return (
            <nav>
                <div className="nav-center">
                    <div className="nav-header">
                        <GiHospitalCross className="icon" />
                        <h1 className="hospital-name">St. Anthony's Hospital</h1>
                        <Link to="/search"><button className="search-btn">Search Patient</button></Link>
                    </div>
                </div>
            </nav>
        );
    }

export default Navbar;