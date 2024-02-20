import "./Login.css";
import React, { useState } from "react";
import RegistrationInput from "./RegistrationInput";

const Login = () => {
    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        dateOfBirth: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showLogin, setShowLogin] = useState(false);

    const inputs = [
        {
            id: 1,
            name: "firstname",
            type: "text",
            placeholder: "First Name",
            label: "First Name",
            required: true
        },
        {
            id: 2,
            name: "lastname",
            type: "text",
            placeholder: "Last Name",
            label: "Last Name",
            required: true
        },
        {
            id: 3,
            name: "dateOfBirth",
            type: "date",
            placeholder: "Date of Birth",
            label: "Date of Birth",
            required: true
        },
        {
            id: 4,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "Invalid email address",
            label: "Email",
            required: true
        },
        {
            id: 5,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage: "Password must be at least 8 characters, and contain at least one uppercase letter and one special character",
            label: "Password",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true
        },
        {
            id: 6,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            errorMessage: "Passwords do not match",
            label: "Confirm Password",
            pattern: values.password,
            required: true
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    console.log(values);
    return (
        <div className="app">
            <div className={`form-container ${showLogin ? "slide-left" : "slide-right"}`}>
                <form onSubmit={handleSubmit}>
                    <h1>{showLogin ? "Login" : "Create Account"}</h1>
                    {inputs.map(input => (
                        <RegistrationInput
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={onChange}
                        />
                    ))}
                    <button>{showLogin ? "Login" : "Register"}</button>
                </form>
            </div>
            <div className="toggle-container">
                <button onClick={() => setShowLogin(!showLogin)}>
                    {showLogin ? "Create Account" : "Login"}
                </button>
            </div>
        </div>
    );
}

export default Login;