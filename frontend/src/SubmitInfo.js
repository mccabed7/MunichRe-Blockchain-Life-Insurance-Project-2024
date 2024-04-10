//import ReactDOM from "react-dom/client";
import "./SubmitInfo.css";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Switch } from "react-router-dom";
import { getSessionID, getEmail } from './sessionModule.jsx';
let emailAddress = null;
let sid = null;

function SubmitInfo() {
  const [inputs, setInputs] = useState({});

  const [values, setValues] = useState({
    addressline1: "",
    addressline2: "",
    city: "",
    county: "",
    country: "",
    eircode: "",
    height: 0,
    weight: 0,
    smoker: 0,
    updateType: "",
    drinksPerWeek: 0,
    highRiskHours: 0,
    numberOfMedications: 0,
    hoursOfSleep: 0,
    cholesterol: 0,
    exercisePerWeek: 0,
    stepsPerDay: 0,
    waistCircumference: 0
});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  //const navigate = useNavigate();

  /*const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  }*/


  const handleSubmit = async (e) => {
    e.preventDefault();
    //if (isFormValid()) {
        // Method which submits to API and checks if valid
        console.log("This is smoker:" + inputs.smoker + "end")
        const dataForBackend = {
            'height': inputs.height,
            'weight': inputs.weight,
            'smoker': (inputs.smoker == "True") ? 1 : 0,
            'drinksPerWeek': inputs.drinksPerWeek,
            'highRiskHours': inputs.highRiskHours,
            'numberOfMedications': inputs.numberOfMedications,
            'hoursOfSleep': inputs.hoursOfSleep,
            'cholesterol': inputs.cholesterol,
            'exercisePerWeek': inputs.exercisePerWeek,
            'stepsPerDay': inputs.stepsPerDay,
            'waistCircumference': inputs.waistCircumference
        }

        

        emailAddress = getEmail();
        sid = getSessionID();
        try {
            const response = await fetch('/api/customers?emailAddress=' + emailAddress + '&sid=' + sid,{
                method: 'POST',
                mode: 'cors', 
                headers: {
                    'Content-Type': 'application/json'
                    
                },
                body: JSON.stringify(dataForBackend)
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);	
                }
                return response.json();});
            
        } catch (error) {
            console.error('Error:', error);
        }


    /*} else {
        
        alert('Invalid form data. Please check your inputs.');
    }*/
  };

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
}

  const renderDifferentForms = () => {
    switch(inputs.updateType) {
      case 'Lifestyle' :
        return <LifestyleForm />
      case 'Health' :
        return <HealthForm />
      case 'Fitness' :
        return <FitnessForm />
      default:
        return null
    }
  }

  const LifestyleForm = () => 
  <><label class="extraInfo"> Have you quit smoking? (If you previously smoked)
    <select
              value={inputs.smoker}
              onChange={handleChange}
              class="extraInfo"
            >
              <option value="">Select option</option>
              <option value="False">True</option>
              <option value="True">False</option>
    </select>
    </label>
    <label class="extraInfo"> Average units of alcohol per week
      <input
        class="extraInfo"
        type="number"
        name="drinksPerWeek"
        placeholder="Steps per day"
        value={inputs.drinksPerWeek || ""}
        onChange={handleChange} />
    </label>
    <label class="extraInfo"> Hours spent on high risk activites          
    <input
      class="extraInfo"
      type="number"
      name="highRiskHours"
      placeholder="Size (in cm)"
      value={inputs.highRiskHours|| ""}
      onChange={handleChange} />
      </label></>

const HealthForm = () => 
  <><label class="extraInfo"> Number of medications you take daily
    <input
      class="extraInfo"
      type="number"
      name="numberOfMedications"
      placeholder="Medications"
      value={inputs.numberOfMedications || ""}
      onChange={handleChange} />
    </label>
    <label class="extraInfo"> Average hours of sleep per night
      <input
        class="extraInfo"
        type="number"
        name="hoursOfSleep"
        placeholder="Hours of sleep"
        value={inputs.hoursOfSleep || ""}
        onChange={handleChange} />
    </label>
    <label class="extraInfo"> What is your cholesterol level?         
    <input
      class="extraInfo"
      type="number"
      name="cholesterol"
      placeholder="Cholesterol (mmol/L)"
      value={inputs.cholesterol || ""}
      onChange={handleChange} />
      </label></>

