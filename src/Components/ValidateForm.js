import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { login } from '../public/endpoints';

function ValidateForm(props) {

    const intialValues = { userName: "", email: "", password: "" };

    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
    };

    const submitForm = () => {
        axios(login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            formValues
        })
            .then(formValues => {
                console.log(formValues)
            });
    }

    const validate = (values) => {
        let errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.userName) {
            errors.userName = "UserName Cannot be blank";
        } else if (values.userName.length < 4) {
            errors.userName = "UserName must be more than 4 characters";
        }
        if (!values.email) {
            errors.email = "Email Cannot be blank";
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid email format";
        }
        if (!values.password) {
            errors.password = "Password Cannot be blank";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        }
        return errors;
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submitForm();
        }
    }, [formErrors]);


    return (
        <div className="form-container">
            {Object.keys(formErrors).length === 0 && isSubmitting && (
                <div className="success-message">Logged in successfully</div>
            )}
            <form className="register-form" onSubmit={handleSubmit} noValidate>
                <h1>Login Form</h1>

                <label htmlFor="userName">UserName</label>
                <input
                    id="userName"
                    className="form-field"
                    type="text"
                    placeholder="User Name"
                    name="userName"
                    value={formValues.userName}
                    onChange={handleChange}
                />
                {formErrors.userName && (
                    <span>{formErrors.userName}</span>
                )}

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    className="form-field"
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                />
                {formErrors.email && (
                    <span>{formErrors.email}</span>
                )}
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    className="form-field"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                />
                {formErrors.password && (
                    <span>{formErrors.password}</span>
                )}


                <button className="form-field" type="submit">
                    Login
                 </button>
            </form>
        </div>
    );
}

export default ValidateForm;