import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./BookDetail.css";
import Navbar from "../../navbar/Navbar";
// import Footer from "../../footer/Footer";
import Book from "./Ch_ai.jpg";

function BookDetail() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8086/book/getById/${bookId}`
        );
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBook();
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="book-header">
          <img src={Book} alt="suka" />
          <div className="book-info">
            <h1>
              {book.title} - {book.level.levelName}
            </h1>
            <p>Author: {book.author}</p>
          </div>
        </div>
        <div className="book-content">
          <p>{book.description}</p>
          <br />
          <p>{book.content}</p>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default BookDetail;
