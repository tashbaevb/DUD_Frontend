import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/authRegister/Login";
import SignUp from "./components/authRegister/registration/SignUp";
import UserProfile from "./components/UserProfile";
import LessonList from "./components/lessons/LessonList";
import LessonDetailsGrammar from "./components/lessons/grammar/LessonDetailsGrammar";
import LessonDetailsReading from "./components/lessons/reading/LessonDetailsReading";
import LessonDetailsListening from "./components/lessons/listening/LessonDetailsListening";
import Books from "./components/content/library/Books";
import BookDetail from "./components/content/library/BookDetail";
import MoviesList from "./components/content/movies/MoviesList";
import MovieDetail from "./components/content/movies/MovieDetail";
import FirstLookPage from "./components/firstLook/FirstLookPage";

import "./App.css";

function App() {
  return (
    <main className="mainApp" style={{ height: "100%" }}>
      <Router>
        <Routes>
          <Route path="/" element={<FirstLookPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile/:email" element={<UserProfile />} />
          <Route path="/lessons/:levelId" element={<LessonList />} />
          <Route
            path="/lesson/:lessonId/grammar"
            element={<LessonDetailsGrammar />}
          />
          <Route
            path="/lesson/:lessonId/reading"
            element={<LessonDetailsReading />}
          />
          <Route
            path="/lesson/:lessonId/listening"
            element={<LessonDetailsListening />}
          />
          <Route path="/books" element={<Books />} />
          <Route path="/book/:bookId" element={<BookDetail />} />
          <Route path="/movies" element={<MoviesList />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
