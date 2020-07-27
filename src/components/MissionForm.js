import React from "react";
import Select from "react-select";
import { startSetCharacters } from "../actions/characters";
import { connect } from "react-redux";
import ValidationMessage from "./ValidationMessage";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { startSetMissions } from "../actions/missions";
import Modal from 'react-bootstrap/Modal'
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import {AiOutlineCheck} from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import Button from "react-bootstrap/Button";


class MissionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      nameValid: false,
      dm: "",
      dmValid: false,
      characters: [],
      charactersValid: false,
      filteredCharacters: this.props.characters,
      minLevel: 1,
      minLevelValid: true,
      maxLevel: 1,
      maxLevelValid: false,
      errorMsg: {},
      formValid: false,
      startDate: new Date(),
      startDateValid: true,
    };
  }

  componentDidMount() {
    this.props.startSetCharacters();
    this.props.startSetMissions();
  }

  onNameChange = (e) => {
    const name = e.target.value;
    this.setState({ name }, this.validateName);
  };

  validateName = () => {
    const { name } = this.state;
    let nameValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (name.length < 3) {
      nameValid = false;
      errorMsg.name = "Must be at least 3 characters long";
    }

    this.setState({ nameValid, errorMsg }, this.validateForm);
  };

  onDmChange = (selectedValues) => {
    const dm = selectedValues.value;
    this.setState({ dm }, this.validateDm);

    const filteredCharacters = this.props.characters.filter((character) => {
      return character.id !== dm;
    });
    this.setState({ filteredCharacters });

    if (this.state.characters.length > 0) {
      const pcs = this.state.characters.filter((character) => {
        return character.value !== dm;
      });
      this.setState({ characters: pcs }, this.validateCharacters);
    }
  };

  validateDm = () => {
    const { dm } = this.state;
    let dmValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (dm === "") {
      dmValid = false;
      errorMsg.dm = "Mission must have a DM";
    }

    this.setState({ dmValid, errorMsg }, this.validateForm);
  };

  onCharactersChange = (selectedValues) => {
    let pcs = "";
    if (selectedValues) {
      pcs = selectedValues.map((character) => {
        return { value: character.value, label: character.label };
      });
    }
    this.setState({ characters: pcs }, this.validateCharacters);
  };

  validateCharacters = () => {
    const { characters } = this.state;
    let charactersValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (characters.length === 0) {
      charactersValid = false;
      errorMsg.characters = "Mission must have at least 1 Character";
    }

    this.setState({ charactersValid, errorMsg }, this.validateForm);
  };

  onMinLevelChange = (e) => {
    const minLevel = e.target.value;
    this.setState({ minLevel }, this.validateMinMaxLevel);
  };

  onMaxLevelChange = (e) => {
    const maxLevel = e.target.value;
    this.setState({ maxLevel }, this.validateMinMaxLevel);
  };

  validateMinMaxLevel = () => {
    const { minLevel, maxLevel } = this.state;
    let maxLevelValid = true;
    let minLevelValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!Number.isInteger(Number(maxLevel))) {
      maxLevelValid = false;
      errorMsg.maxLevel = "Maximum level must be a whole number";
    } else if (maxLevel < 1) {
      maxLevelValid = false;
      errorMsg.maxLevel = "Maximum level must be larger than 0";
    } else if (maxLevel > 20) {
      maxLevelValid = false;
      errorMsg.maxLevel = "Maximum level must be lower than 20";
    } else if (minLevel > maxLevel) {
      maxLevelValid = false;
      errorMsg.maxLevel =
        "Maximum level must be higher than to or equal the minimum level";
    }

    if (!Number.isInteger(Number(minLevel))) {
      minLevelValid = false;
      errorMsg.minLevel = "Minimum level must be a whole number";
    } else if (minLevel < 1) {
      minLevelValid = false;
      errorMsg.minLevel = "Minimum level must be larger than 0";
    } else if (minLevel > 20) {
      minLevelValid = false;
      errorMsg.minLevel = "Minimum level must be lower than 20";
    } else if (minLevel > maxLevel) {
      minLevelValid = false;
      errorMsg.minLevel =
        "Minimum level must be lower than to or equal the maximum level";
    }

    this.setState(
      { maxLevelValid, errorMsg, minLevelValid },
      this.validateForm
    );
  };

  onDatePickerChange = (date) => {
    this.setState({ startDate: date }, this.validateStartDate);
  };

  validateStartDate = () => {
    const { startDate } = this.state;
    let startDateValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (!startDate) {
      startDateValid = false;
      errorMsg.startDate = "Played on date cannot be blank";
    }
    this.setState({ startDateValid, errorMsg }, this.validateForm);
  };

  validateForm = () => {
    const {
      nameValid,
      dmValid,
      charactersValid,
      startDateValid,
      minLevelValid,
      maxLevelValid,
    } = this.state;
    this.setState({
      formValid:
        nameValid &&
        dmValid &&
        charactersValid &&
        startDateValid &&
        minLevelValid &&
        maxLevelValid,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const pcs = this.state.characters.map((character) => {
      return character.value;
    });

    this.props.onSubmit({
      name: this.state.name,
      dm: this.state.dm,
      characters: pcs,
      playedOn: `${this.state.startDate.getFullYear()}-${
        this.state.startDate.getMonth() + 1
      }-${this.state.startDate.getDate()}`,
      episode: `${this.props.highestEpisode + 1}`,
      levelMin: this.state.minLevel,
      levelMax: this.state.maxLevel,
    });
  };

  selectDMOptions = this.props.characters.map((character) => {
    return {
      value: character.id,
      label: character.firstName + " " + character.lastName,
    };
  });

  render() {
    const selectFilteredCharacterOptions = this.state.filteredCharacters.map(
      (character) => {
        return {
          value: character.id,
          label: character.firstName + " " + character.lastName,
        };
      }
    );

    return (
      <Form onSubmit={this.onSubmit}>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form.Group>
                  <span className={this.state.nameValid ? "valid-input" : "invalid-input"}>
                    <Form.Label>Mission Name</Form.Label>
                    {this.state.nameValid ? <AiOutlineCheck /> : <IoMdClose />}
                  </span>
                  <Form.Control
                    type="text"
                    placeholder="Enter Mission Name"
                    value={this.state.name}
                    onChange={this.onNameChange}
                  />
                  <ValidationMessage
                    valid={this.state.nameValid}
                    message={this.state.errorMsg.name}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <span className={this.state.dmValid ? "valid-input" : "invalid-input"}>
                    <Form.Label>DM</Form.Label>
                    {this.state.dmValid ? <AiOutlineCheck /> : <IoMdClose />}
                  </span>
                  {this.props.characters.isLoading ? null : (
                    <Select
                      id="dm"
                      name="dm"
                      options={this.selectDMOptions}
                      onChange={this.onDmChange}
                    />
                  )}
                  <ValidationMessage
                    valid={this.state.dmValid}
                    message={this.state.errorMsg.dm}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <span className={this.state.charactersValid ? "valid-input" : "invalid-input"}>
                    <Form.Label>Characters</Form.Label>
                    {this.state.charactersValid ? <AiOutlineCheck /> : <IoMdClose />}
                  </span>
                  {this.props.charactersIsLoading ? null : (
                    <Select
                      id="characters"
                      name="characters"
                      isMulti
                      options={selectFilteredCharacterOptions}
                      value={this.state.characters}
                      onChange={this.onCharactersChange}
                    />
                  )}
                  <ValidationMessage
                    valid={this.state.charactersValid}
                    message={this.state.errorMsg.characters}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <span className={this.state.minLevelValid ? "valid-input" : "invalid-input"}>
                    <Form.Label>Minimum Level</Form.Label>
                    {this.state.minLevelValid ? <AiOutlineCheck /> : <IoMdClose />}
                  </span>
                  <Form.Control
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Minimum level for the mission"
                    value={this.state.minLevel}
                    onChange={this.onMinLevelChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <span className={this.state.maxLevelValid ? "valid-input" : "invalid-input"}>
                    <Form.Label>Maximum Level</Form.Label>
                    {this.state.maxLevelValid ? <AiOutlineCheck /> : <IoMdClose />}
                  </span>
                  <Form.Control
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Maximum level for the mission"
                    value={this.state.maxLevel}
                    onChange={this.onMaxLevelChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group>
                <ValidationMessage
                  valid={this.state.minLevelValid}
                  message={this.state.errorMsg.minLevel}
                />
                <ValidationMessage
                  valid={this.state.maxLevelValid}
                  message={this.state.errorMsg.maxLevel}
                />
              </Form.Group>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <span className={this.state.startDateValid ? "valid-input date-picker" : "invalid-input date-picker"}>
                    <Form.Label>Played On</Form.Label>
                    {this.state.startDateValid ? <AiOutlineCheck /> : <IoMdClose />}
                  </span>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.onDatePickerChange}
                    className="date-picker-box"
                  />
                  <ValidationMessage
                    valid={this.state.startDateValid}
                    message={this.state.errorMsg.startDate}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!this.state.formValid}
            variant="primary"
            type="submit"
          >
            Add Mission
          </Button>
        </Modal.Footer>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startSetCharacters: () => dispatch(startSetCharacters()),
  startSetMissions: () => dispatch(startSetMissions()),
});

const mapStateToProps = (state, props) => ({
  characters: state.characters.data.filter(
    (character) => character.dead === false
  ),
  charactersIsLoading: state.characters.isLoading,
  highestEpisode: state.missions.data.sort((a, b) =>
    a.episode < b.episode ? 1 : -1
  )[0].episode,
});

export default connect(mapStateToProps, mapDispatchToProps)(MissionForm);
