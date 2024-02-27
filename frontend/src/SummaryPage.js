// SummaryPage.js

import React from 'react';
import './SummaryPage.css';

const SummaryPage = () => {
  // Hardcoded user information, premium, and risk assessment
  const userInfo = {
    name: "John Doe",
    address: "123 Main St, Anytown, USA",
    dob: "01/01/1980"
  };
  const premium = "€200/month";
  const riskAssessment = "135";

  return (
    <div className="summary-container">
      <div className="personal-info">
        <h2>Personal Information</h2>
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Address:</strong> {userInfo.address}</p>
        <p><strong>Date of Birth:</strong> {userInfo.dob}</p>
      </div>
      <div className="premium-box">
        <h2>Premium</h2>
        <p>{premium}</p>
      </div>
      <div className="risk-assessment-box">
        <h2>Risk Assessment</h2>
        <p>{riskAssessment}</p>
      </div>
    </div>
  );
}

export default SummaryPage;

