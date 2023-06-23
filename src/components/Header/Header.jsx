import React from "react";
import { FaHome } from "react-icons/fa";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

function Header() {
  //get user data
  const [user] = useAuthState(auth);
  console.log(user);

  const category = ["Health", "Food", "Travel", "Technology"];
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <FaHome className="home-icon" onClick={() => navigate("/")} />
      {user ? (
        <Link to="/addarticle" className="auth-link">
          Add Article
        </Link>
      ) : null}

      <div className="category-container">
        {category.map((item, index) => (
          <Link to={`/category/${item}`} className="nav-link" key={index}>
            {item}
          </Link>
        ))}
      </div>

      {user ? (
        <div>
          <span className="username">{user.displayName}</span>
          <button className="auth-link" onClick={() => signOut(auth)}>
            Logout
          </button>
        </div>
      ) : (
        <Link className="auth-link" to="/auth">
          SignUp
        </Link>
      )}
    </div>
  );
}

export default Header;
