import "./SubmitData.css";
import React, { useState } from "react";

import { getSessionID, getEmail, getCustomerEmail  } from './sessionModule';
let sessionID = null;
let email = null;
let customerEmail = null;

function SubmitData({email}) {

    const [values, setValues] = useState({
        illnessType: "",
        illnessMortalityRate: "",
        healthScore: "",
        currentWeight: "",
        alcoholConsumption: "",
    });

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataForBackend = {
            ...values,
            email // Assuming you have the email address of the patient
        };

        // Perform POST request to backend endpoint
        sessionID = getSessionID();
        email = getEmail();
        customerEmail = getCustomerEmail();
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/customers?emailAddress=${(email)}&sid=${(sessionID)}&customer=${(customerEmail)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataForBackend)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Handle response data
            const result = await response.json();
            console.log('Data submitted successfully:', result);

        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div className="submit-data">
            <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label>Type of Illness</label>
                        <input type="text" name="illnessType" value={values.illnessType} onChange={onChange} />
                    </div>
                    <div class="form-group">
                    <label>Illness Mortality Rate (%)</label>
                    <select 
                        name="illnessMortalityRate" 
                        value={values.illnessMortalityRate} 
                        onChange={onChange}
                    >
                        <option value="">Select...</option>
                        <option value="0">0</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="healthScore">Health Score: {values.healthScore}</label>
                    <input 
                        type="range" 
                        id="healthScore"
                        name="healthScore" 
                        min="1" 
                        max="10" 
                        value={values.healthScore} 
                        onChange={onChange} 
                    />
                </div>
                <div class="form-group">
                    <label>Current Weight (kg)</label>
                    <input type="number" name="currentWeight" value={values.currentWeight} onChange={onChange} />
                </div>
                <div class="form-group">
                    <label>Alcohol Consumption (ml/per week)</label>
                    <input type="number" name="alcoholConsumption" value={values.alcoholConsumption} onChange={onChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );

}

export default SubmitData;