import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignUp from './components/LoginSignUp/LoginSignUp';
import UserProfile from './components/LoginSignUp/UserProfile';
import LessonList from './components/LessonList';
import LessonDetailsGrammar from './components/LessonDetailsGrammar';
import LessonDetailsReading from './components/LessonDetailsReading';
import LessonDetailsListening from './components/LessonDetailsListening';
import Books from './components/content/library/Books';
import BookDetail from './components/content/library/BookDetail';
import MoviesList from './components/content/movies/MoviesList';
import MovieDetail from './components/content/movies/MovieDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignUp />} />
        <Route path="/profile/:email" element={<UserProfile />} />
        <Route path="/lessons/:levelId" element={<LessonList />} />
        <Route path="/lesson/:lessonId/grammar" element={<LessonDetailsGrammar />} />
        <Route path="/lesson/:lessonId/reading" element={<LessonDetailsReading />} />
        <Route path="/lesson/:lessonId/listening" element={<LessonDetailsListening />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:bookId" element={<BookDetail />} />
        <Route path="/movies" element={<MoviesList />} /> 
        <Route path="/movie/:movieId" element={<MovieDetail />} /> 
      </Routes>
    </Router>
  );
}

export default App;
