import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    DropdownItem
  } from "reactstrap";
  import { useContext } from "react";
  import { AppContext } from "../../App";
  
  const Logout = ({ toggleModalThree, modalThree }) => {
    const { setCurrentUser, setSignedIn } = useContext(AppContext);
    const logoutUser = () => {
      setSignedIn(false);
      setCurrentUser(null);
      sessionStorage.clear();
      toggleModalThree();
    };
  
    return (
      <>
        <DropdownItem onClick={toggleModalThree}>Logout</DropdownItem>
        <Modal
          isOpen={modalThree}
          toggle={toggleModalThree}
          className="modal-wrapper"
        >
          <ModalHeader toggle={toggleModalThree}>
            Are you sure you want to log out?
          </ModalHeader>
          <ModalBody>
            <Button variant="primary" onClick={logoutUser}>
              Yes
            </Button>
          </ModalBody>
        </Modal>
      </>
    );
  };
  
  export default Logout;
  