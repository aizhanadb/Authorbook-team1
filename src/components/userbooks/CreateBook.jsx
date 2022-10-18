import { useContext } from "react";
import { AppContext } from "../../App";
import { useFormik } from "formik";
import { Label, Input, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const CreateBook = () => {
  const { setLoading, books, setBooks, currentUser } = useContext(AppContext);
  const formik = useFormik({
    initialValues: {
      title: "",
      genre: "",
      edition: "",
      rating: "",
      isbn: ""
    },
    onSubmit: (values) => {
      CreateBook(values);
    }
  });

  const CreateBook = async (value) => {
    setLoading(true);
    const userId = currentUser.id;
    const endpoint = `https://63416a4f20f1f9d799729322.mockapi.io/api/v1/users/${userId}/books`;
    const resp = await axios.post(endpoint, value);
    const createdBook = resp.data;
    const newBooks = [...books, createdBook];
    setBooks(newBooks);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  return (
    <Form className="book-update-form" onSubmit={formik.handleSubmit}>
      <FormGroup>
        <Label for="exampleTitle">Title</Label>
        <Input
          id="exampleTitle"
          onChange={formik.handleChange}
          name="title"
          placeholder="Type Title"
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleGenre">Genre</Label>
        <Input
          id="exampleGenre"
          onChange={formik.handleChange}
          name="genre"
          placeholder="Type Genre"
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEdition">Edition</Label>
        <Input
          id="exampleEdition"
          onChange={formik.handleChange}
          placeholder="Type Edition"
          name="edition"
          type="number"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleISBN">ISBN</Label>
        <Input
          id="exampleISBN"
          onChange={formik.handleChange}
          placeholder="Type ISBN"
          name="isbn"
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleRating">Rating</Label>
        <Input
          id="exampleRating"
          onChange={formik.handleChange}
          placeholder="Type Rating from 0-100"
          min="0"
          max="100"
          name="rating"
          type="number"
        />
      </FormGroup>
      <Button color="warning">Submit</Button>
      <Link className="btn btn-info" color="info" to="/books">
        Back
      </Link>
    </Form>
  );
};
export default CreateBook;
