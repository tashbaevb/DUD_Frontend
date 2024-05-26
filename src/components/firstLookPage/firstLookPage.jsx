import React from 'react';
import './FirstLookPage.css';
import { Link } from 'react-router-dom';
import image1 from'./../../assets/image1.png'; 

function FirstLookPage() {
  return (
    <div id="FirstLookPage-container">
      <header className="FirstLookPage-header">
        <nav>
          <ul>
            <li className="auth-button"><Link to='/sign-up'>Register</Link></li>
            <li className="auth-button"><Link to='/'>Login</Link></li>
          </ul>
        </nav>
      </header>

      <section id="FirstLookPage-intro" className="FirstLookPage-section">
        <div className="FirstLookPage-content">
          <div className="FirstLookPage-intro-content">
            <h1>Effective English courses for kids and teenagers</h1>
            <p>Learn English for everyday situations with top-notch teachers.</p>
            <div className="FirstLookPage-intro-image">
              <img src={image1} alt="Learning" />
            </div>
            <p></p>
            <p></p>
            <button>Subscribe</button>
          </div>
        </div>
      </section>

      <section id="FirstLookPage-features" className="FirstLookPage-section row-section">
        <div className="FirstLookPage-content row-content">
          <div className="FirstLookPage-feature-item">
            <img src="https://via.placeholder.com/100" alt="Feature 1" />
            <h3>Interactive sessions</h3>
          </div>
          <div className="FirstLookPage-feature-item">
            <img src="https://via.placeholder.com/100" alt="Feature 2" />
            <h3>Affordable lessons</h3>
          </div>
          <div className="FirstLookPage-feature-item">
            <img src="https://via.placeholder.com/100" alt="Feature 3" />
            <h3>Convenient scheduling</h3>
          </div>
        </div>
      </section>

      <section id="FirstLookPage-testimonial" className="FirstLookPage-section">
        <div className="FirstLookPage-content">
          <img src="https://via.placeholder.com/100" alt="Testimonial" />
          <blockquote>
            <p>"Your platform gave me an amazing opportunity to improve my English language skills."</p>
            <cite>- Student Name</cite>
          </blockquote>
        </div>
      </section>

      <section id="FirstLookPage-stats" className="FirstLookPage-section row-section">
        <div className="FirstLookPage-content row-content">
          <div className="FirstLookPage-stat-item">
            <img src="https://via.placeholder.com/100" alt="Stat 1" />
            <h3>97.95%</h3>
            <p>Success rate</p>
          </div>
          <div className="FirstLookPage-stat-item">
            <img src="https://via.placeholder.com/100" alt="Stat 2" />
            <h3>37.4k</h3>
            <p>Students</p>
          </div>
          <div className="FirstLookPage-stat-item">
            <img src="https://via.placeholder.com/100" alt="Stat 3" />
            <h3>5,000+</h3>
            <p>Courses</p>
          </div>
          <div className="FirstLookPage-stat-item">
            <img src="https://via.placeholder.com/100" alt="Stat 4" />
            <h3>40</h3>
            <p>Teachers</p>
          </div>
        </div>
      </section>

      <section id="FirstLookPage-cta" className="FirstLookPage-section">
        <div className="FirstLookPage-content">
          <h2>Upgrade your language skills with our team!</h2>
          <div className="FirstLookPage-cta-image">
            <img src="https://via.placeholder.com/400x300" alt="Upgrade" />
          </div>
          <button className="cta-button">Join Now</button>
        </div>
      </section>

      <footer className="FirstLookPage-footer">
        <p>© 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default FirstLookPage;
