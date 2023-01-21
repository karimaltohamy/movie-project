import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./header.scss";

//images
import logoImg from "../../assets/tmovie.png";
import  Button  from "../button/Button";
import { useAuth } from "../../context/authContext";
import { useState } from "react";

const Header = () => {

  const {logout} = useAuth()
  const navigate = useNavigate();
  const [error, setError] = useState("")

  const headerRef = useRef(null)

  const headerNav = [
    {
      display: "Home",
      path: "/",
    },
    {
      display: "Movie",
      path: "/movie",
    },
    {
      display: "Tv",
      path: "/tv",
    },
  ];

  // get name path
  const { pathname } = useLocation();

  const active = headerNav.findIndex((e) => e.path === pathname);


  const handleLogout = async () => {
    try {
      setError("")
      await logout()
      navigate("/login")
    } catch (error) {
      setError("faild to logout")
    }
  }

  // scroll
  useEffect(() => {
    const shrinkHeader = () => {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            headerRef.current.classList.add('shrink');
        } else {
            headerRef.current.classList.remove('shrink');
        }
    }
    window.addEventListener('scroll', shrinkHeader);
    return () => {
        window.removeEventListener('scroll', shrinkHeader);
    };
}, []);

  return (
    <>
    <div ref={headerRef} className="header">
      <div className="header_warp container">
        <div className="logo">
          <img src={logoImg} alt="" />
          <Link to="/">tmovie</Link>
        </div>
        <ul className="nav_list">
          {headerNav.map((item, index) => {
            return (
              <li key={index} className={`${index === active && "active"}`}>
                <Link to={item.path}>{item.display}</Link>
              </li>
            );
          })}
          <Button className="btn-header" onClick={handleLogout}>Logout</Button>
        </ul>
      </div>
    </div>
    {error && (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )}
    </>
  );
};

export default Header;
