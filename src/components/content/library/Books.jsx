import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Library() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8086/book/getAll');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Library</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>
              <h3>{book.title}</h3>
            </Link>
            <p>{book.description}</p>
            <p>Author: {book.author}</p>
            <p>Level: {book.level.levelName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Library;
