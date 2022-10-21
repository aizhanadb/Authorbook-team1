import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { MdArrowForward } from "react-icons/md";
import { useContext, useState } from "react";
import { AppContext } from "../../App";
import Book from "./Book";
import axios from "axios";

const Books = () => {
  const {
    userName,
    books,
    setLoading,
    setBooks,
    setUpdateBook,
    currentUser,
    fetchAllBooks,
  } = useContext(AppContext);
  const [newBooks, setNewBooks] = useState([]);

  const updateRating = async (book) => {
    const idUser = book.userId;
    const idBook = book.id;
    const endpoint = `https://63416a4f20f1f9d799729322.mockapi.io/api/v1/users/${idUser}/books/${idBook}`;
    await axios.put(endpoint, book);
  };
  const updateBooks = () => {
    setLoading(true);
    if (newBooks.length > 0) {
      newBooks.forEach((item) => {
        updateRating(item);
      });
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleDeleteBook = async (book) => {
    setLoading(true);
    const endpoint = `https://63416a4f20f1f9d799729322.mockapi.io/api/v1/users/${book.userId}/books/${book.id}`;
    await axios.delete(endpoint);
    const filteredBooks = books.filter((item) => item.id !== book.id);
    setBooks(filteredBooks);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const updateBookBtn = (book) => {
    setUpdateBook(book);
  };
  const createBookBtn = () => {
    setUpdateBook("");
  };

  return (
    <>
      <nav className="nav">
        <div className="book-links">
          <Link className="page-link" to="/" onClick={() => updateBooks()}>
            <MdArrowBack className="user-icon" />
            Main Page
          </Link>
          {currentUser.id === userName.id && (
            <Link
              className="page-link"
              to="/updateBook"
              onClick={createBookBtn}
            >
              Create New Book
            </Link>
          )}
          <Link
            className="page-link"
            to="/AllBooks"
            onClick={() => fetchAllBooks()}
          >
            See All Books
            <MdArrowForward className="user-icon" />
          </Link>
        </div>
        <h2>{userName.firstname}'s books</h2>
        <div className="avatar-wrapper">
          <img
            className="avatar"
            src={userName.avatar}
            alt={userName.firstname}
          />
        </div>
      </nav>
      <div className="books-wrapper">
        {books.map((book) => {
          return (
            <Book
              key={book.id}
              book={book}
              setNewBooks={setNewBooks}
              newBooks={newBooks}
              handleDeleteBook={handleDeleteBook}
              updateBookBtn={updateBookBtn}
            />
          );
        })}
      </div>
    </>
  );
};

export default Books;
