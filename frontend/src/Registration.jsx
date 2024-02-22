import "./Registration.css";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import RegistrationInput from "./RegistrationInput";
import { useNavigate } from 'react-router-dom';


const Registration = () => {

    const [isSignUp, setIsSignUp] = useState(true);

    const handleToggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    
    return (
        <>
            <div className="overlay">
                <h1 className="welcome-text">
                    {isSignUp ? "Join us today!" : "Welcome!"}
                </h1>
                <p className="intro1">
                    {isSignUp ? "Create an account to begin your journey with us." : "Log in to your account to view your dashboard."}
                </p>
                <button className="ghost" onClick={handleToggleForm}>
                    {isSignUp ? "Log in" : "Create Account"}
                </button>
            </div>
            <div className="app">
                {isSignUp ? <RegisterForm /> : <LoginForm />}
            </div>
        </>
    );
};

const RegisterForm = () => {

    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        dateOfBirth: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

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

    return (
        <div className="register-form">
            <form onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                {inputs.map(input => (
                    <RegistrationInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                ))}
                <Link to="/dashboard"><button>Register</button></Link>
            </form>
        </div>
    );
};

const LoginForm = () => {

    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        dateOfBirth: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

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
            //pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
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

    const navigate = useNavigate();

    const isFormValid = () => {
        const hasPassword = (values.password != null);
        const hasEmail = (values.email != null);
        return hasPassword && hasEmail;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            //WE ARE GONNA HAVE A METHOD IN HERE FOR SUBMITTING TO API AND CHECKING IF VALID!!!
            navigate('/dashboard');
        } else {
            
            alert('Invalid form data. Please check your inputs.');
        }
    };

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    return (
        <div className="login-form">
            <form className="login" onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            {inputs.filter(input => input.name === "email" || input.name === "password").map(input => (
                <RegistrationInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                />
            ))}
            <button>Sign In</button>
            </form>
        </div>
    );
};

export default Registration;