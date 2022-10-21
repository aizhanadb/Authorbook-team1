import { useContext } from "react";
import { AppContext } from "../../App";
import { useFormik } from "formik";
import { Label, Input, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import CreateBook from "./CreateBook";

const UpdateBook = () => {
  const { bookUpdate, setLoading, books, setBooks } = useContext(AppContext);
  const formik = useFormik({
    initialValues: {
      title: bookUpdate.title,
      genre: bookUpdate.genre,
      edition: bookUpdate.edition,
      isbn: bookUpdate.isbn
    },
    onSubmit: (values) => {
      updateBook(values);
    }
  });

  const updateBook = async (value) => {
    setLoading(true);
    const userId = bookUpdate.userId;
    const id = bookUpdate.id;
    const endpoint = `https://63416a4f20f1f9d799729322.mockapi.io/api/v1/users/${userId}/books/${id}`;
    const resp = await axios.put(endpoint, value);
    const updatedBook = resp.data;
    const newBooks = [...books];
    const index = newBooks.indexOf(bookUpdate);
    newBooks.splice(index, 1, updatedBook);
    setBooks(newBooks);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  if (bookUpdate) {
    return (
      <Form className="book-update-form" onSubmit={formik.handleSubmit}>
        <FormGroup>
          <Label for="exampleTitle">Title</Label>
          <Input
            id="exampleTitle"
            onChange={formik.handleChange}
            name="title"
            placeholder={bookUpdate.title}
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleGenre">Genre</Label>
          <Input
            id="exampleGenre"
            onChange={formik.handleChange}
            name="genre"
            placeholder={bookUpdate.genre}
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEdition">Edition</Label>
          <Input
            id="exampleEdition"
            onChange={formik.handleChange}
            placeholder={bookUpdate.edition}
            name="edition"
            type="number"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleISBN">ISBN</Label>
          <Input
            id="exampleISBN"
            onChange={formik.handleChange}
            placeholder={bookUpdate.isbn}
            name="isbn"
            type="text"
          />
        </FormGroup>
        <Button color="warning">Submit</Button>
        <Link className="btn btn-info" color="info" to="/books">
          Back
        </Link>
      </Form>
    );
  }
  return <CreateBook />;
};

export default UpdateBook;
