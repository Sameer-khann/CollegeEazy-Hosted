import React from 'react'
import { useState } from 'react'
import LoginPage from './LoginPage';
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from 'formik';
import signImg from "../img/signUp1.png"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function SignUp() {

    const [SignUp, setSignUp] = useState(true);
    const navigate = useNavigate()

    const handleClick = () => {
        setSignUp(!SignUp);
    }




    const formik = useFormik({
        initialValues: {
            name: '',
            enrollment: '',
            branch: '',
            semester: '',
            password: '',
        },




        validationSchema: Yup.object({
            name: Yup.string().required("Please enter the name"),
            enrollment: Yup.string().min(6, 'Enrollment must be at least 6').required("Please enter the enrollment"),
            branch: Yup.string().min(1).required("Please select the branch"),
            semester: Yup.number().min(1).required("Please select the semester"),
            password: Yup.string().min(6).required("Please enter the password"),
        }),



        onSubmit: async (values) => {
            try {
                // Call server API to send the data
                console.log(values.name, values.enrollment, values.branch, values.semester, values.password);


                await axios.post('https://collegeeazy-9mwu.onrender.com/collegeazy/users/public/register', {
                    name: values.name,
                    enrollment: values.enrollment,
                    branch: values.branch,
                    semester: values.semester,
                    password: values.password,
                })

                toast.success("Registered successfully!", {
                    position: "top-center",
                });

                setSignUp(!SignUp);
                
                formik.resetForm();
            } catch (error) {
                toast.error(error);
            }
        },
    });



    return (
        <>

            <div>

                {" "} {SignUp ? (

                    <div className="cardsignup">
                        <div className="column">
                            <form action="" onSubmit={formik.handleSubmit}>

                                <div className="containerS">
                                    <div className="imgg">
                                        <img src={signImg} alt="" style={{ width: "95%" }} />
                                    </div>
                                    <div className="signn">                                    <div className="headingS">
                                        <h1>Sign Up </h1>
                                    </div>
                                        <div className="nameeed">
                                            <input type="text" className="form-control nameee"
                                                onChange={formik.handleChange}
                                                value={formik.values.name}
                                                id="name" autoComplete="off" name='name' title="Please enter only alphabate" placeholder="Name" />
                                            {formik.touched.name && formik.errors.name ? (
                                                <div className='errorSign'>{formik.errors.name}</div>
                                            ) : null}
                                        </div>

                                        <div className="enrollmeD">
                                            <input type="text" className="form-control enrollme"
                                                onChange={formik.handleChange}
                                                value={formik.values.enrollment}
                                                id="floatingInput1" autoComplete="off" name='enrollment' pattern="[0-9]+" title="Please enter only Number" placeholder="Enrollment No." />
                                            {formik.touched.enrollment && formik.errors.enrollment ? (
                                                <div className='errorSign'>{formik.errors.enrollment}</div>
                                            ) : null}

                                        </div>
                                        <div className="branchhD">
                                            <div className="row  " style={{ margin: "0px" }}>
                                                <div className="SignUplabel branchhh" style={{ width: "50%" }}>
                                                    <label placeholder='BRANCH'>
                                                        <select id='branch' name='branch' onChange={formik.handleChange} value={formik.values.branch}>
                                                            <option style={{ color: "blue" }}>BRANCH</option>
                                                            <option value="CSE">CSE</option>
                                                            <option value="IT">IT</option>
                                                            <option value="AIDS">AIDS</option>
                                                            <option value="AIML">AIML</option>
                                                            <option value="ECE">ECE</option>
                                                            <option value="ME">ME</option>
                                                            <option value="EE">EE</option>
                                                        </select>
                                                    </label>
                                                    {formik.touched.branch && formik.errors.branch ? (
                                                        <div className='errorSign' >{formik.errors.branch}</div>
                                                    ) : null}
                                                </div>

                                                <div className="SignUplabel semmm" style={{ width: "50%" }}>
                                                    <label placeholder='Semester'>
                                                        <select id='semester' name='semester' onChange={formik.handleChange} value={formik.values.semester}  >
                                                            <option style={{ color: "blue" }}>SEMESTER</option>
                                                            <option value="1">1st</option>
                                                            <option value="2">2nd</option>
                                                            <option value="3">3rd</option>
                                                            <option value="4">4th</option>
                                                            <option value="5">5th</option>
                                                            <option value="6">6th</option>
                                                            <option value="7">7th</option>
                                                            <option value="8">8th</option>
                                                        </select>
                                                    </label>
                                                    {formik.touched.semester && formik.errors.semester ? (
                                                        <div className='errorSign' >{formik.errors.semester}</div>
                                                    ) : null}
                                                </div>

                                            </div>
                                        </div>
                                        <div className="passD">
                                            <input type="password" className="form-control pasSing"
                                                onChange={formik.handleChange}
                                                value={formik.values.password}
                                                id="floatingInput" autoComplete="off" name='password' placeholder="Password" />
                                            {formik.touched.password && formik.errors.password ? (
                                                <div className='errorSign'>{formik.errors.password}</div>
                                            ) : null}
                                        </div>

                                        <div className="column">
                                            <div className="button">
                                                <button className="btn " type="submit">SignUp</button>
                                                <span style={{ cursor: "pointer", alignItem: "left", color: "blue", textDecoration: "underline", padding: "1rem" }} onClick={handleClick}>Already has Account</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </form>

                        </div>
                    </div>

                ) : (<LoginPage />)}

            </div>
        </>
    )
}
