import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { useContext, useState } from "react";
import { AppContext } from "../../App";

const Book = ({
  book,
  setNewBooks,
  newBooks,
  handleDeleteBook,
  updateBookBtn
}) => {
  const { currentUser } = useContext(AppContext);
  const number = Math.round(book.rating / 20);
  const [hovered, setHovered] = useState(number);
  const starsArray = [...Array(5).keys()];

  const handleStarClick = (book, num) => {
    setHovered(num);
    const obj = { ...book, rating: num * 20 };
    if (newBooks.length > 0) {
      const filtered = newBooks.filter((item) => item.id !== book.id);
      setNewBooks([...filtered, obj]);
    } else {
      const newArr = [...newBooks, obj];
      setNewBooks(newArr);
    }
  };
  const handleStarDoubleClick = (book) => {
    setHovered(-1);
    const obj = { ...book, rating: 0 };
    if (newBooks.length > 0) {
      const filtered = newBooks.filter((item) => item.id !== book.id);
      setNewBooks([...filtered, obj]);
    } else {
      const newArr = [...newBooks, obj];
      setNewBooks(newArr);
    }
  };

  return (
    <Card
      className="book-card"
      style={{
        width: "18rem"
      }}
    >
      <img alt={book.title} src={book.cover} />
      <CardBody className="my-card-body">
        <CardTitle tag="h5">{book.title}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {book.genre}
        </CardSubtitle>
        <CardText>{book.desc}</CardText>
        <CardSubtitle className="mb-2 text-muted rating" tag="h6">
          {starsArray.map((star, index) => {
            const num = index + 1;
            if (num <= hovered) {
              return (
                <AiFillStar
                  key={index}
                  className="icon star"
                  onClick={() => handleStarClick(book, num)}
                  onDoubleClick={() => handleStarDoubleClick(book)}
                  size={30}
                />
              );
            } else {
              return (
                <AiFillStar
                  key={index}
                  onClick={() => handleStarClick(book, num)}
                  onDoubleClick={() => handleStarDoubleClick(book)}
                  size={30}
                  className="icon"
                />
              );
            }
          })}
        </CardSubtitle>
        {currentUser.id === book.userId ? (
          <div className="book-btns">
            <Link
              className="btn btn-info"
              color="info"
              to="/updateBook"
              onClick={() => updateBookBtn(book)}
            >
              Update
            </Link>
            <Button color="danger" onClick={() => handleDeleteBook(book)}>
              Delete
            </Button>
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
};
export default Book;
