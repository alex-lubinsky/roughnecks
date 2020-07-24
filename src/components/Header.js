import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import AddMissionPage from "./AddMissionPage";
import AddCharacterPage from "./AddCharacterPage";
import AddTransactionPage from "./AddTransactionPage";
import AddDowntimeForm from "./AddDowntimeForm";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import Modal from "react-modal";

const Header = (props) => {
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const handleCharacterFormClose = () => setShowCharacterModal(false);
  const handleCharacterFormShow = () => setShowCharacterModal(true);

  const [showMissionFormModal, setShowMissionFormModal] = useState(false);
  const handleMissionFormClose = () => setShowMissionFormModal(false);
  const handleMissionFormShow = () => setShowMissionFormModal(true);

  const [showTransactionFormModal, setShowTransactionFormModal] = useState(
    false
  );
  const handleTransactionFormClose = () => setShowTransactionFormModal(false);
  const handleTransactionFormShow = () => setShowTransactionFormModal(true);

  const [showDowntimeFormModal, setShowDowntimeFormModal] = useState(false);
  const handleDowntimeFormClose = () => setShowDowntimeFormModal(false);
  const handleDowntimeFormShow = () => setShowDowntimeFormModal(true);

  const LOGOUT = () => {
    props.logout();
  };

  return (
    <>
      <Modal
        isOpen={showCharacterModal}
        onRequestClose={handleCharacterFormClose}
        ariaHideApp={false}
      >
        <AddCharacterPage handleClose={handleCharacterFormClose} />
      </Modal>

      <Modal
        isOpen={showMissionFormModal}
        onRequestClose={handleMissionFormClose}
        ariaHideApp={false}
      >
        <AddMissionPage handleClose={handleMissionFormClose} />
      </Modal>

      <Modal
        isOpen={showTransactionFormModal}
        onRequestClose={handleTransactionFormClose}
        ariaHideApp={false}
      >
        <AddTransactionPage handleClose={handleTransactionFormClose} />
      </Modal>

      <Modal
        isOpen={showDowntimeFormModal}
        onRequestClose={handleDowntimeFormClose}
        ariaHideApp={false}
      >
        <AddDowntimeForm handleClose={handleDowntimeFormClose} />
      </Modal>

      <Navbar bg="light" expand="lg" variant="light">
        <Navbar.Brand href="/">Reggie's Roughnecks</Navbar.Brand>
        {props.userFirstName ? (
          <>
            <Nav className="justify-content-start">
              <NavDropdown title="Create" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleCharacterFormShow}>
                  Character
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleMissionFormShow}>
                  Mission
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleTransactionFormShow}>
                  Transaction
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="justify-content-start">
              <NavDropdown title="Display" id="basic-nav-dropdown">
                <NavDropdown.Item href="/">Hall of Heroes</NavDropdown.Item>
                <NavDropdown.Item href="/missions">Missions</NavDropdown.Item>
                <NavDropdown.Item href="/transactions">
                  Transactions
                </NavDropdown.Item>
                <NavDropdown.Item href="/fallen">
                  Hall of Fallen Heroes
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="justify-content-start">
              <NavDropdown title="Spend" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleDowntimeFormShow}>
                  Spend Downtime
                </NavDropdown.Item>
                <NavDropdown.Item href="/skymall">Skymall</NavDropdown.Item>
                {props.isStaff ? (
                  <NavDropdown.Item href="/skymalladmin">
                    SkymallAdmin
                  </NavDropdown.Item>
                ) : null}
              </NavDropdown>
            </Nav>
            <Nav className="justify-content-end">
              {props.userFirstName ? (
                <NavDropdown
                  title={`${props.userFirstName}`}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={LOGOUT}>Log Out</NavDropdown.Item>
                </NavDropdown>
              ) : null}
            </Nav>
          </>
        ) : null}
      </Navbar>
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

const mapStateToProps = (state) => {
  if (state.auth.user) {
    return {
      userFirstName: state.auth.user.first_name,
      isStaff: state.auth.user.isSkymallAdmin,
    };
  } else {
    return {};
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
