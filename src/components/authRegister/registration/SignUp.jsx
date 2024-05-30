import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [languageLevels, setLanguageLevels] = useState([1]); // Устанавливаем уровень языка по умолчанию
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8086/register", {
        email,
        password,
        levelIds: languageLevels,
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
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="main">
      <div className="regist">
        <div className="reg_text">
          <h1>Registrierung</h1>
        </div>
        <div className="form_reg">
          <form onSubmit={handleFormSubmit} className="reg_form">
            <input
              type="text"
              name="email"
              placeholder="Email"
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
            <input
              type="password"
              name="submit_password"
              placeholder="Submit Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="language_level">Wählen Sie das Sprachniveau:</label>
            <select
              name="language_level"
              id="language_level"
              multiple
              value={languageLevels}
              onChange={(e) =>
                setLanguageLevels(
                  Array.from(e.target.selectedOptions, (option) =>
                    parseInt(option.value)
                  )
                )
              }
            >
              <option value="1">A1</option>
              <option value="2">A2</option>
              <option value="3">B1</option>
              <option value="4">B2</option>
            </select>
            <button id="reg_but" type="submit">
              <span id="reg_text_but">Registrieren</span>
            </button>
          </form>
          <p id="text_after_but">
            Haben Sie ein Konto?{" "}
            <span id="text_in_p">
              <a href="/login">Log in</a>
            </span>
          </p>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
