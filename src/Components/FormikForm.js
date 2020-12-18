import React, { useState } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { login } from '../public/endpoints';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookie from "js-cookie"
import jwt_decode from "jwt-decode";



const intialValues = { email: "hamzasaleam@gmail.com", password: "123456" };

const LoginSchema = Yup.object().shape({

    email: Yup.string().email().required("Email is required"),

    password: Yup.string()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars minimum"),
});


const FormikForm = (props) => {

    const [isLoggedIn, setLoggedIn] = useState(false)
    const [email, setEmail] = useState("")

    const submitForm = (values) => {
        console.log(values);
        setEmail(values.email)
        const data = {
            email: values.email,
            password: values.password
        }

        axios.post(login, data).then(data => {
            console.log(data)
            if (data.data.jwt) {
                var decoded = jwt_decode(data.data.jwt);
                Cookie.set("token", decoded);
                Cookie.set("email", values.email);

                localStorage.setItem("token", data.data.jwt);
                localStorage.setItem("email", values.email);
                setLoggedIn(true)
            }

        }).catch(err => {
            console.log("error is", err)
            toast.error("Email or Password is Invalid !");
        });
    }

    if (isLoggedIn)
        return <Redirect to={
            {
                pathname: "/welcome",
                state: {
                    from: props.location,
                    email: email
                }
            }
        } />


    return (
        <Formik
            initialValues={intialValues}
            validationSchema={LoginSchema}
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
                        {/* {Object.keys(formErrors).length === 0 && isSubmitting && (
                                <div className="success-message">Logged in successfully</div>
                            )} */}
                        <form className="register-form" onSubmit={handleSubmit} noValidate>
                            <h1>Login Form</h1>

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

                            <button className="form-field" type="submit" >
                                Login
                            </button>

                            {/* <a href="#" onClick={()=> props.history.push('/registration')}  className="new">Need Account? Click here to Register !</a> */}
                            <a href="/registration" className="new">Need Account? Click here to Register !</a>
                        </form>
                        <ToastContainer />
                    </div>
                );
            }}
        </Formik>
    );
};
export default FormikForm;