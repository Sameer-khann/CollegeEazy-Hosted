import React, { useState, useEffect } from "react";
import { Circle } from "rc-progress";
import { useLocation } from "react-router-dom";
import attenImg from "../img/cal5.png";
import Navbar from "./Navbar";
import frontAtte from "../img/celNew.png";
import axios from "axios";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Footer from "./Footer";

const validationSchema = yup.object().shape({
  Subject1name: yup.string(),
  Subject2name: yup.string(),
  Subject3name: yup.string(),
  Subject4name: yup.string(),
  Subject5name: yup.string(),
  Subject6name: yup.string(),
});

const FormComponent = ({ subjects, userData, onSubmit }) => {

  const formik = useFormik({
    initialValues: {
      Subject1name: subjects[0].name,
      Subject2name: subjects[1].name,
      Subject3name: subjects[2].name,
      Subject4name: subjects[3].name,
      Subject5name: subjects[4].name,
      Subject6name: subjects[5].name,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <div className="formAddA">
      <p>Add Subjects name</p>
      <form onSubmit={formik.handleSubmit}>
        {subjects.map((subject, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Subject ${index + 1} Name`}
              name={`Subject${index + 1}name`}
              value={userData[`subject${index + 1}`]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={Boolean(subject.name)} // Disable if subject name is not empty
            />
            <div className="errorFormAdd">
              {formik.touched[`Subject${index + 1}name`] &&
                formik.errors[`Subject${index + 1}name`]}
            </div>
          </div>
        ))}
        <div className="ShopButton">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};




export default function AttendancePage() {

  const [currentTime, setCurrentTime] = useState(new Date());
  const Attentoken = JSON.parse(localStorage.getItem("Token"))

  const [toggleCheckbox, setToggleCheckbox] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every 1000 milliseconds (1 second)
    return () => {
      clearInterval(interval);
    };
  }, []);



  const currentDate = new Date();



  const [userData, setUserData] = useState({
    branch: "CSE",
    semester: "1st",
    enrollment: "178",
    subject1: "",
    subject1_present: 11,
    subject1_absent: 1,
    subject2: "",
    subject2_present: 15,
    subject2_absent: 5,
    subject3: "",
    subject3_present: 17,
    subject3_absent: 4,
    subject4: "",
    subject4_present: 12,
    subject4_absent: 5,
    subject5: "",
    subject5_present: 19,
    subject5_absent: 8,
    subject6: "",
    subject6_present: 1,
    subject6_absent: 5
  });

  const formik = useFormik({
    initialValues: {
      Subject1name: userData.subject1,
      Subject2name: userData.subject2,
      Subject3name: userData.subject3,
      Subject4name: userData.subject4,
      Subject5name: userData.subject5,
      Subject6name: userData.subject6,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      // You can access form values in the 'values' parameter
      // console.log("Form values submitted:", values);
      // You can call your updateSubject function or perform other actions here
    },
  });



  const getCallAPI = async () => {
    try {
      const response = await axios.get(
        'https://collegeeazy-9mwu.onrender.com/collegeazy/attendance/private/',
        {
          headers: {
            Authorization: `Bearer ${Attentoken.jwt}`
          }
        }
      );
      setUserData(response.data); // Update the userData state with the response data

      // console.log(response.data, "this is the data of Response"); // Log the response data
      // console.log(userData, "this is the userData "); // Log the response data
    } catch (error) {
      // console.error(error);
    }
  };



  useEffect(() => {
    // console.log(userData, "this is the userData ");
  }, [userData]);



  useEffect(() => {
    getCallAPI();
  }, []);



  useEffect(() => {
    // Update the form values when userData changes
    if (userData) {
      formik.setValues({
        Subject1name: userData.subject1,
        Subject2name: userData.subject2,
        Subject3name: userData.subject3,
        Subject4name: userData.subject4,
        Subject5name: userData.subject5,
        Subject6name: userData.subject6,
      });
    }
  }, [userData]);

  // for put api
  const [subID, setSubID] = useState(" ");
  const [inc, setInc] = useState(0);
  const [dec, setdec] = useState(0);



  const updateAttendance = async (userData) => {

    // console.log('Received form userData:', userData);
    try {
      const response = await axios.put(
        'https://collegeeazy-9mwu.onrender.com/collegeazy/attendance/private/update',
        {
          enrollment: Attentoken.enrollment,
          branch: userData.branch,
          semester: userData.semester,
          subject1: userData.subject1,
          subject1_present: userData.subject1_present,
          subject1_absent: userData.subject1_absent,
          subject2: userData.subject2,
          subject2_present: userData.subject2_present,
          subject2_absent: userData.subject2_absent,
          subject3: userData.subject3,
          subject3_present: userData.subject3_present,
          subject3_absent: userData.subject3_absent,
          subject4: userData.subject4,
          subject4_present: userData.subject4_present,
          subject4_absent: userData.subject4_absent,
          subject5: userData.subject5,
          subject5_present: userData.subject5_present,
          subject5_absent: userData.subject5_absent,
          subject6: userData.subject6,
          subject6_present: userData.subject6_present,
          subject6_absent: userData.subject6_absent,
        },
        {
          headers: {
            Authorization: `Bearer ${Attentoken.jwt}`
          }
        }
      );
      // console.log('Attendance updated successfully:', response.data);
    } catch (error) {
      // console.error('Failed to update attendance:', error.response);
    }
  };

  useEffect(() => {
    updateAttendance();
  }, [inc,dec]);



  const updateSubject = async (addData) => {
    try {
      // Update the subjects array with new subject names
      const updatedSubjects = subjects.map((subject, index) => ({
        name: addData[`Subject${index + 1}name`] || subject.name,
        present: userData[`${subject.value}_present`],
        absent: userData[`${subject.value}_absent`],
        value: subject.value,
      }));

      const updatedUserData = {
        ...userData,
        ...Object.fromEntries(
          updatedSubjects.map((subject) => [
            subject.value,
            subject.name,
          ])
        ),
      };

      // Update present and absent counts for new subject names (if any)
      updatedSubjects.forEach((subject) => {
        updatedUserData[`${subject.value}_present`] = subject.present;
        updatedUserData[`${subject.value}_absent`] = subject.absent;
      });

      setUserData(updatedUserData); // Update the userData state with the new data

      // Make the PUT API call to update the data on the server
      const response = await axios.put(
        'https://collegeeazy-backend-production.up.railway.app/collegeazy/attendance/private/update',
        {
          enrollment: Attentoken.enrollment,
          branch: updatedUserData.branch,
          semester: updatedUserData.semester,
          ...Object.fromEntries(
            updatedSubjects.map((subject) => [
              subject.value,
              subject.name,
            ])
          ),
          ...Object.fromEntries(
            updatedSubjects.map((subject) => [
              `${subject.value}_present`,
              subject.present,
            ])
          ),
          ...Object.fromEntries(
            updatedSubjects.map((subject) => [
              `${subject.value}_absent`,
              subject.absent,
            ])
          ),
        },
        {
          headers: {
            Authorization: `Bearer ${Attentoken.jwt}`,
          },
        }
      );

      updateAttendance(userData);
      setToggleCheckbox(!toggleCheckbox);

      // console.log('Attendance updated successfully:', updatedUserData);
      // console.log('API response:', response.data);
    } catch (error) {
      // console.error('Failed to update attendance:', error);
    }
  };



  const [sub, setSubject] = useState("All Subjects");
  const [val, setVal] = useState(0);

  const handleIncrement = () => {
    setInc(prevInc => prevInc + 1);
    setUserData(prevUserData => ({
      ...prevUserData,
      [`${val}_present`]: prevUserData[`${val}_present`] + 1
    }));
    updateAttendance(userData);
  };



  const handleDecrement = () => {
    setdec(prevDec => prevDec + 1);
    setUserData(prevUserData => ({
      ...prevUserData,
      [`${val}_absent`]: prevUserData[`${val}_absent`] + 1
    }));
    updateAttendance(userData);
  };



  const handleTotal = () => {
    const totalCount = inc - dec;
    // console.log(totalCount, "time totalCount is printed");
  };

  const subjects = [
    { name: userData.subject1, present: userData.subject1_present, absent: userData.subject1_absent, value: "subject1" },
    { name: userData.subject2, present: userData.subject2_present, absent: userData.subject2_absent, value: "subject2" },
    { name: userData.subject3, present: userData.subject3_present, absent: userData.subject3_absent, value: "subject3" },
    { name: userData.subject4, present: userData.subject4_present, absent: userData.subject4_absent, value: "subject4" },
    { name: userData.subject5, present: userData.subject5_present, absent: userData.subject5_absent, value: "subject5" },
    { name: userData.subject6, present: userData.subject6_present, absent: userData.subject6_absent, value: "subject6" },
  ];

  const [isSubjectSelected, setIsSubjectSelected] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);





  // Calculate total presents and absents for all subjects
  const totalPresents = subjects.reduce((total, subject) => total + userData[`${subject.value}_present`], 0);
  const totalAbsents = subjects.reduce((total, subject) => total + userData[`${subject.value}_absent`], 0);




  // Calculate the attendance percentage based on the selected subject or aggregate attendance
  const attendancePercentage =
    selectedSubject === null
      ? Math.trunc((totalPresents / (totalPresents + totalAbsents)) * 100)
      : inc + dec === 0
        ? 0
        : Math.trunc((userData[`${selectedSubject}_present`] / (userData[`${selectedSubject}_present`] + userData[`${selectedSubject}_absent`])) * 100);



  const SubjectButtons = () => {
    return (
      <div className="attenSubButton">
        {subjects.map((subject, index) => (
          subject.name ? (
            <button
              className="btnn"
              key={index}
              onClick={() => {
                setInc(subject.present);
                setdec(subject.absent);
                setSubject(subject.name);
                setVal(subject.value);
                setSubID(subject.value);
                setIsSubjectSelected(true); // Set to true when a subject is clicked
                setSelectedSubject(subject.value);
                // console.log("This subject is", subject.name);
              }}
            >
              {subject.name}
            </button>
          ) : null
        ))}
      </div>
    );
  };



  return (
    <>
      <Navbar />
      <div className="attendancePage" style={{ marginTop: "90px " }} >
        <div className="frontAtten">
          <div className="attendFrontImg">
            <img src={frontAtte} alt="" />
          </div>
          <div className="frontTextFont">
            <h1>ATTENDANCE</h1>
            <p>Effortless monitoring for better class attendance management, streamlining your academic journey.</p>
          </div>
        </div>

        <h3 style={{ textAlign: "center" }}>Attendence in <span style={{ color: "#69499d", textTransform: "uppercase" }}> {sub}</span></h3>

        <div className="AttendanceMain">
          <div className="AttendanceSidebar" >
            <h1> SUBJECTS</h1>
            <div className="attenSubButton">
              <ul> <SubjectButtons /></ul>
            </div>
          </div>
          <div className="attendacneBAR">
            <div className="AttendanceMeter">

              <div className="AttendanceCircle">
                <div className="progressCenter">{attendancePercentage}%</div>
                <Circle
                  percent={attendancePercentage}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeColor={{
                    "0%": "white",
                    "100%": "#46aece",
                  }}
                  style={{ transition: "all 0.3s ease-in-out" }}
                  gapDegree={70}
                />
              </div>
            </div>

            <div className="attendacneCount ">
              <div className="AttendDec" style={{ width: '50%', padding: "0" }}>
                <div className="decCount" style={{ fontSize: "25px" }}>{dec}</div>
                <button className="decs btn1" onClick={() => { handleDecrement(); handleTotal(); }} style={{ fontSize: "20px" }}>
                  <b>Absent</b>  </button>
              </div>
              <div className="AttendInc" style={{ width: '50%', padding: "0" }}>
                <div className="incCount" style={{ fontSize: "25px" }}>{inc}</div>
                <button className="incss btn2" onClick={() => { handleIncrement(); handleTotal(); }} style={{ fontSize: "20px" }} >
                  <b>Present</b></button>
              </div>
            </div>
          </div>

          <div className="attendanceDateSec">
            <div className="containerShopAdd">
              <input type="checkbox" id="toggleCheckbox" className="toggle-checkbox" />
              <div className="ADDBTushop">
                <label htmlFor="toggleCheckbox" className="toggle-label">
                  Add Subjects
                </label>
              </div>
              <div className="SidecardA">
                <div className="cardAdditem">
                <input type="checkbox" id="toggleCheckbox" checked={toggleCheckbox} onChange={() => setToggleCheckbox(!toggleCheckbox)} className="toggle-checkbox" />
                  <label htmlFor="toggleCheckbox" className="closebtnAddItem "  style={{ cursor: "pointer" }}>
                  ❌
                  </label>
                  <div className="formAdd">
                    <FormComponent subjects={subjects} userData={userData} onSubmit={updateSubject} />
                  </div>
                </div>
              </div>
            </div>
            <div className="TimeSecImg">
              <img src={attenImg} alt="" />
            </div>
            <h1>Current Date</h1>
            <p>{currentDate.toDateString()}</p>
            <h1>Current Time</h1>
            <p>{currentTime.toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}