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
import "./App.css";
import Sidebar from "./components/content/NoteChat";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <main className="mainApp">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
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
          <Route path="/sidebar" element={<Sidebar />} />
        </Routes>
      </Router>
      <Footer />
    </main>
  );
}

export default App;
