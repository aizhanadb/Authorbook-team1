import { useState, createContext, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import DataUsers from "./components/mainpage/DataUsers";
import Books from "./components/userbooks/Books";
import Loader from "./components/Loader";
import UpdateBook from "./components/userbooks/UpdateBook";
import AllBooks from "./components/allbookspage/AllBooks";

export const AppContext = createContext(null);

export default function App() {
  //States
  const [signedIn, setSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [copyAllUsers, setcopyAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [userName, setUserName] = useState([]);
  const [bookUpdate, setUpdateBook] = useState({});
  const [allBooks, setAllBooks] = useState([]);

  //functions
  const handleSubmit = (e) => {
    const emailValue = e.target.email.value;
    const passwordValue = e.target.password.value;
    e.preventDefault();
    if (emailValue && passwordValue) {
      setLoading(true);

      const signInDetails = {
        email: emailValue,
        password: passwordValue
      };
      checkUserExists(signInDetails);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  const handleStorage = (users, currentUser) => {
    sessionStorage.setItem("users", JSON.stringify(users));
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  };
  const fetchData = async () => {
    const endpoint = "https://63416a4f20f1f9d799729322.mockapi.io/api/v1/users";
    const resp = await axios.get(endpoint);
    const users = resp.data;
    setAllUsers(users);
    setcopyAllUsers(users);
  };

  const checkUserExists = (creds) => {
    const matchedUser = allUsers.find((user) => {
      return user.email === creds.email && user.password === creds.password;
    });
    if (matchedUser) {
      setCurrentUser(matchedUser);
      setSignedIn(true);
      handleStorage(allUsers, matchedUser);
    } else {
      return;
    }
  };

  const fetchAllBooks = async () => {
    setLoading(true);
    const url = "https://63416a4f20f1f9d799729322.mockapi.io/api/v1/allBooks";
    const resp = await axios.get(url);
    setAllBooks(resp.data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const getBooks = async (user) => {
    setLoading(true);
    const id = user.id;

    const urlBook = `https://63416a4f20f1f9d799729322.mockapi.io/api/v1/users/${id}/books`;

    const response = await axios.get(urlBook);
    setBooks(response.data);
    setUserName(user);
    sessionStorage.setItem("books", JSON.stringify(response.data));
    sessionStorage.setItem("userName", JSON.stringify(user));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const users = JSON.parse(sessionStorage.getItem("users"));
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const userName = JSON.parse(sessionStorage.getItem("userName"));
    const books = JSON.parse(sessionStorage.getItem("books"));
    if (userName && books) {
      setBooks(books);
      setUserName(userName);
    }
    if (users && currentUser) {
      setAllUsers(users);
      setcopyAllUsers(users);
      setCurrentUser(currentUser);
      setSignedIn(true);
    } else {
      fetchData();
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        allUsers,
        setAllUsers,
        currentUser,
        setCurrentUser,
        copyAllUsers,
        setcopyAllUsers,
        handleStorage,
        setSignedIn,
        handleSubmit,
        signedIn,
        loading,
        setLoading,
        getBooks,
        setBooks,
        books,
        userName,
        setUpdateBook,
        bookUpdate,
        fetchAllBooks,
        allBooks
      }}
    >
      <div className="App">
        {
          <Routes>
            <Route path="/" element={loading ? <Loader /> : <DataUsers />} />
            <Route path="/books" element={loading ? <Loader /> : <Books />} />
            <Route
              path="/updateBook"
              element={loading ? <Loader /> : <UpdateBook />}
            />
            <Route
              path="/AllBooks"
              element={loading ? <Loader /> : <AllBooks />}
            />
          </Routes>
        }
      </div>
    </AppContext.Provider>
  );
}
