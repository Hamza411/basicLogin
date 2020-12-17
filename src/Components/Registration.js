import React, { useState } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from '../public/endpoints';
// import { Redirect } from 'react-router-dom';

const intialValues = { firstName: "Hamza", lastName: "Saleem", email: "", password: "123456", confirmPassword: "123456" };

const RegisterSchema = Yup.object().shape({

    firstName: Yup.string()
        .min(2, "Too Short!")
        .max(10, "Too Long!")
        .required("First Name is required"),

    lastName: Yup.string()
        .min(2, "Too Short!")
        .max(10, "Too Long!")
        .required("Last Name is required"),

    email: Yup.string().email().required("Email is required"),

    password: Yup.string()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars minimum"),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const Registration = (props) => {

    const [isLoggedIn, setLoggedIn] = useState(false)

    const submitForm = (values) => {
        console.log(values);
        const data = {
            email: values.email,
            password: values.password
        }

        axios.post(register, data).then(data => {
            console.log(data)
            if (data.data) {
                props.history.goBack()
            }

        }).catch(err => {
            console.log("error is", err)
            toast.error("User Not Registered !");
        });
    }


    return (
        <Formik
            initialValues={intialValues}
            validationSchema={RegisterSchema}
            onSubmit={submitForm}
        >
            {(formik) => {
                const {
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                    handleBlur,
                } = formik;

                return (
                    <div className="form-container">
                        <form className="register-form" onSubmit={handleSubmit} noValidate>
                            <h1>Register Form</h1>

                            <label htmlFor="firstName">FirstName</label>
                            <input
                                id="firstName"
                                className="form-field"
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.firstName && touched.firstName ? (
                                <span>{errors.firstName}</span>
                            ) : null}

                            <label htmlFor="lastName">LastName</label>
                            <input
                                id="lastName"
                                className="form-field"
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.lastName && touched.lastName ? (
                                <span>{errors.lastName}</span>
                            ) : null}

                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                className="form-field"
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email ? (
                                <span>{errors.email}</span>
                            ) : null}

                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                className="form-field"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password && touched.password ? (
                                <span>{errors.password}</span>
                            ) : null}

                            <label htmlFor="passowrd">Confirm Password</label>
                            <input
                                type="password"
                                className="form-field"
                                name="confirmPassword"
                                placeholder="Enter Password Again"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.confirmPassword}
                            />
                            {errors.confirmPassword && touched.confirmPassword ? (
                                <span>{errors.confirmPassword}</span>
                            ) : null}

                            <button className="form-field" type="submit"
                            >
                                Register
                            </button>
                            <a href="#" onClick={() => props.history.goBack()} className="new">Already Have An Account. Click Here!</a>
                        </form>
                        <ToastContainer />
                    </div>
                );
            }}
        </Formik>
    );
};
export default Registration;