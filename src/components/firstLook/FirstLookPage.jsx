import React from "react";
import "./FirstLookPage.css";
import { Link } from "react-router-dom";
import image1 from "./../../assets/image1.png";
import image2 from "./../../assets/image2.png";
import image3 from "./../../assets/image3.png";
import image4 from "./../../assets/image4.png";
import image5 from "./../../assets/image5.png";
import image6 from "./../../assets/image6.png";
import logo from "./../../assets/logo.png";

function FirstLookPage() {
  return (
    <div id="FirstLookPage-container">
      <header className="FirstLookPage-header">
        <nav>
          <ul>
            <li className="auth-button">
              <Link to="/">
                <img src={logo} alt="logo" />{" "}
              </Link>
            </li>
            <li className="auth-button" id="registerButtonFirst">
              <Link to="/sign-up">Registrieren </Link>
            </li>
          </ul>
        </nav>
      </header>

      <section id="FirstLookPage-intro" className="FirstLookPage-section">
        <div className="FirstLookPage-content intro-content">
          <div className="FirstLookPage-intro-image">
            <img src={image1} alt="Learning" />
          </div>
          <div className="FirstLookPage-intro-content">
            <h1>Effektive Deutschkurse für Kinder und Jugendliche</h1>
            <p>
              Lerne Deutsch für Alltagssituationen mit erstklassigen Lehrern.
            </p>
            <button id="SubscribeButton">Abonnieren </button>
          </div>
        </div>
      </section>

      <section
        id="FirstLookPage-features"
        className="FirstLookPage-section row-section"
      >
        <div className="text-features-first">
          <p id="first-text1">Grenzenloses Lernen</p>
          <p id="second-text2">Beste Kurse</p>
        </div>
        <div className="FirstLookPage-content row-content">
          <div className="FirstLookPage-feature-item">
            <img src={image2} alt="Feature 1" />
            <h3>Interaktive Sitzungen</h3>
          </div>
          <div className="FirstLookPage-feature-item">
            <img src={image3} alt="Feature 2" />
            <h3>Erschwinglicher Unterricht</h3>
          </div>
          <div className="FirstLookPage-feature-item">
            <img src={image4} alt="Feature 3" />
            <h3>Bequeme Terminplanung </h3>
          </div>
        </div>
      </section>

      <section id="FirstLookPage-testimonial" className="FirstLookPage-section">
        <div className="testimonial-content">
          <img src={image5} alt="Testimonial Image" />
          <blockquote>
            <p>
              “Ihre Plattform gab mir eine großartige Gelegenheit, eine neue
              Gewohnheit zu entwickeln, regelmäßig Sprache zu lernen und
              natürlich meine Sprachkenntnisse zu verbessern. Ich habe einen
              Brief mit Glückwünschen vom Team erhalten.”
            </p>
            <footer>
              Margot Robbie, <span>16 jahre alt</span>
            </footer>
          </blockquote>
        </div>
      </section>

      <section id="FirstLookPage-stats" className="FirstLookPage-section">
        <div className="stats-content">
          <div className="stat-item">
            <svg
              width="28.000000"
              height="28.000000"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <desc>Created with Pixso.</desc>
              <defs>
                <clipPath id="clip855_449">
                  <rect
                    id="icon"
                    width="28.000000"
                    height="28.000000"
                    fill="white"
                    fill-opacity="0"
                  />
                </clipPath>
              </defs>
              <g clip-path="url(#clip855_449)">
                <path
                  id="Vector"
                  d="M14 24.5L2.33 10.79L5.65 3.5L22.34 3.5L25.66 10.79L14 24.5Z"
                  fill="#1C1B1F"
                  fill-opacity="1.000000"
                  fill-rule="nonzero"
                />
                <path
                  id="Vector (Stroke)"
                  d="M4.85 3.13C5 2.82 5.31 2.62 5.65 2.62L22.34 2.62C22.68 2.62 22.99 2.82 23.14 3.13L26.46 10.42C26.6 10.73 26.55 11.1 26.33 11.35L14.66 25.06C14.5 25.26 14.25 25.37 14 25.37C13.74 25.37 13.5 25.26 13.33 25.06L1.66 11.35C1.44 11.1 1.39 10.73 1.53 10.42L4.85 3.13ZM6.21 4.37L3.36 10.64L14 23.14L24.64 10.64L21.78 4.37L6.21 4.37Z"
                  fill="#1C1B1F"
                  fill-opacity="1.000000"
                  fill-rule="evenodd"
                />
                <path
                  id="Vector (Stroke)"
                  d="M8.75 9.84C9.11 9.52 9.66 9.55 9.98 9.91L14 14.43L18.01 9.91C18.33 9.55 18.88 9.52 19.24 9.84C19.6 10.16 19.64 10.72 19.32 11.08L14.65 16.33C14.48 16.51 14.25 16.62 14 16.62C13.75 16.62 13.51 16.51 13.34 16.33L8.67 11.08C8.35 10.72 8.39 10.16 8.75 9.84Z"
                  fill="#FFFBFF"
                  fill-opacity="1.000000"
                  fill-rule="evenodd"
                />
              </g>
            </svg>

            <h2>97.95%</h2>
            <p>
              Abschlussquote
              <br />
              <span>von all unseren Kursen</span>
            </p>
          </div>
          <div className="stat-item">
            <svg
              width="28.000000"
              height="28.000000"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <desc>Created with Pixso.</desc>
              <defs>
                <clipPath id="clip855_453">
                  <rect
                    id="icon"
                    width="28.000000"
                    height="28.000000"
                    fill="white"
                    fill-opacity="0"
                  />
                </clipPath>
              </defs>
              <g clip-path="url(#clip855_453)">
                <path
                  id="Vector"
                  d="M6.12 7.58C6.12 4.84 8.34 2.62 11.08 2.62C13.82 2.62 16.04 4.84 16.04 7.58C16.04 10.32 13.82 12.54 11.08 12.54C8.34 12.54 6.12 10.32 6.12 7.58ZM18.27 3.63C18.52 3.21 19.05 3.08 19.47 3.33C20.91 4.2 21.87 5.77 21.87 7.58C21.87 9.38 20.91 10.96 19.47 11.83C19.05 12.08 18.52 11.94 18.27 11.53C18.02 11.12 18.15 10.58 18.56 10.33C19.5 9.77 20.12 8.74 20.12 7.58C20.12 6.41 19.5 5.39 18.56 4.83C18.15 4.58 18.02 4.04 18.27 3.63ZM9.76 15.45L12.4 15.45C13.67 15.45 14.68 15.45 15.5 15.52C16.33 15.59 17.03 15.73 17.68 16.06C18.72 16.59 19.57 17.44 20.1 18.48C20.43 19.12 20.57 19.83 20.64 20.66C20.7 21.47 20.7 22.48 20.7 23.76L20.7 24.5C20.7 24.98 20.31 25.37 19.83 25.37L2.33 25.37C1.85 25.37 1.45 24.98 1.45 24.5L1.45 23.76C1.45 22.48 1.45 21.47 1.52 20.66C1.59 19.83 1.73 19.12 2.06 18.48C2.59 17.44 3.44 16.59 4.48 16.06C5.12 15.73 5.83 15.59 6.66 15.52C7.47 15.45 8.48 15.45 9.76 15.45L9.76 15.45ZM22.33 16.44C22.55 16.01 23.08 15.84 23.51 16.06C24.55 16.59 25.4 17.44 25.93 18.48C26.26 19.12 26.4 19.83 26.47 20.66C26.54 21.47 26.54 22.48 26.54 23.76L26.54 24.5C26.54 24.98 26.14 25.37 25.66 25.37C25.18 25.37 24.79 24.98 24.79 24.5L24.79 23.8C24.79 22.47 24.79 21.54 24.73 20.8C24.67 20.08 24.55 19.63 24.37 19.27L22.72 17.62C22.29 17.4 22.11 16.87 22.33 16.44Z"
                  fill="#1C1B1F"
                  fill-opacity="1.000000"
                  fill-rule="evenodd"
                />
              </g>
            </svg>

            <h2>37.4k</h2>
            <p>
              Glückliche Studenten
              <br />
              <span>auf der Plattform</span>
            </p>
          </div>
          <div className="stat-item">
            <svg
              width="25.083252"
              height="16.916748"
              viewBox="0 0 25.0833 16.9167"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <desc>Created with Pixso.</desc>
              <defs />
              <path
                id="Vector"
                d="M24.2 0.87L0.87 0.87L0.87 16.04L24.2 16.04L24.2 0.87Z"
                fill="#1C1B1F"
                fill-opacity="1.000000"
                fill-rule="nonzero"
              />
              <path
                id="Vector (Stroke)"
                d="M0 0.87C0 0.39 0.39 0 0.87 0L24.2 0C24.69 0 25.08 0.39 25.08 0.87L25.08 16.04C25.08 16.52 24.69 16.91 24.2 16.91L0.87 16.91C0.39 16.91 0 16.52 0 16.04L0 0.87ZM1.75 1.75L1.75 15.16L23.33 15.16L23.33 1.75L1.75 1.75Z"
                fill="#1C1B1F"
                fill-opacity="1.000000"
                fill-rule="evenodd"
              />
              <path
                id="Vector"
                d="M11.37 6.12L14.87 8.45L11.37 10.79L11.37 6.12Z"
                fill="#FFFBFF"
                fill-opacity="1.000000"
                fill-rule="nonzero"
              />
            </svg>
            <h2>5,000+</h2>
            <p>
              Beste Lektionen
              <br />
              <span>in unseren Kursen</span>
            </p>
          </div>
          <div className="stat-item">
            <svg
              width="28.000000"
              height="28.000000"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <desc>Created with Pixso.</desc>
              <defs>
                <clipPath id="clip855_461">
                  <rect
                    id="icon"
                    width="28.000000"
                    height="28.000000"
                    fill="white"
                    fill-opacity="0"
                  />
                </clipPath>
              </defs>
              <g clip-path="url(#clip855_461)">
                <path
                  id="Subtract"
                  d="M13.48 1.62C13.79 1.4 14.2 1.4 14.51 1.62L17.34 3.69L20.85 3.68C21.23 3.68 21.57 3.93 21.69 4.29L22.76 7.62L25.6 9.68C25.91 9.9 26.04 10.3 25.92 10.66L24.83 14L25.92 17.33C26.04 17.69 25.91 18.09 25.6 18.31L22.76 20.36L21.69 23.7C21.57 24.06 21.23 24.31 20.85 24.31L17.34 24.3L14.51 26.37C14.2 26.59 13.79 26.59 13.48 26.37L10.65 24.3L7.14 24.31C6.76 24.31 6.42 24.06 6.3 23.7L5.23 20.36L2.39 18.31C2.08 18.09 1.95 17.69 2.07 17.33L3.16 14L2.07 10.66C1.95 10.3 2.08 9.9 2.39 9.68L5.23 7.62L6.3 4.29C6.42 3.93 6.76 3.68 7.14 3.68L10.65 3.69L13.48 1.62ZM19.28 11.7C19.62 11.36 19.62 10.8 19.28 10.46C18.94 10.12 18.38 10.12 18.04 10.46L12.83 15.67L10.53 13.38C10.19 13.03 9.63 13.03 9.29 13.38C8.95 13.72 8.95 14.27 9.29 14.61L12.21 17.53C12.55 17.87 13.11 17.87 13.45 17.53L19.28 11.7Z"
                  fill="#1C1B1F"
                  fill-opacity="1.000000"
                  fill-rule="nonzero"
                />
              </g>
            </svg>

            <h2>40</h2>
            <p>
              Zertifizierte Fachkräfte
              <br />
              <span>in unserem Team</span>
            </p>
          </div>
        </div>
      </section>

      <section id="FirstLookPage-cta" className="FirstLookPage-section">
        <div className="FirstLookPage-content cta-content">
          <div className="FirstLookPage-cta-image">
            <img src={image6} alt="Planets" />
          </div>
          <div className="FirstLookPage-cta-text">
            <p>
              <span id="FirstLookPage-cta-text-span">
                Verbessere dein Deutschniveau
              </span>
            </p>
            <div className="cta-input-container">
              <input type="email" placeholder="Enter your email address" />
              <button className="cta-button">Jetzt beitreten</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="FirstLookPage-footer">
        <p>INAI</p>
      </footer>
    </div>
  );
}

export default FirstLookPage;
