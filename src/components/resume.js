import React, { useState, useEffect, useContext } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../config_db/firebase';
import { LoadingContext } from '../contexts/loadingContext';

const Resume = () => {
  const [resumeData, setResumeData] = useState({});
  const {loading,setLoading}=useContext(LoadingContext)
  useEffect(() => {
    const yourpholioData = JSON.parse(localStorage.getItem('yourpholio'));

    if(yourpholioData && yourpholioData.uid){
      const fetchResumeData = async () => {
        setLoading(true)
        const resumeDocRef = doc(db, "resumes", yourpholioData.uid); 
        const userDocRef = doc(db, "users", yourpholioData.uid);
        
        const resumeDocSnap = await getDoc(resumeDocRef);
        const userDocSnap = await getDoc(userDocRef);

        const mergedData = {
          ...resumeDocSnap.data(),
          name: userDocSnap.data()?.displayName || "",
          dob: userDocSnap.data()?.dob || "",
          gender: userDocSnap.data()?.gender || "",
          email: userDocSnap.data()?.email || ""
        };
        setLoading(false)
        setResumeData(mergedData);
      }

      fetchResumeData();
    }
  }, []);

  return (
    <div className="profile-container">
      <img src={resumeData.profilePicURL || "https://www.vippng.com/png/detail/416-4161690_empty-profile-picture-blank-avatar-image-circle.png"} alt="Profile Picture" className="profile-pic"/>
      
      <div className="info-container">
        <div>
          <h1>Name:</h1>
          <p>{resumeData.name}</p>
        </div>
        <div>
          <h1>Email:</h1>
          <p>{resumeData.email}</p>
        </div>
        <div>
          <h1>Date of Birth:</h1>
          <p>{resumeData.dob}</p>
        </div>
        <div>
          <h1>Gender:</h1>
          <p>{resumeData.gender}</p>
        </div>
        <div>
          <h1>Objective:</h1>
          <p>{resumeData.objective}</p>
        </div>
        <div>
          <h1>Experience:</h1>
          <p>{resumeData.experience}</p>
        </div>
        <div>
          <h1>Education:</h1>
          <p>{resumeData.education}</p>
        </div>
        <div>
          <h1>Skills:</h1>
          <p>{resumeData.skills}</p>
        </div>
      </div>
    </div>
  )
  
}

export default Resume;
