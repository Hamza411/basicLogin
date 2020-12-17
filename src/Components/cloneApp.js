import React, { useState } from 'react';
import './App.css';

function App() {

    const [values, setValues] = useState({
        userName: "",
        email: "",
        password: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);


    // const handleChange = (event) => {
    //   setValues(event.target.value)
    // }

    const handleUserName = (event) => {
        setValues({ ...values, userName: event.target.value })
    }

    const handleEmail = (event) => {
        setValues({ ...values, email: event.target.value })
    }

    const handlePassword = (event) => {
        setValues({ ...values, password: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (values.firstName && values.lastName && values.email) {
            setValid(true)
        }
        setSubmitted(true);

        console.log(values)
    }

    return (
        <div className="form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h1>Login Form</h1>
                {submitted && valid ? <div className="success-message">Successfully Logged In !</div> : null}

                <label htmlFor="userName">UserName</label>
                <input
                    id="userName"
                    className="form-field"
                    type="text"
                    placeholder="User Name"
                    name="userName"
                    value={values.userName}
                    onChange={handleUserName}
                />
                {submitted && !values.userName ? <span>UserName is Required !</span> : null}

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    className="form-field"
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleEmail}
                />
                {submitted && !values.email ? <span>Email is Required !</span> : null}

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    className="form-field"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handlePassword}
                />
                {submitted && !values.password ? <span>Password is Required !</span> : null}


                <button className="form-field" type="submit">
                    Login
        </button>
            </form>
        </div>
    );
}

export default App;
