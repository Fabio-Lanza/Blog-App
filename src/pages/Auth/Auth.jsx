import React from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../config/firebaseConfig";
import {
createUserWithEmailAndPassword,signInWithEmailAndPassword,
updateProfile, } from "firebase/auth";

function Auth() {
  const [existingUser, setExistingUser] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  //function for signup
  const handleSignUp = (e) => {
    e.preventDefault();

    //create a user
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
        //add name as display name
        updateProfile(auth.currentUser, { displayName: name });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  //function for Login
  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then( res=> {
      navigate("/");
    })
    .catch((err) => alert(err.com));
  }


  return (
    <div className="auth-container" onSubmit={handleLogin}>
      {existingUser ? (
        <form className="auth-form">
          <h1>Login with your email</h1>
          <div className="form-group">
            <input 
            type="email" 
            placeholder="Enter your email" 
            required 
            onChange={(e) => setEmail(e.target.value)}/>

            <input 
            type="password"
            placeholder="Enter password" 
            required 
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account?{" "}
            <span className="form-link" onClick={() => setExistingUser(false)}>
              Signup
            </span>
          </p>
        </form>
      ) : (
        <form className="auth-form" onSubmit={handleSignUp}>
          <h1>Signup with your email</h1>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter your name"
              required
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
          <p>
            Already have an account?{" "}
            <span className="form-link" onClick={() => setExistingUser(true)}>
              Login
            </span>
          </p>
        </form>
      )}
    </div>
  );
}

export default Auth;
