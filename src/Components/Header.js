import React, { useEffect, useState } from "react";
const Header = (props) => {

    const [user, setUser] = useState("")
    const [isLoggedOut, setLoggedOut] = useState(false)


    useEffect(() => {
        setUser(localStorage.getItem('token'))
    })


    if (isLoggedOut) {
        setLoggedOut(false)
        window.location.reload()
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
                            localStorage.clear();
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