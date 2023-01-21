import React from "react";
import { Link } from "react-router-dom";

import "./footer.scss";

import bgFooter from "../../assets/footer-bg.jpg";

//images
import logoImg from "../../assets/tmovie.png";

const Footer = () => {
  return (
    <div className="footer" style={{ backgroundImage: `url(${bgFooter})` }}>
      <div className="footer_content container">
        <div className="logo">
          <img src={logoImg} alt="" />
          <Link to="/">tmovie</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
