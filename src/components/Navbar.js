import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar() {


  const [navbar, setNavbar] = useState(false);

  const setBackground = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    }
    else {
      setNavbar(false);
    }
  }

  window.addEventListener('scroll', setBackground);

  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      setIsLoggedIn(true);
      // console.log("this is useeffect login ")
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  
  const handleLogin = () => {
    if (localStorage.getItem("Token")) {
      setIsLoggedIn(true);
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 5000,
      });
      navigate("/");
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("branch");
    localStorage.removeItem("Notes");
    localStorage.removeItem("pra");
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 5000,
    });
    setIsLoggedIn(false);
    navigate("/");
  };
  


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top "  >
      <nav className={navbar?"navbar active" : "navbar"}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">College Eazy</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ margin: "auto" }}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ margin: "auto" }}>
              <li className="nav-item">
                <Link className="nav-link active" to="/Notes"> Notes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/AttendancePage">Attendance</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Shop">Store</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Profile">Profile/Help</Link>
              </li> 
              <li className="nav-item">
                <Link className="nav-link active" to="/About">About</Link>
              </li>
            </ul>

            <div className='modalCard' >
              <Link to="/Logisign" style={{textDecoration:"none"}}>
                <button className="navLoginSIgnBut btn btn-primary " type="submit" onClick={isLoggedIn ? handleLogout : handleLogin}>
                  {isLoggedIn ? 'Logout' : 'Login'}
                </button>
              </Link>
            </div>
              <ToastContainer />

          </div>
        </div>
      </nav>
      </nav>
       

    </>
  )
}