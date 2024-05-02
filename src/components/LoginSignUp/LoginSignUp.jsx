import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate вместо useHistory
import './style.css';

function LoginSignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [levelIds, setLevelIds] = useState([]);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Используем useNavigate вместо useHistory

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const url = isLogin ? 'http://localhost:8086/auth' : 'http://localhost:8086/register';
      const requestData = isLogin ? { email, password } : { email, password, levelIds };
      const response = await axios.post(url, requestData);
      const { access_token } = response.data;

      localStorage.setItem('jwtToken', access_token);

      const profileResponse = await axios.get('http://localhost:8086/user/my-profile', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const userProfile = profileResponse.data;
      const userEmail = userProfile.email;

      navigate(`/profile/${userEmail}`); // Используем navigate для перехода
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
    setConfirmPassword('');
  };

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit} className={isLogin ? 'login' : 'signup'}>
        <div className="field">
          <input
            type="text"
            placeholder="Email Address"
            required
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!isLogin && (
          <div className="field">
            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}
        {!isLogin && (
          <div className="field">
            <select
              multiple
              value={levelIds}
              onChange={(e) => setLevelIds(Array.from(e.target.selectedOptions, option => option.value))}
            >
              <option value="1">A1</option>
              <option value="2">A2</option>
            </select>
          </div>
        )}
        <div className="field btn">
          <div className="btn-layer"></div>
          <input type="submit" value={isLogin ? 'Login' : 'Sign Up'} />
        </div>
        <div className="signup-link">
          {isLogin ? "Don't Have Account? " : "Already have an account? "}
          <span onClick={handleModeSwitch}>{isLogin ? 'Sign Up' : 'Login'}</span>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default LoginSignUp;
