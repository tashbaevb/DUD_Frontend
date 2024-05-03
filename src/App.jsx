import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/LoginSignUp/Login";
import SignUp from "./components/LoginSignUp/registration/SignUp";
import UserProfile from "./components/UserProfile";
import LessonList from "./components/lessons/LessonList";
import LessonDetailsGrammar from "./components/lessons/LessonDetailsGrammar";
import LessonDetailsReading from "./components/lessons/LessonDetailsReading";
import LessonDetailsListening from "./components/lessons/LessonDetailsListening";
import Books from "./components/content/library/Books";
import BookDetail from "./components/content/library/BookDetail";
import MoviesList from "./components/content/movies/MoviesList";
import MovieDetail from "./components/content/movies/MovieDetail";
import NoteChat from "./components/content/NoteChat";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/profile/:email" element={<UserProfile />} />
        <Route path="/notes" element={<NoteChat />} />
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
  );
}

export default App;