const FitnessForm = () => 
  <><label class="extraInfo"> How many days per week do you exercise?
    <input
      class="extraInfo"
      type="number"
      name="exercisePerWeek"
      placeholder="Days on average"
      value={inputs.exercisePerWeek || ""}
      onChange={handleChange} />
    </label>
    <label class="extraInfo"> How many steps per day do you walk on average?
      <input
        class="extraInfo"
        type="number"
        name="stepsPerDay"
        placeholder="Steps per day"
        value={inputs.stepsPerDay || ""}
        onChange={handleChange} />
    </label>
    <label class="extraInfo"> What is your waist circumference?           
    <input
      class="extraInfo"
      type="number"
      name="waistCircumference"
      placeholder="Size (in cm)"
      value={inputs.waistCircumference || ""}
      onChange={handleChange} />
      </label></>


  return (
    <><form-container class="submitInfo">
      <form onSubmit={handleSubmit} class="submitInfo">
        <column class="submitInfo">
          <h1 class="submitInfo">About You</h1>
          <label class="submitInfo">Enter your address:
            <input
              class="submitInfo"
              type="text"
              name="addressline1"
              placeholder="Address line 1"
              value={inputs.addressline1 || ""}
              onChange={handleChange} />
            <input
              class="submitInfo"
              type="text"
              name="addressline2"
              placeholder="Address line 2"
              value={inputs.addressline2 || ""}
              onChange={handleChange} />
            <input
              class="submitInfo"
              type="text"
              name="city"
              placeholder="City"
              value={inputs.city || ""}
              onChange={handleChange} />
            <input
              class="submitInfo"
              type="text"
              name="county"
              placeholder="County"
              value={inputs.county || ""}
              onChange={handleChange} />
            <input
              class="submitInfo"
              type="text"
              name="country"
              placeholder="Country"
              value={inputs.country || ""}
              onChange={handleChange} />
            <input
              class="submitInfo"
              type="text"
              name="eircode"
              placeholder="Eircode"
              value={inputs.eircode || ""}
              onChange={handleChange} />
          </label>
          <label class="submitInfo">Enter your height in cm:
            <input
              class="submitInfo"
              type="number"
              name="height"
              placeholder="Height (in cm)"
              value={inputs.height || ""}
              onChange={handleChange} />
          </label>
          <label class="submitInfo">Enter your weight in kg:
            <input
              class="submitInfo"
              type="number"
              name="weight"
              placeholder="Weight (in kg)"
              value={inputs.weight || ""}
              onChange={handleChange} />
          </label>
          <label class="submitInfo">Are you a smoker?
            <select
              value={inputs.smoker}
              onChange={handleChange}
              class="submitInfo"
            >
              <option value="">Select option</option>
              <option value="True">True</option>
              <option value="False">False</option>
            </select>
          </label>
          <button class="submitInfo"> Submit </button>
        </column>

      </form>
    </form-container><form-container class="extraInfo">
        <form onSubmit={handleSubmit} class="extraInfo">
          <column class="extraInfo">
            <h1 class="extraInfo">Submit an update</h1>
            <label class="extraInfo"> What type of update would you like to submit?
              <select
                value={inputs.updateType}
                onChange={handleChange}
                name= "updateType"
                class="extraInfo"
                //placeholder="Select option"
                placeholder={<div className="select-placeholder-text">Select category</div>}
              >
                <option value="">Select option</option>
                <option value="Health">Health update</option>
                <option value="Fitness">Fitness update</option>
                <option value="Lifestyle">Lifestyle update</option>
              </select>
            </label>
            {renderDifferentForms()}
            <button class="extraInfo"> Submit update </button>
          </column>
        </form>
      </form-container></>
  )
}

export default SubmitInfo;