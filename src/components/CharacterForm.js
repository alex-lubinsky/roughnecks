import React from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { startSetRaces } from "../actions/races";
import { startSetSubclasses } from "../actions/subclasses";
import ClassForm from "./ClassForm";
import ValidationMessage from "./ValidationMessage";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AiOutlineCheck } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { altVision } from '../variables/altvision';

class CharacterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: props.character ? props.character.fullName : "",
      fullNameValid: props.character ? true : false,
      raceName: props.raceName ? props.raceName : "",
      raceNameValid: props.raceName ? true : false,
      armorClass: props.character ? props.character.armorClass : 1,
      armorClassValid: true,
      passivePerception: props.character ? props.character.passivePerception : 1,
      passivePerceptionValid: true,
      maxHp: props.character ? props.character.maxHp : 1,
      maxHpValid: true,
      gold: 0,
      goldValid: props.editForm ? true : false,
      subclassName: "",
      subclassNameValid: props.editForm ? true : false,
      altVision: props.altVision ? props.altVision : "",
      altVisionValid: props.altVision ? true : false,
      errorMsg: {},
      formValid: props.editForm ? true : false,
    };
  }

  componentDidMount() {
    if (!this.props.editForm) {
      this.props.startSetRaces();
      this.props.startSetSubclasses();
    }
  }

  onFullNameChange = (e) => {
    const fullName = e.target.value;
    this.setState({ fullName }, this.validateFullName);
  };

  validateFullName = () => {
    const { fullName } = this.state;
    let fullNameValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (fullName.length < 3) {
      fullNameValid = false;
      errorMsg.fullName = "Must be longer than 3 characters";
    }

    this.setState({ fullNameValid, errorMsg }, this.validateForm);
  };

  onLastNameChange = (e) => {
    const lastName = e.target.value;
    this.setState({ lastName });
  };

  onArmorClassChange = (e) => {
    const armorClass = e.target.value;
    this.setState({ armorClass }, this.validateArmorClass);
  };

  validateArmorClass = () => {
    const { armorClass } = this.state;
    let armorClassValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!Number.isInteger(Number(armorClass))) {
      armorClassValid = false;
      errorMsg.armorClass = "Must be a whole number";
    } else if (armorClass < 1) {
      armorClassValid = false;
      errorMsg.armorClass = "Must be a number larger than 0";
    }
    this.setState({ armorClassValid, errorMsg }, this.validateForm);
  };

  onPassivePerceptionChange = (e) => {
    const passivePerception = e.target.value;
    this.setState({ passivePerception }, this.validatePassivePerception);
  };

  validatePassivePerception = () => {
    const { passivePerception } = this.state;
    let passivePerceptionValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!Number.isInteger(Number(passivePerception))) {
      passivePerceptionValid = false;
      errorMsg.passivePerception = "Must be a whole number";
    } else if (passivePerception < 1) {
      passivePerceptionValid = false;
      errorMsg.passivePerception = "Must be a number larger than 0";
    }

    this.setState({ passivePerceptionValid, errorMsg }, this.validateForm);
  };

  onMaxHpChange = (e) => {
    const maxHp = e.target.value;
    this.setState({ maxHp }, this.validateMaxHp);
  };

  validateMaxHp = () => {
    const { maxHp } = this.state;
    let maxHpValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!Number.isInteger(Number(maxHp))) {
      maxHpValid = false;
      errorMsg.maxHp = "Must be a whole number";
    } else if (maxHp < 1) {
      maxHpValid = false;
      errorMsg.maxHp = "Must be a number larger than 0";
    }

    this.setState({ maxHpValid, errorMsg }, this.validateForm);
  };

  onGoldPcsChange = (e) => {
    const gold = e.target.value;
    this.setState({ gold }, this.validateGold);
  };

  validateGold = () => {
    const { gold } = this.state;
    let goldValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!Number.isInteger(Number(gold))) {
      goldValid = false;
      errorMsg.gold = "Must be a whole number";
    } else if (gold < 1) {
      goldValid = false;
      errorMsg.gold = "Must be a number larger than 0";
    }

    this.setState({ goldValid, errorMsg }, this.validateForm);
  };

  onVisionChange = (selectedItem) => {
    const altVision = selectedItem
    this.setState({ altVision }, this.validateAltVision);
  };

  validateAltVision = () => {
    const { altVision } = this.state;
    let altVisionValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (altVision === "") {
      altVisionValid = false;
      errorMsg.altVision = "Select a Vision Type";
    }

    this.setState({ altVisionValid, errorMsg }, this.validateForm);
  };

  getRaceOptions = () => {
    return this.props.races
      .sort((a, b) => (a.raceName > b.raceName ? 1 : -1))
      .map((race) => {
        return { value: race.id, label: race.raceName };
      });
  };

  onRaceChange = (selectedItem) => {
    const raceName = selectedItem
    this.setState({ raceName }, this.validateRaceName);
  };

  validateRaceName = () => {
    const { raceName } = this.state;
    let raceNameValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (raceName === "") {
      raceNameValid = false;
      errorMsg.raceName = "Select a Character Race";
    }

    this.setState({ raceNameValid, errorMsg }, this.validateForm);
  };

  onClassFormChange = (subclass) => {
    this.setState(
      {
        subclassName: subclass.subclassName,
        subclassNameValid: subclass.subclassValid,
      },
      this.validateForm
    );
  };

  validateForm = () => {
    const {
      fullNameValid,
      armorClassValid,
      raceNameValid,
      passivePerceptionValid,
      maxHpValid,
      subclassNameValid,
      goldValid,
      altVisionValid,
    } = this.state;
    this.setState({
      formValid:
        fullNameValid &&
        armorClassValid &&
        raceNameValid &&
        passivePerceptionValid &&
        maxHpValid &&
        subclassNameValid &&
        goldValid &&
        altVisionValid,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      fullName: this.state.fullName,
      raceName: this.state.raceName.value,
      armorClass: this.state.armorClass,
      passivePerception: this.state.passivePerception,
      maxHp: this.state.maxHp,
      subclassName: this.state.subclassName,
      goldPcs: this.state.gold,
      altVision: this.state.altVision.value,
    });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form.Group>
                  <span
                    className={
                      this.state.fullNameValid ? "valid-input" : "invalid-input"
                    }
                  >
                    <Form.Label>Full Name </Form.Label>
                    {this.state.fullNameValid ? (
                      <AiOutlineCheck />
                    ) : (
                      <IoMdClose />
                    )}
                  </span>
                  <Form.Control
                    type="text"
                    value={this.state.fullName}
                    onChange={this.onFullNameChange}
                    placeholder="Enter Character's First Name"
                  />

                  <ValidationMessage
                    valid={this.state.fullNameValid}
                    message={this.state.errorMsg.fullName}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <span
                    className={
                      this.state.armorClassValid
                        ? "valid-input"
                        : "invalid-input"
                    }
                  >
                    <Form.Label>Armor Class</Form.Label>
                    {this.state.armorClassValid ? (
                      <AiOutlineCheck />
                    ) : (
                      <IoMdClose />
                    )}
                  </span>
                  <Form.Control
                    type="number"
                    min="0"
                    step="1"
                    value={this.state.armorClass}
                    onChange={this.onArmorClassChange}
                    placeholder="Enter Character's Armor Class"
                  />
                  <ValidationMessage
                    valid={this.state.armorClassValid}
                    message={this.state.errorMsg.armorClass}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <span
                    className={
                      this.state.passivePerception
                        ? "valid-input"
                        : "invalid-input"
                    }
                  >
                    <Form.Label>Passive Perception</Form.Label>
                    {this.state.passivePerception ? (
                      <AiOutlineCheck />
                    ) : (
                      <IoMdClose />
                    )}
                  </span>
                  <Form.Control
                    type="number"
                    min="0"
                    step="1"
                    value={this.state.passivePerception}
                    onChange={this.onPassivePerceptionChange}
                    placeholder="Enter Character's Passive Perception"
                  />
                  <ValidationMessage
                    valid={this.state.passivePerceptionValid}
                    message={this.state.errorMsg.passivePerception}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <span
                    className={
                      this.state.maxHpValid ? "valid-input" : "invalid-input"
                    }
                  >
                    <Form.Label>Max HP</Form.Label>
                    {this.state.maxHpValid ? <AiOutlineCheck /> : <IoMdClose />}
                  </span>
                  <Form.Control
                    type="number"
                    min="0"
                    step="1"
                    value={this.state.maxHp}
                    onChange={this.onMaxHpChange}
                    placeholder="Enter Character's Max HP"
                  />
                  <ValidationMessage
                    valid={this.state.maxHpValid}
                    message={this.state.errorMsg.maxHp}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <span
                    className={
                      this.state.altVisionValid
                        ? "valid-input"
                        : "invalid-input"
                    }
                  >
                    <Form.Label>Vision</Form.Label>
                    {this.state.altVisionValid ? (
                      <AiOutlineCheck />
                    ) : (
                      <IoMdClose />
                    )}
                  </span>
                  <Select
                    value={this.state.altVision}
                    options={altVision}
                    onChange={this.onVisionChange}
                  />
                  <ValidationMessage
                    valid={this.state.altVisionValid}
                    message={this.state.errorMsg.altVision}
                  />
                </Form.Group>
              </Col>
              {this.props.editForm ? null :
              <Col>
                <Form.Group>
                  <span
                    className={
                      this.state.goldValid ? "valid-input" : "invalid-input"
                    }
                  >
                    <Form.Label>Starting Gold</Form.Label>
                    {this.state.goldValid ? <AiOutlineCheck /> : <IoMdClose />}
                  </span>
                  <Form.Control
                    type="number"
                    min="0"
                    step="1"
                    value={this.state.gold}
                    onChange={this.onGoldPcsChange}
                    placeholder="Enter Character's Starting Gold"
                  />
                  <ValidationMessage
                    valid={this.state.goldValid}
                    message={this.state.errorMsg.gold}
                  />
                </Form.Group>
              </Col>}
            </Row>
            <Form.Group>
              <span
                className={
                  this.state.raceNameValid ? "valid-input" : "invalid-input"
                }
              >
                <Form.Label>Race</Form.Label>
                {this.state.raceNameValid ? <AiOutlineCheck /> : <IoMdClose />}
              </span>
              {this.props.racesIsLoading ? (
                <p>loading races....</p>
              ) : (
                <Select
                  value={this.state.raceName}
                  options={this.getRaceOptions()}
                  onChange={this.onRaceChange}
                />
              )}
              <ValidationMessage
                valid={this.state.raceNameValid}
                message={this.state.errorMsg.raceName}
              />
            </Form.Group>
            {this.props.editForm ? null :
            this.props.subclassesIsLoading ? (
              <p>loading subclasses....</p>
            ) : (
              <ClassForm
                subclasses={this.props.subclasses}
                onChange={this.onClassFormChange}
              />
            )}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            disabled={!this.state.formValid}
            type="submit"
          >
            {this.props.editForm ? "Edit Character" : "Add Character"}
          </Button>
        </Modal.Footer>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startSetRaces: () => dispatch(startSetRaces()),
  startSetSubclasses: () => dispatch(startSetSubclasses()),
});

const mapStateToProps = (state, props) => ({
  races: state.races.data,
  subclasses: state.subclasses.data,
  racesIsLoading: state.races.isLoading,
  subclassesIsLoading: state.subclasses.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(CharacterForm);
