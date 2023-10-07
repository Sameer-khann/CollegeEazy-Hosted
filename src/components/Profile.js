import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import profile from '../img/profileimg.png'
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import axios from 'axios';

export default function Profile() {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [userData, setUser] = useState('');




    const usertoken = JSON.parse(localStorage.getItem("Token"));


    const getUserDataApi = async () => {
        try {
            const resp = await axios.get('https://collegeeazy-9mwu.onrender.com/collegeazy/private/user', {
                headers: {
                    Authorization: `Bearer ${usertoken.jwt}`
                }
            });
            setUser(resp.data);
            // console.log(userData, "user data");

        } catch (error) {
            // console.error(error);
        }

    };

    useEffect(() => {
        getUserDataApi();
    }, []);




    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !message) {
            // Use toast.error to show an error message
            toast.error("Please fill in all the fields", { position: "top-center" });
            return;
        }

        // EmailJS parameters
        const templateParams = {
            from_name: name,
            email_id: email,
            message: message,
        };

        // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with your actual values
        const serviceID = 'service_2uzc75j';
        const templateID = 'template_4r24u3k';
        const userID = 'XjcSC4PzoNt-2Mpka';


        // Send the email
        emailjs.send(serviceID, templateID, templateParams, userID)
            .then((response) => {
                // console.log('Email sent successfully!', response);
                // Use toast to show a success message
                toast.success("Send Successfully!", { position: "top-center" });
            })
            .catch((error) => {
                // console.error('Error sending email:', error);
                // Use toast.error to show an error message
                toast.error("Error sending email", { position: "top-center" });
            });

        // Reset the form fields
        setName('');
        setEmail('');
        setMessage('');
    };



    return (
        <>
            <Navbar />
            <div className='profile'>
                <div className='profileCard'>
                    <div className="NameIMgSec">
                        <div className="imgsecPro">
                            <img src={profile} alt="" />
                        </div>
                        <div className="textSecPRo">
                            <h3>Name: <span>{userData.name}</span> </h3>
                            <hr />
                            <h3>Enrollment No: <span>{userData.enrollment}</span> </h3>
                            <hr />
                            {userData.contact ? (
                                <h3>Contact: {userData.contact}</h3>
                            ) : (
                                <h3>Contact: +91 XX XXX XX</h3>
                            )}
                            <hr />
                            <div className="brach">
                                <h3>Semester: <span>{userData.semester}th</span></h3>
                                <h3>Branch: <span>{userData.branch}</span> </h3>
                                <hr />
                            </div>
                        </div>


                    </div>
                    <div className="subjectSecPro">
                        <h3>Contact Us</h3>
                        <div className="SubName">
                            <form onSubmit={handleSubmit}>
                                <span>Enter your name:</span>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='Name'
                                />

                                <span>Enter your E-mail:</span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='E-mail'
                                />

                                <span>Write Your suggestion/query here:</span>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    cols="20" rows="4"
                                    placeholder='Description'
                                />

                                <button type="submit" className='contactbtn'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
