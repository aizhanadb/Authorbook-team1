import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  DropdownItem,
} from "reactstrap";
import { useContext } from "react";
import { AppContext } from "../../App";
import { useFormik } from "formik";
import axios from "axios";

const UpdateProfile = ({ modal, toggle, handleSubmit, handleChange }) => {
  const {
    currentUser,
    allUsers,
    setcopyAllUsers,
    handleStorage,
    setCurrentUser,
    setLoading,
  } = useContext(AppContext);

  //Async function for update the user, from modal
  const formik = useFormik({
    initialValues: {
      email: currentUser.email,
      password: currentUser.password,
      avatar: currentUser.avatar,
      birthdate: currentUser.birthdate,
    },
    onSubmit: (values) => {
      updateUser(values);
    },
  });
  const updateUser = async (value) => {
    setLoading(true);
    const id = currentUser.id;
    const endpoint = `https://63416a4f20f1f9d799729322.mockapi.io/api/v1/users/${id}`;
    const resp = await axios.put(endpoint, value);
    const user = resp.data;
    const newUsers = [...allUsers];
    const index = newUsers.indexOf(currentUser);
    newUsers.splice(index, 1, user);
    setcopyAllUsers(newUsers);
    setCurrentUser(user);
    handleStorage(newUsers, user);
    toggle();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div>
      <DropdownItem onClick={toggle}>Update</DropdownItem>

      <Modal isOpen={modal} toggle={toggle} className="modal-wrapper">
        <ModalHeader toggle={toggle}>{currentUser.firstname}</ModalHeader>
        <ModalBody>
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                id="exampleEmail"
                name="email"
                placeholder={currentUser.email}
                type="email"
                onChange={formik.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder={currentUser.password}
                type="password"
                onChange={formik.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleUrl">Avatar Url</Label>
              <Input
                id="exampleUrl"
                name="avatar"
                placeholder={currentUser.avatar}
                type="url"
                onChange={formik.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleDate">Date of Birth</Label>
              <Input
                id="exampleDate"
                name="birthdate"
                placeholder={currentUser.birthdate}
                type="date"
                onChange={formik.handleChange}
              />
            </FormGroup>
            <Button color="warning">Update Profile</Button>{" "}
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UpdateProfile;
