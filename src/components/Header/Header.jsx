import React from "react";
import { FaHome } from "react-icons/fa";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
const category = ["Health", "Food", "Travel", "Technology"];
const navigate = useNavigate()


  return (
    <div className="header-container">
      <FaHome className="home-icon" onClick={()=> navigate('/')}/>

      <div className="category-container">
        {category.map((item, index) => (
          <Link to={`/category/${item}`} className="nav-link" key={index}>
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Header;
