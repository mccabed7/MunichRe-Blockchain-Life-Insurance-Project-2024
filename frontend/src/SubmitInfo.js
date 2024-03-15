//import ReactDOM from "react-dom/client";
import "./SubmitInfo.css";
import React, { useState } from "react";

function SubmitInfo() {
  const [inputs, setInputs] = useState({});

  const [values, setValues] = useState({
    addressline1: "",
    addressline2: "",
    city: "",
    county: "",
    country: "",
    eircode: "",
    height: "",
    weight: "",
    smoker: ""
});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  }

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
}

  return (
    <form-container class="submitInfo">
    <form onSubmit={handleSubmit} class="submitInfo">
        <column class="submitInfo">
        <h1 class="submitInfo">About You</h1>
      <label class="submitInfo">Enter your address:
      <input
        class= "submitInfo"
        type="text" 
        name="addressline1"
        placeholder="Address line 1"
        value={inputs.addressline1 || ""} 
        onChange={handleChange}
      />
      <input 
        class= "submitInfo"
        type="text" 
        name="addressline2"
        placeholder="Address line 2"
        value={inputs.addressline2 || ""} 
        onChange={handleChange}
      />
      <input 
        class= "submitInfo"
        type="text" 
        name="city"
        placeholder="City"
        value={inputs.city|| ""} 
        onChange={handleChange}
      />
      <input 
        class= "submitInfo"
        type="text" 
        name="county"
        placeholder="County"
        value={inputs.county || ""} 
        onChange={handleChange}
      />
      <input 
        class= "submitInfo"
        type="text" 
        name="country"
        placeholder="Country"
        value={inputs.country || ""} 
        onChange={handleChange}
      />
      <input 
        class= "submitInfo"
        type="text" 
        name="eircode"
        placeholder="Eircode"
        value={inputs.eircode|| ""} 
        onChange={handleChange}
      />
      </label>
      <label class="submitInfo">Enter your height in cm:
        <input 
          class= "submitInfo"
          type="number" 
          name="height" 
          placeholder= "Height (in cm)"
          value={inputs.height || ""} 
          onChange={handleChange}
        />
        </label>
      <label class="submitInfo">Enter your weight in kg:
        <input 
          class= "submitInfo"
          type="number" 
          name="weight" 
          placeholder="Weight (in kg)"
          value={inputs.weight || ""} 
          onChange={handleChange}
        />
        </label>
        <label class="submitInfo">Are you a smoker?
        <select 
          value={inputs.smoker} 
          onChange={handleChange}
          class="submitInfo"
          >
        <option value="">Select option</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      </label>
      </column>
    </form>
    </form-container>
  )
}

//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<SubmitInfo />);


export default SubmitInfo;