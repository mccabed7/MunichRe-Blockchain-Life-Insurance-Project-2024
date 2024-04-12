import "./SearchBar.css";
import React, { useState } from "react";
import SubmitData from './SubmitData'; // Assuming you have this component

import { getSessionID, getEmail, setCustomerEmail } from './sessionModule';
let sessionID = null;
let hospitalEmail = null;
let customerEmail = null;


function SearchBar() {
    const [email, setEmail] = useState('');
    const [showSubmitForm, setShowSubmitForm] = useState(false);
    const [userExists, setUserExists] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevents default form submission behaviour
        if (!email) {
            setError('Please enter a valid email address');
            return;
        }

        //setUserExists(true);
        sessionID = getSessionID();
        hospitalEmail = getEmail();
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/customers?emailAddress=${(hospitalEmail)}&sid=${(sessionID)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setUserExists(true);
            const data = await response.json();
            
            // Check if user data was found
            if (data) {
                setUserExists(true);
            } else {
                setError("No patient found with that email address.")
                setUserExists(false);
            }
            setCustomerEmail(email);
        } catch (error) {
            setError("Failed to retrieve patient data.");
            console.error('Error fetching patient data:', error);
            setUserExists(false);
        }
    };

    return (
        <div className="search-container"> {/* Use a container to wrap the search bar and the submit form */}
            <div className="search-bar">
                <form className="search-form" onSubmit={handleSearch}>
                    <label className="search-label">Search for a patient</label>
                    <input 
                        className="search-input"
                        type="email" 
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className="search">Search</button>
                </form>
            </div>
            {error && <div>{error}</div>} {/* Display error message if there is an error */}
            {userExists && <SubmitData />} {/* Pass the email to the SubmitData component */}
        </div>
    );
}

export default SearchBar;