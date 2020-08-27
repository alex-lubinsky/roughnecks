import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import AddMissionPage from "./AddMissionPage";
import AddCharacterPage from "./AddCharacterPage";
import AddTransactionPage from "./AddTransactionPage";
import AddDowntimeForm from "./AddDowntimeForm";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import Modal from "react-bootstrap/Modal";
import {startSetCharacters} from '../actions/characters'

const Header = ({userFirstName = '', isStaff = false, userId = 0, characters = [], charactersIsLoading = false, logout, startSetCharacters}) => {

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
    logout();
  };

  useEffect(() => {
    startSetCharacters()
  }, [startSetCharacters])

  return (
    <>
      <Modal
        size="lg"
        show={showCharacterModal}
        onHide={handleCharacterFormClose}
      >
        <AddCharacterPage handleClose={handleCharacterFormClose} />
      </Modal>

      <Modal show={showMissionFormModal} onHide={handleMissionFormClose}>
        <AddMissionPage handleClose={handleMissionFormClose} />
      </Modal>

      <Modal
        show={showTransactionFormModal}
        onHide={handleTransactionFormClose}
      >
        <AddTransactionPage handleClose={handleTransactionFormClose} />
      </Modal>

      <Modal show={showDowntimeFormModal} onHide={handleDowntimeFormClose}>
        <AddDowntimeForm handleClose={handleDowntimeFormClose} />
      </Modal>

      <Navbar bg="light" expand="lg" variant="light">
        <Navbar.Brand href="/">Reggie's Roughnecks</Navbar.Brand>
        {userFirstName !== '' ? (
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
                <NavDropdown.Item href="/downtime">Downtime</NavDropdown.Item>
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
                {isStaff === true ? (
                  <NavDropdown.Item href="/skymalladmin">
                    SkymallAdmin
                  </NavDropdown.Item>
                ) : null}
              </NavDropdown>
            </Nav>
            <Nav>
                <NavDropdown
                  title={`${userFirstName}`}
                  id="basic-nav-dropdown"
                >

                  {charactersIsLoading === true ? null : characters.filter(character => {
                    return character.creator === userId
                  }).sort((a,b) => a.fullName > b.fullName ? 1 : -1).map(character => {
                    return (
                      <NavDropdown.Item key={character.id} href={`/characters/${character.id}`}>
                        {character.fullName}
                      </NavDropdown.Item>
                    )
                  })}
                   <NavDropdown.Divider />
                  <NavDropdown.Item onClick={LOGOUT}>Log Out</NavDropdown.Item>
                </NavDropdown>
              
            </Nav>
          </>
        ) : null}
      </Navbar>
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  startSetCharacters: () => dispatch(startSetCharacters())

});

const mapStateToProps = (state) => {
  if (state.auth.user) {
    return {
      userFirstName: state.auth.user.first_name,
      isStaff: state.auth.user.isSkymallAdmin,
      userId: state.auth.user.id,
      characters: state.characters.data.filter(
        (character) => !character.dead && !character.retired
      ),
      charactersIsLoading: state.characters.isLoading,

    };
  } else {
    return {};
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
