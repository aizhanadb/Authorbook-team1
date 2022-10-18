import { useState, useContext, useCallback } from "react";
import { AppContext } from "../../App";
import DropDown from "./DropDown";
import Login from "./Login";
import moment from "moment";
import { Input } from "reactstrap";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

const DataUsers = () => {
  const {
    allUsers,
    currentUser,
    copyAllUsers,
    setcopyAllUsers,
    signedIn,
    getBooks
  } = useContext(AppContext);

  const [value, setValue] = useState("");

  const getSearch = (e) => {
    setValue(e.target.value);
    filterUser(e.target.value);
  };

  const filterUser = (value) => {
    const newUsers = [...allUsers];
    const filter = newUsers.filter((user) => {
      return (
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.firstname.toLowerCase().includes(value.toLowerCase()) ||
        user.lastname.toLowerCase().includes(value.toLowerCase())
      );
    });
    setcopyAllUsers(filter);
  };

  const handleDebounce = useCallback(debounce(getSearch, 2000), []);
  return (
    <>
      <header>
        {signedIn ? null : <h1>Hello, dear Guest. Please Sign In</h1>}
        <div className="search-wrapper">
          <Input
            className="search-input mb-3"
            placeholder="Search for user..."
            onChange={handleDebounce}
          />
          {signedIn ? (
            <div className="icon-wrapper">
              <span>
                {currentUser.firstname} {currentUser.lastname}
              </span>
              <DropDown />
            </div>
          ) : (
            <Login />
          )}
        </div>
      </header>
      <div className="users-container">
        {copyAllUsers.map((user, index) => {
          return (
            <Link
              to="/books"
              onClick={() => getBooks(user)}
              className="page-link"
              key={index}
            >
              <div className="user-item">
                <img src={user.avatar} alt={user.firstname} />
                <p>
                  {user.firstname} {user.lastname}
                </p>
                <div>
                  <h2>{user.email}</h2>
                  <p>{moment(user.birthdate).format("MM/DD/YYYY")}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default DataUsers;
