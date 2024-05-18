import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./BookDetail.css";
import Navbar from "../../navbar/Navbar";

function BookDetail() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookResponse, profileResponse] = await Promise.all([
          axios.get(`http://localhost:8086/book/getById/${bookId}`),
          axios.get("http://localhost:8086/user/my-profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }),
        ]);

        const { data: bookData } = bookResponse;
        const { data: profileData } = profileResponse;

        setBook(bookData);
        setEmail(profileData.email);
      } catch (error) {
        console.error("Error fetching book details or email:", error);
      }
    };

    fetchData();
  }, [bookId]);

  if (!book) {
    return <div>Laden...</div>;
  }

  return (
    <div className="mainBookDetail">
      <Navbar email={email} />
      <div className="containerBookDetail">
        <div className="book-header">
          {book.filePath && (
            <img
              id="img-book"
              src={`http://localhost:8086/${book.filePath}`}
              alt="Bok Image"
            />
          )}
          <div className="book-info">
            <h1>{book.title}</h1>
            <p id="pAut">Autor: {book.author}</p>
            <p id="pNiveau">Niveau: {book.level.levelName}</p>
          </div>
        </div>
        <div className="book-content">
          <p>{book.description}</p>
          <br />
          <p>{book.content}</p>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
