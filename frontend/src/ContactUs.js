import React, { useState, useEffect } from 'react';

function ContactUs() {
    return (
        <div>
            <div
                style={{
                    minHeight: "400px",
                    color: "white",
                    fontSize: "20px",
                    marginLeft: "10px",
                    textShadow: "10px 10px 10px rgba(72, 72, 72, 0.6)"
                }}>
                <h1>Contact Us</h1>
                <h2>Munich RE.</h2>
                <h3>Phone:	016359104</h3>
                <h3>Email:	mclinton@munichre.com</h3>
                <br />
                <h2>Trinity.</h2>
                <h3>Phone:	018964500</h3>
                <h3>Email:	academic.registry@tcd.ie</h3>
            </div>
        </div>
    );
}

export default ContactUs