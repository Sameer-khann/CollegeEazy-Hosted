import React from 'react'
import Navbar from './Navbar'
import about from '../img/aboutImg2.png'
import Footer from './Footer'

export default function About() {
  return (
    <>
      <Navbar/>
      <div className="AboutSec">
        <div className="aboutImg">
            <img src={about} alt="" />
            <h1>College Eazy</h1>
            <p>Empowering Students, Simplifying Success</p>
        </div>
        <div className="whyTextAbout">
            <h3>Yet Another Website: College Eazy, Why?</h3>
            <p>In the ever-evolving world of online educational resources, College Eazy shines for several compelling reasons:</p>
            <p><b>Quality Notes Curation:</b> We curate high-quality notes from various websites, offering a one-stop solution for your study material needs. No more hustling for notes across the internet. Everything you need is right here, saving you valuable time and effort.</p>
            <p><b>Streamlined Exam Preparation:</b> College Eazy understands the importance of focused exam preparation. With our platform, you can access comprehensive study materials and attendance tracker – all in one place. This streamlines your academic journey, allowing you to concentrate on what truly matters: acing your exams.</p>
            <p><b>Effortless Buy and Sell:</b> Say goodbye to unused items cluttering your space. College Eazy's integrated store feature enables you to effortlessly buy or sell items you no longer need within your college community. It's a hassle-free way to declutter while connecting with your peers.</p>
        </div>
        <div className="HowTextAbout">
            <h3>How?</h3>
            <p>At College Eazy, we're dedicated to delivering top-notch study materials. We collaborate with trusted contributors, while implementing robust security measures to protect your data and notes from tampering or unauthorized access. Rest assured, your academic materials are of the highest quality and integrity, ensuring a reliable and secure learning experience. Join us to simplify your college journey and access premium study resources.</p>
            <p>Our attendance tracker is fortified with JWT authentication to ensure only registered users with valid credentials can access it, safeguarding attendance data. Similarly, the Student Store prioritizes data security during buying and selling transactions, allowing you to shop and sell confidently within your college community. These features emphasize both accessibility and user data protection, enhancing your overall experience on College Eazy.</p>
        </div>
      </div>
      <Footer/>
    </>
  )
}
