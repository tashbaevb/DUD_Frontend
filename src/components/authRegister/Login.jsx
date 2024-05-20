import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8086/auth", {
        email,
        password,
      });
      const { access_token } = response.data;

      localStorage.setItem("jwtToken", access_token);

      const profileResponse = await axios.get(
        "http://localhost:8086/user/my-profile",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const userProfile = profileResponse.data;
      const userEmail = userProfile.email;

      navigate(`/profile/${userEmail}`);
    } catch (error) {
      console.error(error);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="main">
      <div className="login">
        <div className="login-title">
          <h1>Log In</h1>
        </div>
        <div className="login-form">
          <form className="login-form-content" onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="email"
              placeholder="login"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-button" type="submit">
              <span className="login-button-text">Log in</span>
            </button>
          </form>
          <p className="text-after-button">
            Sie haben noch kein Konto?{" "}
            <span className="login-link">
              <a href="/sign-up">Registrieren</a>
            </span>
          </p>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
