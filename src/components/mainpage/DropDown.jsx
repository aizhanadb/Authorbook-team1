import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import PropTypes from "prop-types";
import { HiOutlineUser } from "react-icons/hi";
import UpdateProfile from "./UpdateProfile";
import DeleteProfile from "./DeleteProfile";
import Logout from "./Logout";

function DropDown({ direction }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [modalTwo, setModalTwo] = useState(false);
  const [modalThree, setModalThree] = useState(false);

  const toggleModalTwo = () => setModalTwo(!modalTwo);
  const toggleModalThree = () => setModalThree(!modalThree);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="d-flex">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
        <DropdownToggle caret>
          <HiOutlineUser className="user-icon" />
        </DropdownToggle>
        <DropdownMenu>
          <UpdateProfile toggle={toggleModal} modal={modal} />
          <DeleteProfile toggleModalTwo={toggleModalTwo} modalTwo={modalTwo} />
          <Logout toggleModalThree={toggleModalThree} modalThree={modalThree} />
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

DropDown.propTypes = {
  direction: PropTypes.string
};

export default DropDown;
