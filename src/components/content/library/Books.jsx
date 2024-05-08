import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Books.css";
import Navbar from "../../navbar/Navbar";
// import Footer from "../../footer/Footer";
import Book from "./Ch_ai.jpg";

function Library() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8086/book/getAll");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="main-div-library">
        <h1>Library</h1>
        <div className="book-list">
          {books.map((book) => (
            <a key={book.id} href={`/book/${book.id}`} className="book">
              <img src={Book} alt="Book 1" />
              <div className="book-title">
                {book.title} - {book.level.levelName}
              </div>
            </a>
          ))}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Library;
