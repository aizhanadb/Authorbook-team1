import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    DropdownItem
  } from "reactstrap";
  import { useContext } from "react";
  import { AppContext } from "../../App";
  import axios from "axios";
  
  const DeleteUser = ({ toggleModalTwo, modalTwo }) => {
    const { currentUser, setCurrentUser, setSignedIn, setLoading } = useContext(
      AppContext
    );
    const deleteUser = async (id) => {
      setLoading(true);
      const endpoint = `https://63416a4f20f1f9d799729322.mockapi.io/api/v1/users/${id}`;
      await axios.delete(endpoint);
      setSignedIn(false);
      setCurrentUser(null);
      sessionStorage.clear();
      toggleModalTwo();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
  
    return (
      <>
        <DropdownItem onClick={toggleModalTwo}>Delete</DropdownItem>
        <Modal
          isOpen={modalTwo}
          toggle={toggleModalTwo}
          className="modal-wrapper"
        >
          <ModalHeader toggle={toggleModalTwo}>
            {currentUser.firstname} {currentUser.lastname}, are you sure you want
            to delete your account ?
          </ModalHeader>
          <ModalBody>
            <Button variant="primary" onClick={() => deleteUser(currentUser.id)}>
              Delete User
            </Button>
          </ModalBody>
        </Modal>
      </>
    );
  };
  
  export default DeleteUser;
  