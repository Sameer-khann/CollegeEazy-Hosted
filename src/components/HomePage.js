import React from 'react'
import { Link } from "react-router-dom";
import LandingPage from './LandingPage'
import Navbar from './Navbar'
import photo from '../img/bookspng (2).png'
import noteI from '../img/notebookicon (2).png'
import cele from '../img/cele (2).png'
import cart from '../img/cart (2).png'
import notes from '../img/notepadpng (1).png'
import book from '../img/bookspng (4).png'
import clock from '../img/timerpng (2).png'


export default function HomePage() {






  


  return (
    <>
      <div className="body">
          <Navbar />
        <div className='homepage'>
          <div className="homediv">
            <div className="headingHome" >
              WELCOME TO <p>&#123;College Eazy&#125;</p>
              <h6>Welcome folks to our student hub!! Find free notes, track your attendance, and discover a marketplace to buy or sell items within your college community. Join us today and simplify your college journey!!</h6>
            </div>
            <div className="buttHome">
            <Link to="/notes" style={{ textDecoration: "none", }}>
              <button className='btn btn-primary homebutton' id='homebutton'>Browsers Notes</button>
              </Link>
            </div>
          </div>
          <div className="imggHome" >
            <img src={photo} style={{ width: "100%", height: "500px" }} alt="" />
          </div>
        </div>

        <div className="imgCard">
          <div className="line"></div>
          <div className="boxPack">
          <Link to="/notes" style={{ textDecoration: "none", }}>
            <div className="box">
              <div className="circule1">
                <img src={noteI} alt="" />
              </div>
             
              <div className='textCard'>
                <h3>READ</h3>
                <h4>NOTES</h4>
              </div>
              
            </div>
            </Link>

            <Link to="/AttendancePage" style={{ textDecoration: "none", }}>
            <div className="box">
              <div className="circule2">
                <img src={cele} alt="" />
              </div>
              <div className='textCard'>
                <h3>TRACK</h3>
                <h4>ATTENDANCE</h4>
              </div>
            </div>
            </Link>

            <Link to="/Shop" style={{ textDecoration: "none", }}>
            <div className="box">
              <div className="circule3">
                <img src={cart} alt="" />
              </div>
              <div className='textCard'>
                <h3>VISIT</h3>
                <h4>STORE</h4>
              </div>
            </div>
            </Link>

          </div>

          <div className="homecardText">
            <div className="headButton">
              <div className="h">
                <p>CURATED NOTES FOR ENGINEERING STUDENTS</p>
              </div>
              <div className="buttHo">
              <Link to="/notes" style={{ textDecoration: "none", }}>
                <button className='btn btn-primary ' >All Categories</button>
                </Link>
              </div>
            </div>
            <div className="bigText">
              <h1>NOTE</h1>
              <p>Welcome to our notes section, where your academic journey becomes easier. You can access a treasure trove of free notes tailored to your college courses. Our platform offers study materials for various branches and semesters, all at your fingertips. Whether you're in pursuit of in-depth subject knowledge or a quick revision guide, our comprehensive resources are designed to elevate your learning experience.</p>
            </div>
          </div>


        </div>

        <div className="WhyWEBetter">
          <div className="why">
            <h1>Why us?</h1>
            <p> We curate notes from diverse sources, saving your time in searching. Concentrate on acing exams with comprehensive, high-quality materials, all conveniently in one place.</p>
          </div>
          <div className="phot">
            <img src={notes} alt="" />
            <h1>Best Notes</h1>
          </div>
          <div className="phot">
            <img src={clock} alt="" />
            <h1>Latest Notes</h1>
          </div>
          <div className="phot">
            <img src={book} alt="" />
            <h1>All Subject</h1>
          </div>
        </div>


        <LandingPage />
      </div>
    </>
  )
}
