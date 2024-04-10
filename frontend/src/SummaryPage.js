import React, { useState, useEffect } from 'react';
import './SummaryPage.css';

import { getSessionID, getEmail } from './sessionModule.jsx';
let sessionID = null;
let email = null;

const SummaryPage = () => {

  const [userInfo, setUserInfo] = useState([]);
  const [premium, setPremium] = useState([]);
  const [riskAssessment, setRiskAssessment] = useState([]);

  useEffect(() => {
    async function fetchData() {

      const sessionID = getSessionID();
      const email = getEmail();
      
      const params = new URLSearchParams({
        'sid': sessionID,
        'emailAddress': email
      });

      try {
        console.log("email at this page" + email);
        console.log(sessionID);

        const response = await fetch(`/api/customers?${params.toString()}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setUserInfo({
          email: getEmail(),
          weight: data.weight,
          age: data.age,
          steps: data.stepsPerDay,
          cholestrol: data.cholestrol,
          sleep: data.hoursOfSleep
        });
        setPremium(data.premium);

      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div data-testid="summary page main div" className="summary-container">
      <div className="personal-info">
        <h2>Personal Information</h2>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Weight:</strong> {userInfo.weight}</p>
        <p><strong>Age:</strong> {userInfo.age}</p>
      </div>
      <div className="premium-box">
        <h2>Premium</h2>
        <p>{premium}</p>
      </div>
      <div className="risk-assessment-box">
        <p><strong>Steps/Day:</strong> {userInfo.steps}</p>
        <p><strong>Cholestrol:</strong> {userInfo.cholestrol}</p>
        <p><strong>Sleep/Day:</strong> {userInfo.sleep}</p>
      </div>
    </div>
  );
}

export default SummaryPage;
