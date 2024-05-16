import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Books.css";
import Navbar from "../../navbar/Navbar";

function Books() {
  const [books, setBooks] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookResponse, profileResponse] = await Promise.all([
          axios.get("http://localhost:8086/book/getAll"),
          axios.get("http://localhost:8086/user/my-profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }),
        ]);

        const { data: bookData } = bookResponse;
        const { data: profileData } = profileResponse;

        setBooks(bookData);
        setEmail(profileData.email);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar email={email} />
      <div className="main-div-library">
        <h1>Library</h1>
        <div className="book-list">
          {books.map((book) => (
            <a key={book.id} href={`/book/${book.id}`} className="book">
              {book.filePath && (
                <img
                  id="img-book"
                  src={`http://localhost:8086/${book.filePath}`}
                  alt="Bok Image"
                />
              )}
              <div className="book-title">
                {book.title} - {book.level.levelName}
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default Books;
