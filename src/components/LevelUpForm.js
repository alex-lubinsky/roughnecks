import React from "react";
import { connect } from "react-redux";
import ClassForm from "./ClassForm";
import ValidationMessage from "./ValidationMessage";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { buildClassArray } from "../functions/levels";

class LevelUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passivePerception: this.props.character.passivePerception
        ? this.props.character.passivePerception
        : 0,
      passivePerceptionValid: true,
      maxHp: this.props.character.maxHp ? this.props.character.maxHp : 0,
      maxHpValid: true,
      subclassName: "",
      subclassValid: false,
      errorMsg: {},
      formValid: false,
    };
  }

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

  onClassFormChange = (subclass) => {
    this.setState(
      {
        subclassName: subclass.subclassName,
        subclassValid: subclass.subclassValid,
      },
      this.validateForm
    );
  };

  validateForm = () => {
    const { passivePerceptionValid, maxHpValid, subclassValid } = this.state;
    this.setState({
      formValid: passivePerceptionValid && maxHpValid && subclassValid,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let date = new Date();
    this.props.onSubmit({
      passivePerception: this.state.passivePerception,
      maxHp: this.state.maxHp,
      subclassName: this.state.subclassName,
      levelNumber: this.props.pcNextLevelNumber,
      dateCreated: `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`,
    });
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.onSubmit}>
          <Modal.Body>
            <Form.Label>Passive Perception</Form.Label>
            <Form.Control
              type="number"
              min="0"
              step="1"
              value={this.state.passivePerception}
              onChange={this.onPassivePerceptionChange}
              placeholder={`Enter ${this.props.character.firstName}'s Passive Perception`}
            />
            <ValidationMessage
              valid={this.state.passivePerceptionValid}
              message={this.state.errorMsg.passivePerception}
            />

            <Form.Label>Max HP</Form.Label>
            <Form.Control
              type="number"
              min="0"
              step="1"
              value={this.state.maxHp}
              onChange={this.onMaxHpChange}
              placeholder={`Enter ${this.props.character.firstName}'s Max HP`}
            />
            <ValidationMessage
              valid={this.state.maxHpValid}
              message={this.state.errorMsg.maxHp}
            />

            <ClassForm
              subclasses={this.props.subclasses}
              onChange={this.onClassFormChange}
              characterLevels={buildClassArray(
                this.props.pcSubclasses.filter(
                  (pcSubclass) =>
                    pcSubclass.classCharacter === this.props.characterid
                ),
                this.props.subclasses
              )}
            />
          </Modal.Body>
          <Modal.Footer>
            <div>
              Passive Perception:{" "}
              {this.state.passivePerceptionValid ? (
                <i className="valid-input icon-ok-circle" />
              ) : (
                <i className="invalid-input icon-remove-sign" />
              )}
            </div>
            <div>
              Max HP:{" "}
              {this.state.maxHpValid ? (
                <i className="valid-input icon-ok-circle" />
              ) : (
                <i className="invalid-input icon-remove-sign" />
              )}
            </div>
            <div>
              Class/Subclass:{" "}
              {this.state.subclassValid ? (
                <i className="valid-input icon-ok-circle" />
              ) : (
                <i className="invalid-input icon-remove-sign" />
              )}
            </div>

            <Button disabled={!this.state.formValid} type="submit">
              Level Up
            </Button>
          </Modal.Footer>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => ({
  character: state.characters.data.find(
    (character) => character.id === props.character.id
  ),
  characterid: props.character.id,
  pcNextLevelNumber:
    state.pcSubclasses.data.filter(
      (pcSubclass) => pcSubclass.classCharacter === props.character.id
    ).length + 1,
});

export default connect(mapStateToProps)(LevelUpForm);
