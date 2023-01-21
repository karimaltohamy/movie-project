import React, { useState } from "react";
import "../scss/sign.scss";
import bg from "../assets/footer-bg.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useAuth } from "../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation()

  const redirectPath = location.state?.path || "/"

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      await login(email, password);
      navigate(redirectPath);
      
    } catch (error) {
      setError("Faild in login, try again");
    }

    setLoading(false);
  };

  return (
    <section
      className="form-container"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form className="form" onSubmit={handleForm}>
        <h2 className="title-form">Login</h2>
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

        <div className="row mb-4">
          <div className="col">
            <a href="#!" className="forgot">
              Forgot password?
            </a>
          </div>
        </div>

        <button type="submit" className="btn btn-form" disabled={loading}>
          Login
        </button>

        <div className="text-center">
          <p>
            Not a member? <Link to="/sign-up">Register</Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;
