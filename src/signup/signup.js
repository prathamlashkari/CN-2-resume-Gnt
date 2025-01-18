import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../config_db/firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../config_db/firebase';  // Assuming you've exported your Firestore instance as 'db'
import { LoadingContext } from '../contexts/loadingContext';





const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    gender: ""
  });
  const {loading,setLoading}=useContext(LoadingContext)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const navigate=useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const { firstName, lastName, email, password, dob, gender } = formData;
  
    // Validation for empty fields
    if (!firstName || !lastName || !email || !password || !dob || !gender) {
      toast.error("Complete all fields");
      return;
    }

    // Password length validation
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }
  
    // Validate email format using a simple regex (this is basic and can be enhanced)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email");
      return;
    }
    
    try {
      // Create the user with email and password
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
    
      // Update the user's profile (name in this case)
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      
      const userDocRef = doc(db, "users", user.uid); // "users" is the collection name
      await setDoc(userDocRef, { dob, gender ,displayName: `${firstName} ${lastName}`,email }, { merge: true });
      setLoading(false);
      toast.success("User registered successfully");

      // Navigate to the Sign-in page
      navigate("/signin");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
          toast.error("Email is already in use");
      } else {
          // Handle other errors (for brevity, we'll show a generic message here)
          toast.error("Error registering user");
      }
    }
};

  

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className='Signuptext'>Sign Up</h2>

        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} />

        <div className="gender-options">
  <label>
    <input 
      type="radio" 
      name="gender" 
      value="male" 
      checked={formData.gender === "male"} 
      onChange={handleChange} 
    />
    Male
  </label>
  <label>
    <input 
      type="radio" 
      name="gender" 
      value="female" 
      checked={formData.gender === "female"} 
      onChange={handleChange} 
    />
    Female
  </label>
  <label>
    <input 
      type="radio" 
      name="gender" 
      value="other" 
      checked={formData.gender === "other"} 
      onChange={handleChange} 
    />
    Other
  </label>
</div>


        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
