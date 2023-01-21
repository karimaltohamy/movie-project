import React, { useRef } from "react";
import "../scss/sign.scss";
import bg from "../assets/footer-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import { useEffect } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfiramion, setPasswordConfiramion] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();

  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();

    if (password !== passwordConfiramion) {
      return setError("password not do match");
    }

    try {
      setLoading(true);
      setError("");
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      setError("Faild create account, try again");
    }
    setLoading(false);

  };

  return (
    <section
      className="form-container"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form className="form" onSubmit={handleForm}>
        <h2 className="title-form">Sign Up</h2>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="form-outline">
          <label className="form-label" htmlFor="form2Example1">
            Email address
          </label>
          <input
            type="email"
            id="form2Example1"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="form-outline">
          <label className="form-label" htmlFor="form2Example2">
            Password
          </label>
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="form-outline">
          <label className="form-label" htmlFor="form3Example3">
            Password Confirmation
          </label>
          <input
            type="password"
            id="form3Example3"
            className="form-control"
            onChange={(e) => setPasswordConfiramion(e.target.value)}
            value={passwordConfiramion}
          />
        </div>

        <div className="row mb-4">
          <div className="col">
            <a href="#!" className="forgot">
              Forgot password?
            </a>
          </div>
        </div>

        <button type="submit" className="btn btn-form" disabled={loading}>
          Sign Up
        </button>

        <div className="text-center">
          <p>
            Already have an account ?<Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
