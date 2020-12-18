import React, { useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

const Header = (props) => {

    const [user, setUser] = useState("")
    const [isLoggedOut, setLoggedOut] = useState(false)


    useEffect(() => {
        setUser(localStorage.getItem('token'))
    })

    const onLogout = () => {
        confirmAlert({
            title: 'Logout ?',
            message: 'Are you sure to Logout.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => yes()
                },
                {
                    label: 'No',
                    onClick: () => no()
                }
            ]
        });
    }
    const yes = () => {
        if (isLoggedOut) {

            localStorage.clear();
            setLoggedOut(false)
            window.location.reload()
        }
    }

    const no = () => {
        return
    }



    const Navigation = () => {
        if (user) {
            return (
                <div className="topnav">
                    <div className="topnav-left">
                        <b><i>Welcome {localStorage.getItem("email")}</i></b>
                    </div>
                    <div className="topnav-right">
                        <button type="button" className="btn btn-success" onClick={() => {
                            onLogout();
                            // setUser("")
                            setLoggedOut(true)
                        }}>Logout</button>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="topnav">
                    <a href="/formik">Login</a>
                    <a href="/registration">Signup</a>
                </div>
            );
        }
    }

    // console.log("headere called", user)
    return (
        <div >

            <Navigation />
        </div>
    );
};
export default Header;